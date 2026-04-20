# AUDITORIA DE FLUXO — Cockpit Performance — API de Métricas

**Auditado por:** N8N Auditor 🔍
**Data da Auditoria:** 2026-04-18
**Input:** `squads/luqz-n8n/output/2026-04-18-000001/mapeamentos/v1/cockpit-performance.md`

---

## RESUMO EXECUTIVO

| Prioridade | Quantidade |
|---|---|
| 🔴 Alta | 4 |
| 🟡 Média | 3 |
| 🟢 Baixa | 2 |
| ✅ Sem problema | 2 dimensões |

**Veredicto:** Fluxo **não está pronto para produção** sem resolução dos 4 itens de Alta prioridade. Bloqueadores críticos: ausência de error handling, endpoint público sem qualquer proteção, e configurações placeholder não substituídas.

---

## PROBLEMAS IDENTIFICADOS

---

### 🔴 ALTA — A01: Ausência total de tratamento de erro

**Tipo:** Fragilidade
**Localização:** Todos os nós — nenhum "Error Trigger" configurado
**Descrição:** O fluxo não possui nenhum mecanismo de captura de erro. Se o Google Sheets retornar erro (quota excedida, credencial expirada, planilha inacessível), o n8n simplesmente falhará a execução sem notificar ninguém e sem retornar resposta HTTP ao frontend — o cockpit ficará em estado de loading infinito sem mensagem de erro.
**Impacto no negócio:** Frontend trava silenciosamente. Gestor não consegue acessar o cockpit e não sabe o motivo. Não há alerta para investigar.

---

### 🔴 ALTA — A02: Configurações placeholder em produção

**Tipo:** Risco Operacional
**Localização:** Nó `Google Sheets — Ler Dados`
**Descrição:** `documentId` contém o valor literal `"SEU_SPREADSHEET_ID_AQUI"` e `credentials.id` contém `"sua-credential-id"`. Se o workflow for importado sem substituição, o nó falhará em toda execução.
**Impacto no negócio:** Fluxo 100% inoperante após import. Falha garantida.

---

### 🔴 ALTA — A03: Endpoint público sem autenticação

**Tipo:** Risco Operacional
**Localização:** Nó `Webhook` + Nó `HTTP Response` (header `Access-Control-Allow-Origin: *`)
**Descrição:** O endpoint `GET /webhook/cockpit/performance` é completamente público — qualquer pessoa com a URL pode consumir dados de todos os clientes da LUQZ (CPL, leads, status de performance). O CORS aberto (`*`) permite chamadas de qualquer origem. Não há API key, token, IP whitelist ou qualquer forma de autenticação.
**Impacto no negócio:** Exposição de dados competitivos e de performance de todos os clientes. Risco de compliance e confiança.

---

### 🔴 ALTA — A04: CPL retorna 0 sem sinalização quando leads = 0

**Tipo:** Fragilidade + Risco Operacional
**Localização:** Nó `Function — Agregar e Calcular`
**Descrição:** Quando um cliente tem `leads = 0`, o CPL é retornado como `0` e o status como `verde` (pois `metaCPA > 0` e `cpl (0) < metaCPA`). Um cliente sem nenhum resultado aparece como "verde" no cockpit — interpretação inversa da realidade.
**Impacto no negócio:** Gestor vê cliente com zero resultados como saudável. Decisão errada baseada em dado visualmente enganoso.

---

### 🟡 MÉDIA — M01: Sem paginação na leitura do Google Sheets

**Tipo:** Escalabilidade
**Localização:** Nó `Google Sheets — Ler Dados`
**Descrição:** O nó lê todas as linhas da planilha em uma única chamada (getAll). A API do Google Sheets tem limite de resposta e o n8n tem limite de itens por execução. Com >1.000 linhas mensais acumuladas na planilha, podem ocorrer falhas silenciosas de paginação ou timeout.
**Impacto no negócio:** Degradação de performance e dados incompletos à medida que a planilha cresce.

---

### 🟡 MÉDIA — M02: Sem cache — bate no Sheets a cada request do frontend

**Tipo:** Ineficiência + Escalabilidade
**Localização:** Fluxo completo
**Descrição:** Cada abertura/atualização do cockpit dispara uma leitura completa do Google Sheets. Com múltiplos gestores usando simultaneamente, o volume de chamadas pode atingir a quota gratuita da API do Google (100 req/100s por usuário, 300 req/min por projeto). O código do Function — Agregar tinha comentário mencionando `$getWorkflowStaticData` para cache mas não foi implementado.
**Impacto no negócio:** Quota esgotada → todos os gestores perdem acesso ao cockpit simultaneamente.

---

### 🟡 MÉDIA — M03: Coluna `Gestor` pode não existir na planilha atual

**Tipo:** Risco Operacional
**Localização:** Nó `Function — Normalizar`
**Descrição:** O filtro por `?gestor=` lê a coluna `Gestor` da planilha. O mapeamento registrou `[PENDÊNCIA]` indicando que essa coluna pode não existir na estrutura atual da planilha. Se ausente, `r['Gestor']` retornará `undefined`, `String(undefined)` vira `"undefined"`, e o filtro nunca terá match — retornando array vazio para qualquer query com `?gestor=`.
**Impacto no negócio:** Funcionalidade de filtro inoperante sem mensagem de erro; gestor vê lista vazia e não entende o motivo.

---

### 🟢 BAIXA — B01: Sem log de execução ou métricas de latência

**Tipo:** Risco Operacional (observabilidade)
**Localização:** Fluxo completo
**Descrição:** O fluxo não registra tempo de execução, volume de dados processados ou qualquer métrica operacional. Impossível saber se está degradando ao longo do tempo sem monitoramento ativo no n8n.
**Impacto no negócio:** Degradação silenciosa — só percebida quando usuário reclama.

---

### 🟢 BAIXA — B02: `executionOrder: v1` — versão legada

**Tipo:** Ineficiência
**Localização:** `settings.executionOrder`
**Descrição:** O workflow usa `executionOrder: "v1"`. A versão atual do n8n usa `v1` por compatibilidade, mas novas features (como melhor paralelismo e debug) são priorizadas em `v1` é o padrão atual; sem impacto imediato, mas vale atualizar ao migrar para versões futuras do n8n.
**Impacto no negócio:** Nenhum imediato.

---

## PONTOS SEM PROBLEMA IDENTIFICADO

| Dimensão | Avaliação |
|---|---|
| Lógica de cálculo de CPL | Correta — `investimento ÷ leads` com `toFixed(2)` |
| Parsing de BRL | Robusto — trata R$, ponto como milhar, vírgula como decimal e NaN |
| Ordenação de status | Correta — vermelho → amarelo → verde |
| Estrutura de agrupamento | Correta — map por cliente com média de metaCPA para múltiplas linhas |
| Estrutura do JSON de saída | Alinhada com o contrato esperado pelo frontend |

---

## INFORMAÇÕES AUSENTES DO MAPEAMENTO (herdadas como problemas)

| # | Campo | Motivo |
|---|---|---|
| P1 | Spreadsheet ID de produção | Não informado — bloqueante (já registrado como A02) |
| P2 | Credential ID OAuth2 | Não informado — bloqueante (já registrado como A02) |
| P3 | Token API n8n | Necessário para import via API — não localizado |
| P4 | Existência da coluna Gestor | Não confirmada na planilha atual (já registrado como M03) |
