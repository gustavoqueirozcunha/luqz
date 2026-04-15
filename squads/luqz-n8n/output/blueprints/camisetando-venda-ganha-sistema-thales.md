# BLUEPRINT TÉCNICO — Camisetando | Fase 2 - Venda Ganha → Sistema Thales

**Baseado na auditoria de:** 2026-04-09
**Data do Blueprint:** 2026-04-09
**Desenhado por:** N8N Designer 🏗️

---

## ESCOPO DE INTERVENÇÃO

| Problema (Ref. Auditoria) | Prioridade | Incluído neste ciclo |
|---|---|---|
| [P01] Token Kommo placeholder no nó "Salva ID do pedido" | Alta | ✅ Sim |
| [P02] Evolution API não configurada | Alta | ✅ Sim |
| [P03] Campo `whatsapp` inexistente no payload | Alta | ✅ Sim |
| [P04] Ausência total de Error Handling | Alta | ✅ Sim |
| [P05] Produto hardcoded para todos os pedidos | Alta | ✅ Sim |
| [P06] Dois tokens Kommo distintos | Média | ✅ Sim (resolvido junto com P01) |
| [P07] ExternalReference hardcoded com sufixo manual | Média | ✅ Sim |
| [P08] Campos errados no Google Sheets | Média | ✅ Sim |
| [P09] Sheets antes do respondToWebhook | Média | ✅ Sim |
| [P10] Sem notificação interna de novo pedido | Baixa | ✅ Sim (baixo custo) |
| [P11] Branch de descarte sem log | Baixa | ❌ Próximo ciclo |

---

## MUDANÇAS PROPOSTAS

### Mudança 1 — Mover credenciais Kommo para variáveis de ambiente

| Campo | Detalhe |
|---|---|
| **Resolve** | [P01] e [P06] |
| **Tipo de mudança** | Configuração — substituir tokens hardcoded por variável de ambiente |
| **Nó(s) afetado(s)** | Nó 3 `Busca dados completos do lead`, Nó 4 `Busca dados do contato`, Nó 9 `Salva ID do pedido no card Kommo` |
| **O que muda** | Todos os três nós passam a usar `$env.KOMMO_TOKEN`. Elimina os dois tokens distintos e o placeholder. |
| **Motivo da escolha** | Centraliza manutenção — quando o token expirar, atualiza em um lugar. Elimina exposição de token como texto. |
| **Critério de validação** | Executar fluxo com lead real. Verificar se campo "ID Pedido Thales" aparece no card do Kommo após execução. |

```
N8N Settings → Environment Variables:
KOMMO_TOKEN = [token_kommo_ativo]

Uso nos 3 nós:
Header Authorization: Bearer {{ $env.KOMMO_TOKEN }}
```

---

### Mudança 2 — Configurar Evolution API com variáveis de ambiente

| Campo | Detalhe |
|---|---|
| **Resolve** | [P02] |
| **Tipo de mudança** | Configuração — substituir placeholders por variáveis de ambiente |
| **Nó(s) afetado(s)** | Nó 10: `Notifica cliente via WhatsApp` |
| **O que muda** | URL e token da Evolution API saem dos placeholders e entram nas env vars. |
| **Critério de validação** | Executar fluxo com lead real e confirmar recebimento de WhatsApp no telefone do cliente de teste. |

```
N8N Settings → Environment Variables:
EVOLUTION_API_URL   = https://[url-real]
EVOLUTION_API_TOKEN = [token-real]
EVOLUTION_INSTANCE  = camisetando

Uso no nó:
URL: {{ $env.EVOLUTION_API_URL }}/message/sendText/{{ $env.EVOLUTION_INSTANCE }}
Header apikey: {{ $env.EVOLUTION_API_TOKEN }}
```

---

### Mudança 3 — Corrigir campo `whatsapp` para `cellphone` no nó de WhatsApp

| Campo | Detalhe |
|---|---|
| **Resolve** | [P03] |
| **Tipo de mudança** | Correção de expressão no JSON body |
| **Nó(s) afetado(s)** | Nó 10: `Notifica cliente via WhatsApp` |
| **Critério de validação** | Verificar no log de execução que o número tem 11 dígitos após o "55". |

```json
ANTES:
"number": "55{{ $('Monta payload para o sistema Thales').item.json.cliente.whatsapp }}"

DEPOIS:
"number": "55{{ $('Monta payload para o sistema Thales').item.json.cliente.cellphone }}"
```

---

### Mudança 4 — Adicionar Error Trigger com notificação de falha

| Campo | Detalhe |
|---|---|
| **Resolve** | [P04] |
| **Tipo de mudança** | Adição de sub-workflow de erro |
| **Nó(s) afetado(s)** | Workflow principal: Settings → Error Workflow → `util-error-handler-camisetando` |
| **O que muda** | Criar workflow separado que captura todos os erros e notifica equipe. |
| **Critério de validação** | Forçar erro (URL inválida no Thales). Notificação deve chegar em até 1 minuto. |

**Sub-workflow `util-error-handler-camisetando`:**
```
[Error Trigger]
      ↓
[Set — monta mensagem de alerta]
  "⚠️ ERRO N8N
  Workflow: {$json.workflow.name}
  Nó que falhou: {$json.execution.lastNodeExecuted}
  Erro: {$json.execution.error.message}
  Horário: {DateTime.now()}"
      ↓
[HTTP Request — notifica canal interno]
  (mesmo canal da Mudança 9)
```

---

### Mudança 5 — Extrair tipo de produto do Kommo (remover produto hardcoded)

| Campo | Detalhe |
|---|---|
| **Resolve** | [P05] |
| **Tipo de mudança** | Modificação de código nos nós 5 e 7 |
| **Nó(s) afetado(s)** | Nó 5: `Monta payload`, Nó 7: `Vincula ID do cliente ao pedido` |
| **Critério de validação** | Lead de teste com campo "Tipo de Produto" preenchido → pedido no Thales com produto correto. |

**Adição no nó 5 (após extração dos camposLead):**
```javascript
const tipoProduto = getCampo(camposLead, 'Tipo de Produto')
                 || getCampo(camposLead, 'Produto')
                 || 'Camiseta Dry Fit'; // fallback explícito

// Adicionar ao objeto pedido:
pedido: {
  ...camposAnteriores,
  tipo_produto: tipoProduto,
}
```

**Substituição no nó 7:**
```javascript
// ANTES:
name: "Camiseta Dry Fit",

// DEPOIS:
name: payload.pedido.tipo_produto,
```

---

### Mudança 6 — ExternalReference dinâmico com timestamp (sem sufixo manual)

| Campo | Detalhe |
|---|---|
| **Resolve** | [P07] |
| **Tipo de mudança** | Modificação de 1 linha no código do nó 7 |
| **Critério de validação** | Reprocessar mesmo lead em dia diferente — pedido criado sem conflito de chave. |

```javascript
// ANTES:
externalReference: "pedido-" + payload.pedido.kommo_lead_id + "-v3",

// DEPOIS:
const dataHoje = new Date().toISOString().split('T')[0].replace(/-/g,'');
externalReference: `pedido-${payload.pedido.kommo_lead_id}-${dataHoje}`,
```

---

### Mudança 7 — Corrigir mapeamento de colunas do Google Sheets

| Campo | Detalhe |
|---|---|
| **Resolve** | [P08] |
| **Tipo de mudança** | Reconfiguração do nó Sheets |
| **Critério de validação** | Executar fluxo e confirmar todas as colunas preenchidas corretamente. |

| Coluna no Sheets | Expressão correta |
|---|---|
| WhatsApp | `={{ $('Monta payload para o sistema Thales').item.json.cliente.cellphone }}` |
| Nome Cliente | `={{ $('Monta payload para o sistema Thales').item.json.cliente.name }}` |
| ID Lead Kommo | `={{ $('Monta payload para o sistema Thales').item.json.pedido.kommo_lead_id }}` |
| Qtd Peças | `={{ $('Monta payload para o sistema Thales').item.json.pedido.quantidade_pecas }}` |
| Valor Orçamento | `={{ $('Monta payload para o sistema Thales').item.json.pedido.valor_orcamento }}` |
| Tipo Produto | `={{ $('Monta payload para o sistema Thales').item.json.pedido.tipo_produto }}` |
| ID Pedido Thales | `={{ $json.id }}` |
| Data | `={{ new Date().toISOString() }}` |

---

### Mudança 8 — Antecipar `respondToWebhook` para antes do Google Sheets

| Campo | Detalhe |
|---|---|
| **Resolve** | [P09] |
| **Tipo de mudança** | Reestruturação de ordem dos nós — branch paralela |
| **Critério de validação** | Desativar Sheets temporariamente. Kommo deve receber HTTP 200 sem timeout. |

```
ANTES:
Notifica WhatsApp → Registra Sheets → Responde webhook

DEPOIS:
Notifica WhatsApp → Responde webhook (imediato)
                 ↘ Registra Sheets (branch paralela)
```

---

### Mudança 9 — Adicionar notificação interna de novo pedido criado

| Campo | Detalhe |
|---|---|
| **Resolve** | [P10] |
| **Tipo de mudança** | Adição de nó após Nó 8 `Cria pedido no Sistema Thales` |
| **Critério de validação** | Pedido de teste → notificação interna recebida no canal configurado. |

**Mensagem interna sugerida:**
```
🟢 Novo pedido | Camisetando
Cliente: {cliente.name}
WhatsApp: {cliente.cellphone}
Produto: {pedido.tipo_produto} × {pedido.quantidade_pecas} peças
Valor: R$ {pedido.valor_orcamento}
ID Pedido: {id_thales} | Lead Kommo: #{kommo_lead_id}
```

---

## DIAGRAMA — VERSÃO OTIMIZADA COMPLETA

```
[Webhook POST /venda-ganha-kommo]
          ↓
[É etapa Venda Ganha? (status_id == 103061671)]
  ↓ SIM                         ↓ NÃO
  ↓                       [respondToWebhook — Ignora]
[GET Kommo /leads/{id}?with=contacts]
  Auth: Bearer $env.KOMMO_TOKEN
          ↓
[GET Kommo /contacts/{id}]
  Auth: Bearer $env.KOMMO_TOKEN
          ↓
[Monta payload]
  + tipo_produto lido do Kommo (fallback: "Camiseta Dry Fit")
  + telefone em campo cellphone
          ↓
[POST Thales /integrations/clients — upsert]
  x-api-key: $env.THALES_API_KEY
          ↓
[Vincula clientId — externalReference: pedido-{id}-{yyyymmdd}]
          ↓
[POST Thales /integrations/orders]
  Idempotency-Key: {externalReference}
     ↓                              ↓
[Notifica equipe interna]    [PATCH Kommo /leads/{id}]
(WhatsApp grupo / Slack)      Auth: Bearer $env.KOMMO_TOKEN
                                    ↓
                          [POST Evolution API /sendText]
                            number: 55{cellphone}
                              ↓                  ↓
                       [respondToWebhook]   [Registra Sheets]
                       (imediato — 200)     (branch paralela)

+-----------------------------------------------+
| ERROR WORKFLOW (ativo em paralelo)            |
| util-error-handler-camisetando                |
| [Error Trigger] → [Formata] → [Notifica time] |
+-----------------------------------------------+
```

---

## VARIÁVEIS DE AMBIENTE NECESSÁRIAS

| Variável | Uso | Status |
|---|---|---|
| `KOMMO_TOKEN` | Auth todos os nós Kommo (3 nós) | ⚠️ CONFIGURAR |
| `EVOLUTION_API_URL` | URL base Evolution API | ⚠️ CONFIGURAR |
| `EVOLUTION_API_TOKEN` | Auth Evolution API | ⚠️ CONFIGURAR |
| `EVOLUTION_INSTANCE` | Nome instância Evolution (`camisetando`) | ⚠️ CONFIGURAR |
| `THALES_API_KEY` | Auth Sistema Thales | ⚠️ MOVER do hardcode |
| `N8N_URL` | URL base N8N para links no alerta de erro | ⚠️ CONFIGURAR |

---

## SUB-WORKFLOW NECESSÁRIO

**Nome:** `util-error-handler-camisetando`
**Reutilizado por:** Todos os fluxos N8N da Camisetando
**Configurar em:** Workflow principal → Settings → Error Workflow

---

## DECISÕES QUE REQUEREM INPUT DO USUÁRIO

- [ ] **Canal de notificação interna:** Alertas de novo pedido (M9) e erros (M4) vão para onde? WhatsApp grupo? Slack? Qual número/canal?
- [ ] **Nome exato do campo "Tipo de Produto" no Kommo:** Como está cadastrado em Configurações → Campos personalizados?
- [ ] **URL real da Evolution API:** Qual é a URL de produção da instância da Camisetando?
- [ ] **Campo "ID Pedido Thales" já existe no Kommo?** Se não, precisa ser criado em Configurações → Campos personalizados antes de implementar.
