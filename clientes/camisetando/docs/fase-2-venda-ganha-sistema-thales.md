# Camisetando | Fase 2 — Venda Ganha → Sistema Thales

**Workflow ID:** `endVw2rhUyrmhcDj`
**Status:** Ativo
**Última atualização:** 2026-04-08
**Ambiente:** http://editor.luqz.com.br

---

## Objetivo

Quando um lead no Kommo avança para a etapa **"Venda Ganha"**, automaticamente:
1. Busca os dados completos do lead e do cliente no Kommo
2. Cria ou localiza o cliente no Sistema Thales
3. Cria o pedido no Sistema Thales
4. Salva o ID do pedido de volta no card do Kommo
5. Notifica o cliente via WhatsApp
6. Registra o evento no Google Sheets

---

## Fluxo Completo

```
Kommo (webhook POST /venda-ganha-kommo)
  → [IF] status_id == 103061671 (Venda Ganha)?
    ✓ SIM
      → GET Kommo: lead completo (?with=contacts)
      → GET Kommo: dados do contato
      → [CODE] Monta payload unificado
      → POST Thales: /integrations/clients
      → [CODE] Vincula client_id ao pedido
      → POST Thales: /integrations/orders
      → PATCH Kommo: salva order_id no card
      → POST Evolution API: envia WhatsApp ao cliente
      → Google Sheets: registra log
      → Responde webhook 200 OK
    ✗ NÃO → Responde webhook e ignora
```

---

## Nós do Workflow

| # | Nome | Tipo | Descrição |
|---|---|---|---|
| 1 | Webhook - Venda Ganha (Kommo) | Webhook | Recebe evento do Kommo |
| 2 | É etapa Venda Ganha? | IF | Filtra pelo status_id 103061671 |
| 3 | Busca dados completos do lead | HTTP GET | Kommo /api/v4/leads/{id}?with=contacts |
| 4 | Busca dados do contato (cliente) | HTTP GET | Kommo /api/v4/contacts/{id} |
| 5 | Monta payload para o sistema Thales | Code | Normaliza e valida os dados |
| 6 | Cria/busca cliente no sistema Thales | HTTP POST | /integrations/clients |
| 7 | Vincula ID do cliente ao pedido | Code | Injeta client_id no payload do pedido |
| 8 | Cria pedido no sistema Thales | HTTP POST | /integrations/orders |
| 9 | Salva ID do pedido no card Kommo | HTTP PATCH | Kommo /api/v4/leads/{id} |
| 10 | Notifica cliente via WhatsApp | HTTP POST | Evolution API |
| 11 | Registra log no Google Sheets | Google Sheets | Append de linha de log |
| 12 | Responde webhook com sucesso | Respond to Webhook | 200 OK |
| 13 | Ignora (outro status) | Respond to Webhook | Saída do IF false |

---

## Estrutura do Payload (nó 5 → nó 8)

```json
{
  "cliente": {
    "nome": "Nome do Cliente",
    "whatsapp": "5511999999999",
    "email": null
  },
  "pedido": {
    "kommo_lead_id": 123456,
    "nome_negociacao": "Camisetas Empresa X",
    "valor_orcamento": "1500.00",
    "quantidade_pecas": "50",
    "link_orcamento": "https://...",
    "data_prevista_entrega": "2026-05-01",
    "origem_lead": "Instagram",
    "tipo_cliente": "PJ",
    "observacoes": "...",
    "data_pedido": "2026-04-08",
    "prioridade": "baixa",
    "status_inicial": "pendente",
    "cliente_id": "abc123"
  },
  "meta": {
    "timestamp": "2026-04-08T19:00:00.000Z",
    "responsavel_kommo_id": 789
  }
}
```

---

## APIs Utilizadas

| Sistema | Base URL | Auth |
|---|---|---|
| Kommo | `https://camisetandoestamparia.kommo.com/api/v4` | Bearer Token (JWT) |
| Thales (clientes) | `https://api.camisetandoestamparia.com.br/integrations/clients` | — |
| Thales (pedidos) | `https://api.camisetandoestamparia.com.br/integrations/orders` | — |
| Evolution API | `https://SEU_EVOLUTION_API.com` | ⚠️ NÃO CONFIGURADO |
| Google Sheets | Via node nativo n8n | OAuth2 |

---

## Problemas Identificados (2026-04-08)

### 🔴 Críticos
- **Evolution API com URL placeholder** — `https://SEU_EVOLUTION_API.com` nunca foi configurada. WhatsApp não dispara.
- **Zero execuções registradas** — Webhook pode não estar configurado no Kommo ou URL está errada.

### 🟡 Importantes
- **Sem Error Handler global** — falhas não geram alertas.
- **Sem retry** nos HTTP Requests para o Thales — timeout ou 500 derruba o fluxo inteiro.

### 🟢 Melhorias
- `JSON.parse` no contato sem try/catch — pode quebrar se Kommo retornar objeto ao invés de string.

---

## Configuração do Webhook no Kommo

```
Caminho: Configurações → Webhooks → Adicionar webhook
URL: http://editor.luqz.com.br/webhook/venda-ganha-kommo
Evento: Lead status changed
```

O filtro por etapa é feito internamente no n8n (status_id `103061671`).

---

## Campos Personalizados Mapeados (Kommo)

| Campo | Tipo |
|---|---|
| Valor do orçamento | Número |
| Quantidade de peças | Número |
| Link do orçamento | Texto/URL |
| Data prevista de entrega | Data |
| Origem do lead | Texto |
| Tipo de cliente | Seleção |
| Observações | Texto longo |

---

## Histórico

| Data | Evento |
|---|---|
| 2026-03-23 | Workflow criado |
| 2026-04-08 | Auditoria inicial pelo Squad OpenSquad |
