# Guia de Deploy — Cockpit Performance v2

**Gerado por:** N8N Docs 📄 | Squad N8N — Automações
**Data:** 2026-04-18
**Workflow:** `cockpit-performance-FINAL.workflow.json`

---

## PRÉ-REQUISITOS

- [ ] Acesso ao n8n em `http://editor.luqz.com.br`
- [ ] Conta Google com acesso à planilha `1_QWyiWeHVsh3tdef5JrmobSmNLVlrnQqs0zhQ9S6Usg`
- [ ] Credential OAuth2 do Google Sheets já configurada no n8n (ou criar agora — Passo 1)

---

## PASSO 1 — Configurar Credential Google Sheets (se ainda não existir)

1. No n8n: menu lateral → **Credentials** → **Add Credential**
2. Buscar: `Google Sheets OAuth2 API`
3. Clicar em **Connect my account** e autorizar com a conta Google que tem acesso à planilha
4. Salvar — anotar o nome da credential criada (ex: `Google Sheets — LUQZ`)

---

## PASSO 2 — Importar o Workflow

1. No n8n: **Workflows** → botão `+` → **Import from File**
2. Selecionar: `cockpit-performance-FINAL.workflow.json`
3. O workflow vai abrir no editor

---

## PASSO 3 — Configurar o nó Google Sheets

1. Clicar no nó **Google Sheets — Ler Dados**
2. Em **Credential**: selecionar a credential criada no Passo 1
3. Em **Document**: o campo já está preenchido com o ID correto (`1_QWyiWeHVsh3tdef5JrmobSmNLVlrnQqs0zhQ9S6Usg`)
4. Em **Sheet**: selecionar a aba correta pelo nome (gid `170409107`)
   > ⚠️ O n8n pode não resolver o gid diretamente — se o campo Sheet aparecer vazio, clique no ícone de busca e selecione a aba pelo nome na lista

---

## PASSO 4 — Verificar nomes das colunas

Abrir a planilha e confirmar que as colunas existem com **exatamente** estes nomes:

| Coluna esperada | Observação |
|---|---|
| `Cliente` | Chave de agrupamento — obrigatória |
| `Gestor` | Menu suspenso — confirmado ✅ |
| `Total de Investimento` | Pode ter R$, vírgula — o código normaliza |
| `Total de RESULTADOS (Gerenciador)` | Nome exato com parênteses e acento |
| `Meta de CPA` | Pode ter R$, vírgula — o código normaliza |

> Se algum nome de coluna estiver diferente na planilha, ajustar no código do nó `Function — Normalizar` nos campos `r['nome da coluna']`.

---

## PASSO 5 — Ativar o Workflow

1. No editor do workflow, clicar no toggle **Inactive → Active** (canto superior direito)
2. Confirmar ativação

---

## PASSO 6 — Testar

### Teste básico (todos os clientes):
```
GET http://editor.luqz.com.br/webhook/cockpit/performance
```

### Teste com filtro de gestor:
```
GET http://editor.luqz.com.br/webhook/cockpit/performance?gestor=NomeDoGestor
```

### Resposta esperada:
```json
{
  "status": "ok",
  "totalClientes": 12,
  "data": [
    { "cliente": "Clínica Silva", "leads": 0,  "cpl": 0,      "status": "sem-dados" },
    { "cliente": "Studio Forma",  "leads": 31, "cpl": 187.50, "status": "vermelho"  },
    { "cliente": "Dr. Rodrigues", "leads": 45, "cpl": 96.77,  "status": "amarelo"   },
    { "cliente": "Academia Top",  "leads": 58, "cpl": 62.22,  "status": "verde"     }
  ],
  "geradoEm": "2026-04-18T14:32:00.000Z",
  "fromCache": false
}
```

### Teste de cache (segunda chamada deve retornar `fromCache: true`):
```
GET http://editor.luqz.com.br/webhook/cockpit/performance
# Aguardar 2s e repetir → fromCache: true
```

---

## PASSO 7 — Atualizar o Frontend

Substituir a URL da API no cockpit:

```javascript
// Antes (GAS)
const API_URL = 'https://script.google.com/macros/s/.../exec';

// Depois (n8n)
const API_URL = 'http://editor.luqz.com.br/webhook/cockpit/performance';

// Com filtro de gestor (opcional):
const API_URL = `http://editor.luqz.com.br/webhook/cockpit/performance?gestor=${nomeGestor}`;
```

---

## COMPORTAMENTOS DO SISTEMA

| Situação | Comportamento |
|---|---|
| Cliente com leads > 0 e CPL < meta | `status: "verde"` |
| Cliente com leads > 0 e CPL entre 80%-100% da meta | `status: "amarelo"` |
| Cliente com leads > 0 e CPL > meta | `status: "vermelho"` |
| Cliente com `leads = 0` | `status: "sem-dados"` — aparece por último na lista |
| Filtro `?gestor=X` sem match | Retorna `data: []` com campo `aviso` explicativo |
| Segunda chamada em até 2min | `fromCache: true` — não bate no Sheets |
| Google Sheets inacessível | HTTP 500 com JSON de erro estruturado |

---

## PRÓXIMOS PASSOS (backlog)

| Prioridade | Item |
|---|---|
| 🟡 Média | Monitoramento externo — UptimeRobot apontando para o endpoint |
| 🟡 Média | Error Workflow no n8n — notificação no Slack/WhatsApp quando o fluxo falha |
| 🟢 Baixa | Migrar para HTTPS quando SSL estiver configurado na VPS |
| 🟢 Baixa | Adicionar coluna `Período` na planilha para filtro por mês |
