# DOCUMENTAÇÃO DE FLUXO — Camisetando | Fase 2 - Venda Ganha → Sistema Thales

**Versão do documento:** 1.0
**Status da implementação:** Blueprint aprovado — aguardando implementação
**Owner do fluxo:** Operações Camisetando
**Última atualização:** 2026-04-09
**Squad responsável pela documentação:** luqz-n8n

---

## 1. VISÃO GERAL

| Campo | Valor |
|---|---|
| **Nome no N8N** | Camisetando \| Fase 2 - Venda Ganha → Sistema Thales |
| **ID no N8N** | `endVw2rhUyrmhcDj` |
| **Propósito** | Quando um lead é movido para a etapa "Venda Ganha" no Kommo, cria automaticamente o cliente e o pedido no sistema Thales e notifica o cliente via WhatsApp |
| **Status atual** | Ativo — com 3 nós quebrados (ver seção 4) |
| **Owner** | Operações Camisetando |
| **Gatilho** | Webhook POST disparado pelo Kommo a cada mudança de etapa de lead |
| **Sistemas integrados** | Kommo CRM, Sistema Thales, Evolution API (WhatsApp), Google Sheets |
| **Volume estimado** | Por evento (1 execução por venda fechada) |
| **Criticidade** | **Alta** — falha aqui = pedido não criado no sistema de produção |

---

## 2. COMO OPERAR

### 2.1 Execução Normal
O fluxo é automático. Toda vez que um vendedor arrasta um card para a etapa **"Venda Ganha"** no funil do Kommo, o webhook é disparado e o fluxo executa sem intervenção humana.

**O que acontece automaticamente:**
1. Dados do lead e contato são buscados no Kommo
2. Cliente é criado (ou atualizado) no sistema Thales
3. Pedido é criado no sistema Thales com os dados do lead
4. O ID do pedido é salvo de volta no card do Kommo
5. Cliente recebe confirmação via WhatsApp
6. Log é registrado no Google Sheets

### 2.2 Execução Manual (quando necessário)
Para reprocessar um lead que falhou:

1. Acesse `http://editor.luqz.com.br`
2. Abra o workflow **"Camisetando | Fase 2 - Venda Ganha → Sistema Thales"**
3. Clique em **"Execute Workflow"**
4. No nó `Webhook - Venda Ganha`, injete manualmente o payload do lead:
```json
{
  "body": {
    "leads[update][0][id]": {ID_DO_LEAD},
    "leads[update][0][status_id]": "103061671"
  }
}
```
5. Execute e acompanhe o resultado nó a nó

### 2.3 Como Monitorar
- **Execuções:** N8N → abrir workflow → aba `Executions`
- **Sucesso:** última execução aparece com ícone verde e nó `Responde webhook com sucesso` como último executado
- **Log de pedidos:** Google Sheets → aba `Pedidos Fase 2`
- **Confirmação definitiva:** card do lead no Kommo com campo `ID Pedido Thales` preenchido

### 2.4 O que fazer quando falha

| Sintoma | Causa provável | Ação |
|---|---|---|
| Campo `ID Pedido Thales` vazio no Kommo | Token Kommo expirado (P01) ou não configurado | Renovar token e atualizar variável `KOMMO_TOKEN` no N8N |
| Cliente não recebeu WhatsApp | Evolution API com token/URL errada (P02) ou campo `cellphone` vazio no Kommo | Verificar variáveis `EVOLUTION_API_URL` e `EVOLUTION_API_TOKEN`; confirmar que contato tem telefone cadastrado |
| Pedido não criado no Thales | API do Thales offline ou timeout | Verificar status de `api.camisetandoestamparia.com.br`; reprocessar manualmente |
| Execução não dispara | Webhook não configurado no Kommo | Reconfigurar em Kommo → Configurações → Webhooks |
| Pedido criado com produto errado | Campo `Tipo de Produto` vazio no card Kommo | Preencher o campo no card e reprocessar |
| Alerta de erro recebido no grupo | Qualquer falha no fluxo | Abrir execução com erro no N8N, identificar nó vermelho, corrigir e reprocessar |

### 2.5 Contato em caso de incidente
- **Owner:** Grupo interno de operações (WhatsApp)
- **Alertas automáticos:** O próprio fluxo envia notificação de erro no grupo de operações via Evolution API (após implementação do Error Handler)

---

## 3. ARQUITETURA TÉCNICA

### 3.1 Fluxo Atual [ATUAL — parcialmente quebrado]

```
[Webhook POST /venda-ganha-kommo]  ← disparado pelo Kommo
         ↓
[IF: status_id == 103061671?]
  ├─ NÃO → [Responde webhook 200 (ignora)]
  └─ SIM ↓
[GET Kommo /api/v4/leads/{id}?with=contacts]   ← token hardcoded #1
         ↓
[GET Kommo /api/v4/contacts/{id}]              ← token hardcoded #2 (diferente!)
         ↓
[Code: monta payload cliente + pedido]
         ↓
[POST Thales /integrations/clients]            ← upsert por externalReference
         ↓
[Code: vincula clientId ao orderPayload]       ← externalReference com "-v3" fixo
         ↓
[POST Thales /integrations/orders]             ← Idempotency-Key presente ✅
         ↓
[PATCH Kommo /api/v4/leads/{id}]               ← ❌ TOKEN PLACEHOLDER — NUNCA FUNCIONA
         ↓
[POST Evolution API /message/sendText]         ← ❌ URL E TOKEN PLACEHOLDER — NUNCA FUNCIONA
                                               ← ❌ USA .whatsapp (campo inexistente)
         ↓
[Google Sheets: append "Pedidos Fase 2"]       ← colunas com campos errados
         ↓
[Responde webhook com sucesso]
```

**Problemas críticos ativos:**
- ❌ Nó 9 (`Salva ID do pedido`): token placeholder — falha 100% das execuções
- ❌ Nó 10 (`Notifica WhatsApp`): URL + token + campo errados — falha 100% das execuções
- ⚠️ Nó 11 (`Google Sheets`): colunas mapeadas para campos inexistentes — registros incompletos

---

### 3.2 Fluxo Otimizado [PROPOSTO]

```
[Webhook POST /venda-ganha-kommo]
         ↓
[IF: status_id == 103061671?]
  ├─ NÃO → [Responde webhook 200 (ignora)]
  └─ SIM ↓
[GET Kommo /api/v4/leads/{id}?with=contacts]   ← $env.KOMMO_TOKEN (único)
         ↓
[GET Kommo /api/v4/contacts/{id}]              ← $env.KOMMO_TOKEN (unificado)
         ↓
[Code: monta payload]
  - cellphone (corrigido)
  - tipo_produto (lido do Kommo, fallback Camiseta Dry Fit)
         ↓
[POST Thales /integrations/clients]
         ↓
[Code: vincula clientId]
  - externalReference com timestamp dinâmico
         ↓
[POST Thales /integrations/orders]
         ↓
         ├──────────────────────────────────────┐
         ↓                                      ↓
[PATCH Kommo: salva ID pedido]     [Notifica grupo interno de operações]
         ↓
[POST Evolution: WhatsApp cliente]   ← cellphone correto
         ↓
         ├──────────────────────────────────┐
         ↓                                  ↓
[Responde webhook 200]           [Google Sheets log]
                                   ← colunas corrigidas

+ Error Workflow → util-error-handler-camisetando
  (captura qualquer falha e notifica grupo de operações)
```

---

### 3.3 Entradas

| Campo | Tipo | Origem | Obrigatório |
|---|---|---|---|
| `leads[update][0][status_id]` | string | Kommo Webhook | Condicional |
| `leads[status][0][status_id]` | string | Kommo Webhook | Condicional |
| `leads[update][0][id]` | number | Kommo Webhook | Sim |
| Nome do contato | string | Kommo API (GET contato) | Sim (validado) |
| Telefone PHONE | string | Kommo API (GET contato) | Sim (validado) |
| Valor do orçamento | string | Campo personalizado Kommo | Não |
| Quantidade de peças | string | Campo personalizado Kommo | Não |
| Tipo de Produto | string | Campo personalizado Kommo | Não (fallback: Camiseta Dry Fit) |
| Observações | string | Campo personalizado Kommo | Não |

### 3.4 Saídas

| Campo | Tipo | Destino |
|---|---|---|
| Cliente criado/atualizado | object | Sistema Thales |
| Pedido criado | object | Sistema Thales |
| `ID Pedido Thales` | string | Campo personalizado do lead no Kommo |
| Mensagem de confirmação | string | WhatsApp do cliente |
| Notificação de novo pedido | string | Grupo interno de operações (WhatsApp) |
| Linha de log | row | Google Sheets — aba "Pedidos Fase 2" |
| HTTP 200 | response | Kommo (confirmação do webhook) |

### 3.5 Integrações

| Sistema | Operação | Autenticação | Endpoint |
|---|---|---|---|
| **Kommo CRM** | GET lead, GET contato, PATCH lead | Bearer `$env.KOMMO_TOKEN` | `https://camisetandoestamparia.kommo.com/api/v4/` |
| **Sistema Thales** | POST cliente, POST pedido | API Key `x-api-key` | `https://api.camisetandoestamparia.com.br/integrations/` |
| **Evolution API** | POST sendText | `apikey` header | `https://evolution.camisetando.com.br` |
| **Google Sheets** | Append row | OAuth N8N | Aba: `Pedidos Fase 2` |

### 3.6 Variáveis de Ambiente

| Variável | Uso no fluxo |
|---|---|
| `KOMMO_TOKEN` | Bearer token para todos os 3 nós HTTP do Kommo |
| `EVOLUTION_API_URL` | URL base da Evolution API: `https://evolution.camisetando.com.br` |
| `EVOLUTION_API_TOKEN` | Token de autenticação da Evolution API |
| `EVOLUTION_INSTANCE` | Nome da instância: `camisetando` |
| `CANAL_INTERNO_WHATSAPP` | Número do grupo interno de operações |

---

## 4. PROBLEMAS ATIVOS (versão atual quebrada)

| Problema | Nó | Impacto | Status |
|---|---|---|---|
| Token Kommo placeholder | `Salva ID do pedido` | ID do pedido NUNCA salvo no Kommo | ❌ Não corrigido |
| Evolution API placeholder | `Notifica cliente via WhatsApp` | WhatsApp NUNCA enviado | ❌ Não corrigido |
| Campo `.whatsapp` inexistente | `Notifica cliente via WhatsApp` | Número enviado como `55undefined` | ❌ Não corrigido |
| Sem Error Handling | Todo o fluxo | Falhas invisíveis | ❌ Não corrigido |
| Produto hardcoded | `Vincula ID do cliente ao pedido` | Todos os pedidos como "Camiseta Dry Fit" | ❌ Não corrigido |

---

## 5. IMPLEMENTAÇÃO — INSTRUÇÕES PASSO A PASSO

> Execute nesta ordem exata. Não pule etapas.

---

### FASE 1 — Configurar variáveis de ambiente no N8N

**Onde:** N8N → Settings → Environment Variables (ou `.env` do servidor N8N)

Adicionar/confirmar as seguintes variáveis:

```env
KOMMO_TOKEN=Bearer eyJ...  (token completo com "Bearer " na frente)
EVOLUTION_API_URL=https://evolution.camisetando.com.br
EVOLUTION_API_TOKEN=[PREENCHER — token da Evolution API]
EVOLUTION_INSTANCE=camisetando
CANAL_INTERNO_WHATSAPP=[PREENCHER — número do grupo ex: 5511999999999-grupo@g.us]
```

---

### FASE 2 — Corrigir os 3 nós com erro crítico

#### 2a. Nó: `Salva ID do pedido no card Kommo`
- Abrir nó → Headers → Authorization
- Substituir: `Bearer SEU_TOKEN_KOMMO_AQUI`
- Por: `={{ $env.KOMMO_TOKEN }}`

#### 2b. Nó: `Notifica cliente via WhatsApp`
- **URL:** substituir `https://SEU_EVOLUTION_API.com/message/sendText/camisetando`
  por `={{ $env.EVOLUTION_API_URL }}/message/sendText/{{ $env.EVOLUTION_INSTANCE }}`
- **Header `apikey`:** substituir `SEU_TOKEN_EVOLUTION_API`
  por `={{ $env.EVOLUTION_API_TOKEN }}`
- **Body — campo `number`:** substituir `.cliente.whatsapp`
  por `.cliente.cellphone`

  ```json
  {
    "number": "55{{ $('Monta payload para o sistema Thales').item.json.cliente.cellphone }}",
    "text": "Olá, {{ $('Monta payload para o sistema Thales').item.json.cliente.name.split(' ')[0] }}! 🎉\n\nSeu pedido foi confirmado e já está no nosso sistema de produção.\n\nAssim que tivermos novidades sobre o andamento, a gente te avisa por aqui. 😊"
  }
  ```

#### 2c. Nó: `Busca dados completos do lead` e `Busca dados do contato`
- Em ambos os nós → Headers → Authorization
- Substituir o token hardcoded por: `={{ $env.KOMMO_TOKEN }}`

---

### FASE 3 — Corrigir campo no nó de código (`.whatsapp` → `.cellphone`)

Já coberto no item 2b acima.

---

### FASE 4 — Criar campo `Tipo de Produto` no Kommo

1. Acessar Kommo → Configurações → Campos personalizados → Leads
2. Criar campo do tipo **Lista** (ou Texto) com o nome exato: `Tipo de Produto`
3. Se Lista: cadastrar as opções com os nomes **exatos** como estão no Sistema Thales
4. Atualizar o nó `Monta payload para o sistema Thales` — adicionar no objeto `pedido`:
   ```javascript
   tipo_produto: getCampo(camposLead, 'Tipo de Produto') || 'Camiseta Dry Fit',
   ```
5. Atualizar o nó `Vincula ID do cliente ao pedido`:
   ```javascript
   products: [
     {
       name: payload.pedido.tipo_produto || "Camiseta Dry Fit",
       quantity: Number(payload.pedido.quantidade_pecas) || 1
     }
   ]
   ```

---

### FASE 5 — Corrigir mapeamento do Google Sheets

No nó `Registra log no Google Sheets`, corrigir as colunas:

| Coluna | Expressão correta |
|---|---|
| WhatsApp | `={{ $('Monta payload para o sistema Thales').item.json.cliente.cellphone }}` |
| Tipo Produto | `={{ $('Monta payload para o sistema Thales').item.json.pedido.tipo_produto }}` |
| Data Entrega Prevista | Remover coluna (campo não existe) — ou criar campo no Kommo e adicionar ao payload |

---

### FASE 6 — Mover `Responde webhook` para antes do Sheets

1. Apagar a conexão: `Notifica cliente via WhatsApp` → `Registra log no Google Sheets`
2. Apagar a conexão: `Registra log no Google Sheets` → `Responde webhook com sucesso`
3. Criar conexão: `Notifica cliente via WhatsApp` → `Responde webhook com sucesso`
4. Criar conexão paralela: `Notifica cliente via WhatsApp` → `Registra log no Google Sheets`

---

### FASE 7 — Criar sub-workflow de Error Handler

1. Criar novo workflow com nome: `util-error-handler-camisetando`
2. Adicionar nó **Execute Workflow Trigger** (recebe os dados do erro)
3. Adicionar nó **Set** com a mensagem:
   ```
   ⚠️ ERRO no N8N — Camisetando
   Workflow: {{ $json.workflow.name }}
   Nó: {{ $json.execution.lastNodeExecuted }}
   Erro: {{ $json.execution.error.message }}
   Horário: {{ $now.format('dd/MM/yyyy HH:mm') }}
   ```
4. Adicionar nó **HTTP Request** (POST Evolution API):
   - URL: `={{ $env.EVOLUTION_API_URL }}/message/sendText/{{ $env.EVOLUTION_INSTANCE }}`
   - Header `apikey`: `={{ $env.EVOLUTION_API_TOKEN }}`
   - Body:
     ```json
     {
       "number": "{{ $env.CANAL_INTERNO_WHATSAPP }}",
       "text": "{{ $json.mensagem }}"
     }
     ```
5. Salvar o sub-workflow
6. No workflow principal: **Settings → Error Workflow → selecionar `util-error-handler-camisetando`**

---

### FASE 8 — Adicionar notificação interna de novo pedido

1. Após o nó `Cria pedido no sistema Thales`, adicionar novo nó **HTTP Request**
2. Configurar em paralelo com `Salva ID do pedido no card Kommo` (não em série)
3. Configuração:
   - URL: `={{ $env.EVOLUTION_API_URL }}/message/sendText/{{ $env.EVOLUTION_INSTANCE }}`
   - Método: POST
   - Header `apikey`: `={{ $env.EVOLUTION_API_TOKEN }}`
   - Body:
     ```json
     {
       "number": "{{ $env.CANAL_INTERNO_WHATSAPP }}",
       "text": "🛒 *Novo pedido criado!*\n\nCliente: {{ $('Monta payload para o sistema Thales').item.json.cliente.name }}\nProduto: {{ $('Monta payload para o sistema Thales').item.json.pedido.tipo_produto }}\nQtd: {{ $('Monta payload para o sistema Thales').item.json.pedido.quantidade_pecas }} peças\nLead Kommo: #{{ $('Monta payload para o sistema Thales').item.json.pedido.kommo_lead_id }}"
     }
     ```

---

## 6. CHECKLIST DE VALIDAÇÃO

Execute nesta ordem após implementar todas as fases.

### Pré-requisitos
- [ ] Todas as variáveis de ambiente configuradas no N8N
- [ ] Sub-workflow `util-error-handler-camisetando` criado e salvo
- [ ] Error Workflow vinculado nas configurações do workflow principal

### Teste 1 — Fluxo completo com lead real
- [ ] Mover um lead de teste para "Venda Ganha" no Kommo
- [ ] Verificar que a execução aparece no N8N com status verde
- [ ] Campo `ID Pedido Thales` preenchido no card do Kommo
- [ ] Pedido criado no sistema Thales com dados corretos
- [ ] Cliente recebeu mensagem de confirmação no WhatsApp
- [ ] Grupo de operações recebeu notificação de novo pedido
- [ ] Linha registrada no Google Sheets com todos os campos preenchidos

### Teste 2 — Validação de produto dinâmico
- [ ] Criar lead com campo `Tipo de Produto` preenchido (ex: "Camiseta Polo")
- [ ] Mover para "Venda Ganha"
- [ ] Verificar que pedido no Thales tem `name: "Camiseta Polo"` (não "Camiseta Dry Fit")

### Teste 3 — Validação do Error Handler
- [ ] Temporariamente inserir URL inválida em um nó HTTP Request
- [ ] Executar o fluxo
- [ ] Verificar que o grupo de operações recebeu a mensagem de erro
- [ ] Restaurar URL correta

### Teste 4 — Eventos irrelevantes do Kommo
- [ ] Mover um lead para qualquer etapa que **não** seja "Venda Ganha"
- [ ] Verificar que o fluxo executa e termina no nó `Ignora (outro status)` sem processar nada

### Possíveis falhas pós-implementação

| Cenário | O que verificar |
|---|---|
| WhatsApp não chega ao cliente | Contato no Kommo tem telefone cadastrado? Número está no formato correto (só dígitos)? |
| Pedido criado com `clientId null` | API do Thales retornou estrutura diferente? Verificar `respostaCliente.data?.id` vs `respostaCliente.id` |
| PATCH Kommo retorna 404 | Campo `ID Pedido Thales` não existe como campo personalizado no Kommo — criar o campo |
| Execução duplicada | Lead movido duas vezes para "Venda Ganha" → `externalReference` com timestamp evita pedido duplicado (confirmar comportamento no Thales) |

---

## 7. HISTÓRICO DE MUDANÇAS

| Data | Versão | O que mudou | Responsável |
|---|---|---|---|
| 2026-04-09 | 1.0 | Documento inicial — mapeamento, auditoria e blueprint completos | N8N Docs (Squad luqz-n8n) |

---

## 8. PENDÊNCIAS E PRÓXIMOS PASSOS

### Pendências de configuração (bloqueiam funcionamento)
- [ ] `EVOLUTION_API_TOKEN` — token da Evolution API não fornecido ainda
- [ ] `CANAL_INTERNO_WHATSAPP` — número do grupo de operações não fornecido

### Pendências de decisão
- [ ] Nomes exatos dos produtos no Sistema Thales (para criar campo Lista no Kommo)
- [ ] Comportamento do Thales em reprocessamento: criar novo pedido ou rejeitar duplicata?

### Melhorias para próximo ciclo
- [ ] [P11] Adicionar log na branch de descarte (leads com outros status)
- [ ] Criar campo `ID Pedido Thales` no Kommo se ainda não existir
- [ ] Verificar se existe fluxo reverso (Sistema Thales → Kommo) e documentá-lo
