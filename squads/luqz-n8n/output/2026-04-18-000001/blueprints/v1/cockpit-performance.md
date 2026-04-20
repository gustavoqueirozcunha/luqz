# BLUEPRINT DE OTIMIZAÇÃO — Cockpit Performance — API de Métricas

**Arquiteto:** N8N Designer 🏗️
**Data:** 2026-04-18
**Input:** `squads/luqz-n8n/output/2026-04-18-000001/auditorias/v1/cockpit-performance.md`

---

## STATUS DOS PROBLEMAS

| ID | Prioridade | Endereçado | Solução |
|---|---|---|---|
| A01 | 🔴 Alta | ✅ Sim | Adicionar Error Trigger + nó de resposta de erro |
| A02 | 🔴 Alta | ✅ Sim | Checklist de substituição obrigatória antes do import |
| A03 | 🔴 Alta | ✅ Sim | Adicionar validação por API Key via query param ou header |
| A04 | 🔴 Alta | ✅ Sim | Detectar leads=0 e retornar status `"sem-dados"` |
| M01 | 🟡 Média | ✅ Sim | Adicionar filtro de range de data para limitar linhas lidas |
| M02 | 🟡 Média | ✅ Sim | Implementar cache via `$getWorkflowStaticData` (TTL 2 min) |
| M03 | 🟡 Média | ✅ Sim | Fallback seguro quando coluna Gestor ausente |
| B01 | 🟢 Baixa | ⏭️ Próximo ciclo | Monitoramento externo (UptimeRobot / n8n Error Workflow) |
| B02 | 🟢 Baixa | ⏭️ Próximo ciclo | Atualizar ao migrar versão do n8n |

---

## DECISÕES QUE REQUEREM INPUT DO USUÁRIO

> ⚠️ Antes de implementar, o usuário precisa responder:

1. **[DECISÃO-1] Estratégia de autenticação do endpoint:**
   - **Opção A** — API Key via query param: `?apiKey=CHAVE` (simples, funciona em qualquer frontend)
   - **Opção B** — Header `Authorization: Bearer TOKEN` (mais seguro, requer configuração no frontend)
   - **Opção C** — IP Whitelist no n8n (só aceita requests do IP do servidor do frontend)
   - **Recomendação:** Opção A para rapidez, com plano de migrar para B em 30 dias

2. **[DECISÃO-2] Qual é o ID real da planilha Google Sheets?**
   - Necessário para substituir `SEU_SPREADSHEET_ID_AQUI` no workflow

3. **[DECISÃO-3] A coluna `Gestor` existe na planilha?**
   - Se sim: confirmar nome exato da coluna
   - Se não: adicionar ou desativar o filtro por gestor

---

## DIAGRAMA ANTES/DEPOIS

### Antes (fluxo atual)

```
[Webhook GET] → [Google Sheets: lê tudo] → [Function: Normalizar] → [Function: Agregar] → [HTTP Response]
```

### Depois (fluxo otimizado)

```
[Webhook GET]
    │
    ├─ [IF: API Key válida?] ──NÃO──→ [HTTP Response 401: Não autorizado]
    │
    ↓ SIM
    │
    ├─ [IF: Cache válido?] ──SIM──→ [HTTP Response 200: dados do cache]
    │
    ↓ NÃO/EXPIRADO
    │
[Google Sheets: lê com filtro de data]
    │
[Function: Normalizar + fallback Gestor]
    │
[Function: Agregar + status sem-dados para leads=0 + salvar cache]
    │
[HTTP Response 200]
    │
(qualquer erro) → [Error Trigger] → [HTTP Response 500 + log]
```

---

## SOLUÇÕES DETALHADAS

---

### A01 — Error Handler

**O que adicionar:** Nó `Error Trigger` conectado ao workflow + nó `Respond to Webhook` de fallback.

**Código adicional no início do Function — Normalizar (wrap de segurança):**
```javascript
// Validação de input mínimo
if (!$input.all() || $input.all().length === 0) {
  throw new Error('Google Sheets retornou 0 linhas — planilha vazia ou inacessível');
}
```

**Nó Error Trigger (adicionar como workflow separado de error handling):**
- Tipo: `n8n-nodes-base.errorTrigger`
- Ação: envia notificação (Slack, email ou webhook interno) + loga o erro

**Resposta HTTP de erro a adicionar:**
```javascript
// Para usar no path de erro
return [{
  json: {
    status: 'error',
    message: 'Falha ao carregar dados. Tente novamente em instantes.',
    timestamp: new Date().toISOString()
  }
}];
```

---

### A02 — Checklist de substituição antes do import

**Checklist obrigatório (adicionar à documentação de deploy):**

```
ANTES DE ATIVAR O WORKFLOW NO N8N:

[ ] 1. Substituir SEU_SPREADSHEET_ID_AQUI pelo ID real da planilha
       → Copiar da URL: docs.google.com/spreadsheets/d/[ID_AQUI]/edit

[ ] 2. Selecionar a credential OAuth2 correta no nó Google Sheets
       → Credentials > googleSheetsOAuth2Api > selecionar conta

[ ] 3. Confirmar nome da aba da planilha
       → Padrão configurado: "Dados" — ajustar se diferente

[ ] 4. Configurar COCKPIT_API_KEY em Settings > Variables do n8n
       → Valor: string aleatória de 32+ caracteres

[ ] 5. Ativar o workflow (toggle no canto superior direito)

[ ] 6. Testar com: GET /webhook/cockpit/performance?apiKey=SUA_CHAVE
```

---

### A03 — Autenticação por API Key

**Adicionar como primeiro nó após o Webhook (nó `IF`):**

```javascript
// Nó: Validar API Key
// Tipo: n8n-nodes-base.if

// Condição:
// $json.query.apiKey === $vars.COCKPIT_API_KEY

// Branch FALSE → Respond to Webhook com:
{
  "status": "error",
  "message": "Não autorizado"
}
// HTTP Status: 401
```

**Configurar no n8n:** Settings → Variables → `COCKPIT_API_KEY = [sua chave]`

**Atualizar o frontend:**
```javascript
// Antes
const API = 'https://editor.luqz.com.br/webhook/cockpit/performance';

// Depois
const API_KEY = 'sua-chave-aqui'; // mover para .env ou variável de ambiente
const API = `https://editor.luqz.com.br/webhook/cockpit/performance?apiKey=${API_KEY}`;
```

---

### A04 — Status `sem-dados` quando leads = 0

**Alterar no Function — Agregar e Calcular:**

```javascript
// Substituir o bloco de cálculo de status:

const cpl = c.leads > 0
  ? parseFloat((c.investimento / c.leads).toFixed(2))
  : null; // null = sem dados reais

let status = 'verde';
if (cpl === null) {
  status = 'sem-dados'; // NOVO — substitui o false-positive de verde
} else if (metaCPA > 0) {
  if (cpl > metaCPA)            status = 'vermelho';
  else if (cpl > metaCPA * 0.8) status = 'amarelo';
}

return {
  cliente: c.cliente,
  leads:   c.leads,
  cpl:     cpl ?? 0,    // retorna 0 no JSON mas status já reflete realidade
  status,
};
```

---

### M01 — Filtro de data para limitar leitura

**Adicionar no Function — Normalizar (após normalização, antes de retornar):**

```javascript
// Limitar ao mês corrente (evitar acúmulo histórico na leitura)
// Requer coluna "Mês" ou "Data" na planilha
// Se planilha não tiver coluna de data, esta otimização requer mudança na estrutura

// Implementação futura — depende de DECISÃO-3 sobre estrutura da planilha
// Por enquanto: garantir que a planilha só tenha dados do período vigente
```

> **Nota do Designer:** Esta otimização depende da estrutura da planilha. Recomendo adicionar coluna `Período` (ex: `2026-04`) para filtrar por mês corrente. Decisão a confirmar com usuário.

---

### M02 — Cache via Static Data (TTL 2 minutos)

**Substituir o início do Function — Agregar e Calcular:**

```javascript
// ── CACHE ──────────────────────────────────────────────────
const cache = $getWorkflowStaticData('global');
const CACHE_TTL = 120_000; // 2 minutos

if (cache.payload && (Date.now() - cache.ts) < CACHE_TTL) {
  return [{ json: cache.payload }];
}
// ── FIM CACHE ───────────────────────────────────────────────

const rows = $input.all().map(i => i.json);
// ... (processamento normal) ...

// ADICIONAR ao final, antes do return:
const payload = {
  status: 'ok',
  totalClientes: resultado.length,
  data: resultado,
  geradoEm: new Date().toISOString(),
  fromCache: false,
};
cache.ts = Date.now();
cache.payload = { ...payload, fromCache: true };

return [{ json: payload }];
```

---

### M03 — Fallback seguro para coluna Gestor ausente

**Alterar no Function — Normalizar:**

```javascript
// Substituir a linha de gestor por:
gestor: String(r['Gestor'] ?? r['gestor'] ?? '').trim(),

// O filtro já funciona: se gestor = '' e query param presente, nenhum match
// Adicionar resposta informativa quando filtro retorna vazio:
```

**Adicionar validação no Function — Agregar (após processamento):**

```javascript
// Após calcular resultado:
const gestorFiltro = $('Webhook').first().json.query?.gestor;
if (gestorFiltro && resultado.length === 0) {
  return [{
    json: {
      status: 'ok',
      totalClientes: 0,
      data: [],
      aviso: `Nenhum cliente encontrado para o gestor "${gestorFiltro}". Verifique se a coluna Gestor existe na planilha e se o nome está correto.`,
      geradoEm: new Date().toISOString(),
    }
  }];
}
```

---

## CRITÉRIOS DE VALIDAÇÃO POR MUDANÇA

| Mudança | Como validar |
|---|---|
| A01 — Error Handler | Simular erro: alterar temporariamente o Spreadsheet ID para ID inválido e verificar se retorna JSON de erro (não timeout) |
| A02 — Checklist | Fazer import em ambiente de teste com valores placeholder e confirmar que o n8n bloqueia ativação |
| A03 — API Key | Testar sem `?apiKey` → deve retornar 401. Testar com chave errada → 401. Testar com chave correta → 200 |
| A04 — sem-dados | Adicionar linha na planilha com cliente sem leads (0) e verificar se status retorna `"sem-dados"` |
| M01 — filtro data | Verificar tempo de resposta com planilha grande (50+ linhas) |
| M02 — cache | Fazer 2 requests seguidos e verificar `fromCache: true` na segunda resposta |
| M03 — fallback gestor | Testar `?gestor=GestorInexistente` → deve retornar array vazio com campo `aviso` |

---

## PROBLEMAS DE BAIXA PRIORIDADE (próximo ciclo)

| ID | Descrição | Quando endereçar |
|---|---|---|
| B01 | Monitoramento externo (UptimeRobot, alertas de falha) | Após estabilização do fluxo em produção por 2 semanas |
| B02 | Atualizar `executionOrder` | Na próxima atualização de versão do n8n |
