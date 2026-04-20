# MAPEAMENTO DE FLUXO — Cockpit Performance — API de Métricas

**ID do Workflow:** node-webhook (local) | `cockpit-performance` (webhookId)
**Status:** Inativo — aguardando import e ativação no n8n
**Data do Mapeamento:** 2026-04-18
**Mapeado por:** N8N Mapper 🗺️
**Fonte:** Export JSON — `docs/n8n/cockpit-performance.workflow.json`

---

## 1. GATILHO

| Campo | Valor |
|---|---|
| Tipo | Webhook |
| Configuração | `GET /webhook/cockpit/performance` |
| Método | GET |
| Frequência | Por demanda (request do frontend) |
| Disparado por | Frontend (cockpit) via chamada HTTP GET |
| Query Params | `?gestor={nome}` (opcional — filtra por gestor) |

---

## 2. ENTRADAS

| Campo | Tipo | Origem | Obrigatório | Observação |
|---|---|---|---|---|
| `query.gestor` | string | Query param do request GET | Não | Filtra resultados por gestor quando informado |
| Linhas da planilha | object[] | Google Sheets (aba `Dados`) | Sim | Colunas: Cliente, Gestor, Total de Investimento, Total de RESULTADOS (Gerenciador), Meta de CPA |

**Colunas esperadas na planilha:**

| Coluna | Tipo Raw | Observação |
|---|---|---|
| `Cliente` | string | Nome do cliente — chave de agrupamento |
| `Gestor` | string | Nome do gestor responsável |
| `Total de Investimento` | string (BRL) | Ex: `R$ 1.500,00` ou `1500,00` ou `1500` |
| `Total de RESULTADOS (Gerenciador)` | string/number | Total de leads/conversões |
| `CPA` | string | **Ignorado** no cálculo — presente na planilha mas não consumido |
| `Meta de CPA` | string (BRL) | Meta de custo por resultado |

---

## 3. PROCESSAMENTO (PASSO A PASSO)

| # | Nó | Tipo | O que faz |
|---|---|---|---|
| 1 | Webhook | `n8n-nodes-base.webhook` v2 | Recebe GET, captura query params, encaminha execução |
| 2 | Google Sheets — Ler Dados | `n8n-nodes-base.googleSheets` v4 | Lê todas as linhas da aba `Dados` do spreadsheet configurado |
| 3 | Function — Normalizar | `n8n-nodes-base.code` v2 (JS) | Normaliza valores BRL (remove R$, troca vírgula por ponto), extrai campos relevantes, filtra linhas sem cliente, aplica filtro de gestor se query param presente |
| 4 | Function — Agregar e Calcular | `n8n-nodes-base.code` v2 (JS) | Agrupa por cliente, soma investimento e leads, calcula CPL (investimento ÷ leads), define status (verde/amarelo/vermelho) com base na Meta de CPA, ordena por criticidade |
| 5 | HTTP Response | `n8n-nodes-base.respondToWebhook` v1 | Retorna JSON estruturado com headers CORS e Cache-Control |

**Branches (ramificações):** nenhuma — fluxo linear sequencial

**Lógica de status no Nó 4:**
- `vermelho` → CPL > Meta de CPA
- `amarelo` → CPL > 80% da Meta de CPA
- `verde` → demais casos (incluindo Meta de CPA = 0)

---

## 4. SAÍDAS

| Campo | Tipo | Destino | Condição de Envio |
|---|---|---|---|
| `status` | string (`"ok"`) | Frontend | Sempre |
| `totalClientes` | number | Frontend | Sempre |
| `data` | array of objects | Frontend | Sempre |
| `data[].cliente` | string | Frontend | Por item |
| `data[].leads` | number | Frontend | Por item |
| `data[].cpl` | number (float, 2 dec.) | Frontend | Por item |
| `data[].status` | string (`verde`/`amarelo`/`vermelho`) | Frontend | Por item |
| `geradoEm` | string (ISO 8601) | Frontend | Sempre |

**Headers de resposta:**
- `Content-Type: application/json`
- `Access-Control-Allow-Origin: *`
- `Cache-Control: public, max-age=120`

---

## 5. INTEGRAÇÕES

| Sistema | Tipo | Operação | Autenticação |
|---|---|---|---|
| Google Sheets | API (n8n native node) | Leitura de planilha (getAll rows) | OAuth2 (credential: `googleSheetsOAuth2Api`) |
| Frontend (cockpit) | Webhook consumer | Recebe resposta HTTP | Nenhuma (endpoint público) |

---

## 6. DEPENDÊNCIAS

- **Sub-workflows chamados:** nenhum
- **Depende de dados de outros fluxos:** não
- **Outros fluxos dependem deste:** Frontend cockpit — consome este endpoint para exibir o dashboard

---

## 7. PENDÊNCIAS E LACUNAS

- [ ] `PENDÊNCIA: Spreadsheet ID` — `SEU_SPREADSHEET_ID_AQUI` precisa ser substituído pelo ID real da planilha de produção
- [ ] `PENDÊNCIA: Credential ID` — `sua-credential-id` precisa ser substituído pelo ID da credential OAuth2 configurada no n8n de produção
- [ ] `PENDÊNCIA: Token API n8n` — não localizado em `.claude/settings.json`; necessário para import via API
- [ ] `PENDÊNCIA: URL de ativação` — endpoint final depende de HTTPS configurado na VPS (`https://editor.luqz.com.br` ou domínio do n8n)
- [ ] `PENDÊNCIA: Coluna Gestor` — a planilha precisa ter coluna `Gestor` para que o filtro por query param funcione; se a coluna não existir, o filtro retorna array vazio
