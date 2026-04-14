# MAPEAMENTO DE FLUXO — Camisetando | Fase 2 - Venda Ganha → Sistema Thales

**ID do Workflow:** endVw2rhUyrmhcDj
**Status:** Ativo
**Data do Mapeamento:** 2026-04-09
**Mapeado por:** N8N Mapper 🗺️

---

## 1. GATILHO

| Campo | Valor |
|---|---|
| Tipo | Webhook |
| Path | `/webhook/venda-ganha-kommo` |
| Método HTTP | POST |
| Frequência | Por evento (toda mudança de etapa de lead no Kommo) |
| Disparado por | Kommo CRM — evento: `Lead status changed` |
| Configuração no Kommo | Configurações → Webhooks → URL: `[n8n-url]/webhook/venda-ganha-kommo` |

---

## 2. ENTRADAS

| Campo | Tipo | Origem | Obrigatório | Observação |
|---|---|---|---|---|
| `body.leads[update][0][status_id]` | string | Kommo Webhook | Condicional | Presente quando lead é atualizado de etapa |
| `body.leads[status][0][status_id]` | string | Kommo Webhook | Condicional | Alternativa ao campo acima (fallback) |
| `body.leads[update][0][id]` | number | Kommo Webhook | Sim | ID do lead que mudou de etapa |
| `body.leads[status][0][id]` | number | Kommo Webhook | Condicional | Alternativa ao campo acima (fallback) |
| `body.leads[add][0][id]` | number | Kommo Webhook | Condicional | Segundo fallback para ID do lead |

**Nota:** O Kommo envia o payload em diferentes estruturas dependendo do tipo de evento. O fluxo usa operador `??` para lidar com as variações.

---

## 3. PROCESSAMENTO (PASSO A PASSO)

| # | Nó | Tipo N8N | O que faz |
|---|---|---|---|
| 1 | Webhook - Venda Ganha (Kommo) | `n8n-nodes-base.webhook` | Recebe POST do Kommo a cada mudança de etapa de qualquer lead |
| 2 | É etapa Venda Ganha? | `n8n-nodes-base.if` | Filtra: verifica se `status_id` == `103061671` (etapa "Venda Ganha") |
| 3 | Busca dados completos do lead | `n8n-nodes-base.httpRequest` | GET Kommo `/api/v4/leads/{id}?with=contacts` — traz campos personalizados e contatos vinculados |
| 4 | Busca dados do contato (cliente) | `n8n-nodes-base.httpRequest` | GET Kommo `/api/v4/contacts/{id}` — traz nome, telefone, email e CPF do contato |
| 5 | Monta payload para o sistema Thales | `n8n-nodes-base.code` | Consolida dados do lead + contato num payload estruturado (`cliente` + `pedido`) |
| 6 | Cria/busca cliente no sistema Thales | `n8n-nodes-base.httpRequest` | POST `https://api.camisetandoestamparia.com.br/integrations/clients` — upsert do cliente pelo WhatsApp |
| 7 | Vincula ID do cliente ao pedido | `n8n-nodes-base.code` | Pega o `id` retornado pelo Thales e monta o `orderPayload` com `clientId` |
| 8 | Cria pedido no sistema Thales | `n8n-nodes-base.httpRequest` | POST `https://api.camisetandoestamparia.com.br/integrations/orders` com Idempotency-Key |
| 9 | Salva ID do pedido no card Kommo | `n8n-nodes-base.httpRequest` | PATCH Kommo `/api/v4/leads/{id}` — salva campo "ID Pedido Thales" no card do lead |
| 10 | Notifica cliente via WhatsApp | `n8n-nodes-base.httpRequest` | POST Evolution API `/message/sendText/camisetando` — envia mensagem de confirmação de pedido |
| 11 | Registra log no Google Sheets | `n8n-nodes-base.googleSheets` | Append de linha na aba "Pedidos Fase 2" com dados do pedido criado |
| 12 | Responde webhook com sucesso | `n8n-nodes-base.respondToWebhook` | Retorna HTTP 200 para o Kommo confirmando recebimento |

**Branches (ramificações):**
- **Branch A (main:0):** `status_id == 103061671` → segue para o processamento completo (nó 3 em diante)
- **Branch B (main:1):** `status_id != 103061671` → vai direto para `Ignora (outro status)` (respondToWebhook sem processar)

---

## 4. SAÍDAS

| Campo | Tipo | Destino | Condição de Envio |
|---|---|---|---|
| Pedido criado | object | Sistema Thales (`/integrations/orders`) | Sempre que status_id == 103061671 |
| Cliente criado/atualizado | object | Sistema Thales (`/integrations/clients`) | Sempre (upsert) |
| `ID Pedido Thales` | string | Kommo CRM (campo personalizado do lead) | Após criação do pedido |
| Mensagem de confirmação | string | WhatsApp do cliente (via Evolution API) | Após salvar ID no Kommo |
| Log da operação | row | Google Sheets (aba "Pedidos Fase 2") | Após notificação WhatsApp |
| HTTP 200 | response | Kommo (resposta ao webhook) | Ao final do fluxo completo |

---

## 5. INTEGRAÇÕES

| Sistema | Tipo | Operação | Autenticação |
|---|---|---|---|
| **Kommo CRM** (camisetandoestamparia.kommo.com) | API REST v4 | GET lead, GET contato, PATCH lead | Bearer Token (JWT hardcoded em 2 nós diferentes) |
| **Sistema Thales** (api.camisetandoestamparia.com.br) | API REST | POST /integrations/clients, POST /integrations/orders | API Key: `itg_McKDhV...` (header `x-api-key`) |
| **Evolution API** | API REST | POST /message/sendText/camisetando | Token header `apikey` [PENDÊNCIA: URL e token com placeholder] |
| **Google Sheets** | Google Sheets API | Append row na aba "Pedidos Fase 2" | Credencial OAuth configurada no N8N |

---

## 6. DEPENDÊNCIAS

- **Sub-workflows chamados:** nenhum
- **Depende de dados de outros fluxos:** não — este é um fluxo independente
- **Outros fluxos dependem deste:** [PENDÊNCIA: verificar se existe fluxo reverso Sistema Thales → Kommo usando o `kommo_lead_id`]

---

## 7. CAMPOS PERSONALIZADOS DO KOMMO MAPEADOS

| Campo no Kommo | Campo no Payload | Obrigatório no Pedido |
|---|---|---|
| `Valor do orçamento` | `pedido.valor_orcamento` | Não (pode vir nulo) |
| `Quantidade de peças` | `pedido.quantidade_pecas` | Não (default: 1 se nulo) |
| `Observações` | `pedido.observacoes` | Não (default: vazio) |
| `PHONE` (campo sistema contato) | `cliente.cellphone` | Sim (validado no código) |
| `EMAIL` | `cliente.email` | Não |
| `CPF` | `cliente.cpf` | Não |
| `ID Pedido Thales` (campo personalizado) | — | Preenchido após criação |

---

## 8. PAYLOAD ENVIADO AO SISTEMA THALES

### Criar/buscar cliente (POST /integrations/clients)
```json
{
  "externalReference": "kommo-client-{contato.id}",
  "name": "{contato.name}",
  "cellphone": "{telefone_limpo_sem_mascara}"
}
```

### Criar pedido (POST /integrations/orders)
```json
{
  "externalReference": "pedido-{kommo_lead_id}-v3",
  "clientId": "{id_retornado_pelo_thales}",
  "products": [
    {
      "name": "Camiseta Dry Fit",
      "quantity": {quantidade_de_pecas}
    }
  ],
  "observations": "{observacoes}"
}
```

---

## 9. PENDÊNCIAS E LACUNAS

- [ ] URL da Evolution API não configurada (`https://SEU_EVOLUTION_API.com`)
- [ ] Token da Evolution API não configurado (`SEU_TOKEN_EVOLUTION_API`)
- [ ] Token Kommo do nó "Salva ID do pedido no card Kommo" não configurado (`SEU_TOKEN_KOMMO_AQUI`)
- [ ] Verificar se existe fluxo reverso Sistema Thales → Kommo
- [ ] Confirmar nome exato do campo `ID Pedido Thales` conforme criado no Kommo
- [ ] Confirmar nome exato do produto no Sistema Thales (atualmente hardcoded como "Camiseta Dry Fit")
