# AUDITORIA DE FLUXO — Camisetando | Fase 2 - Venda Ganha → Sistema Thales

**Baseado no mapeamento de:** 2026-04-09
**Data da Auditoria:** 2026-04-09
**Auditado por:** N8N Auditor 🔍

---

## RESUMO EXECUTIVO

| Métrica | Valor |
|---|---|
| Total de problemas encontrados | 11 |
| Prioridade Alta | 5 |
| Prioridade Média | 4 |
| Prioridade Baixa | 2 |
| Nível de risco geral | **ALTO** |

> **Diagnóstico direto:** O fluxo tem lógica bem estruturada mas está parcialmente quebrado em produção. Três nós com configuração placeholder (Evolution API e token Kommo) fazem com que o WhatsApp **nunca seja enviado** e o **ID do pedido nunca seja salvo no Kommo**. Além disso, não existe nenhum mecanismo de detecção de falha — erros passam completamente invisíveis.

---

## PROBLEMAS IDENTIFICADOS

---

### [P01] — Token Kommo placeholder no nó "Salva ID do pedido"

| Campo | Detalhe |
|---|---|
| **Tipo** | Risco Operacional |
| **Prioridade** | **Alta** |
| **Localização no fluxo** | Nó 9: `Salva ID do pedido no card Kommo` |
| **Descrição** | O campo Authorization está configurado como `Bearer SEU_TOKEN_KOMMO_AQUI` — um placeholder que nunca foi substituído. Toda chamada PATCH para o Kommo retorna 401 Unauthorized. |
| **Impacto no negócio** | O campo "ID Pedido Thales" **nunca é salvo** no card do Kommo. O vínculo bidirecional entre o pedido no sistema Thales e o lead no Kommo não existe. O fluxo reverso (quando pedido muda de status no Thales → atualizar Kommo) fica impossibilitado de funcionar. Gestão comercial não sabe qual pedido corresponde a qual lead. |
| **Evidência** | Mapeamento: Seção 5 — `"value":"Bearer SEU_TOKEN_KOMMO_AQUI"` no headerParameters do nó |

---

### [P02] — Evolution API com URL e token placeholder

| Campo | Detalhe |
|---|---|
| **Tipo** | Risco Operacional |
| **Prioridade** | **Alta** |
| **Localização no fluxo** | Nó 10: `Notifica cliente via WhatsApp` |
| **Descrição** | URL configurada como `https://SEU_EVOLUTION_API.com/message/sendText/camisetando` e token como `SEU_TOKEN_EVOLUTION_API` — ambos placeholders. Toda chamada falha com DNS not resolved ou 401. |
| **Impacto no negócio** | **Nenhum cliente recebe a mensagem de confirmação de pedido via WhatsApp.** O cliente não tem feedback de que o pedido foi criado. Possível geração de dúvida, recontato manual e percepção de desorganização. |
| **Evidência** | Mapeamento: Seção 5 — URL e token do nó `Notifica cliente via WhatsApp` |

---

### [P03] — Campo `whatsapp` inexistente no payload enviado ao WhatsApp

| Campo | Detalhe |
|---|---|
| **Tipo** | Risco Operacional / Fragilidade |
| **Prioridade** | **Alta** |
| **Localização no fluxo** | Nó 10: `Notifica cliente via WhatsApp` — referência a `$json.cliente.whatsapp` |
| **Descrição** | O nó de WhatsApp usa `$('Monta payload para o sistema Thales').item.json.cliente.whatsapp` para compor o número. Porém, o nó 5 (Monta payload) salva o telefone no campo `cellphone`, não `whatsapp`. O campo `whatsapp` é `undefined`. |
| **Impacto no negócio** | Mesmo que a Evolution API fosse configurada corretamente (P02), a mensagem seria enviada para o número `55undefined` — falhando em 100% dos casos. O cliente nunca recebe a confirmação. |
| **Evidência** | Mapeamento: Seção 8 (payload cliente usa `cellphone`) vs. Seção 3 nó 10 (usa `cliente.whatsapp`) |

---

### [P04] — Ausência total de Error Handling

| Campo | Detalhe |
|---|---|
| **Tipo** | Fragilidade |
| **Prioridade** | **Alta** |
| **Localização no fluxo** | Todo o fluxo — não existe nenhum nó `Error Trigger` configurado |
| **Descrição** | O fluxo não tem nenhum mecanismo de captura de erro. Qualquer falha (API do Thales offline, timeout de chamada Kommo, campo nulo quebrando o código) para o fluxo silenciosamente. Não há alerta, não há log de falha, não há notificação. |
| **Impacto no negócio** | Vendas ganhas podem não gerar pedido no sistema sem que ninguém saiba. O vendedor fecha a venda no Kommo, o lead vai para "Venda Ganha", mas o pedido nunca é criado no sistema do Thales. A percepção é de que tudo funcionou — a falha é descoberta apenas quando o cliente reclama ou em auditoria manual. Risco direto de perda de faturamento. |
| **Evidência** | Mapeamento: Seção 3 — nenhum nó de erro listado. Nenhuma branch de erro nas conexões. |

---

### [P05] — Produto hardcoded para todos os pedidos

| Campo | Detalhe |
|---|---|
| **Tipo** | Risco Operacional |
| **Prioridade** | **Alta** |
| **Localização no fluxo** | Nó 7: `Vincula ID do cliente ao pedido` — `name: "Camiseta Dry Fit"` |
| **Descrição** | O nome do produto enviado ao Sistema Thales é fixo: `"Camiseta Dry Fit"`. Se a Camisetando vende mais de um tipo de produto (camiseta polo, regata, moletom, etc.), todos os pedidos são criados como "Camiseta Dry Fit" no sistema. |
| **Impacto no negócio** | Pedidos com produto errado no sistema Thales. Produção pode ser acionada para o produto errado. Histórico de pedidos fica incorreto. |
| **Evidência** | Mapeamento: Seção 8 — `products[0].name: "Camiseta Dry Fit"` hardcoded |

---

### [P06] — Dois tokens Kommo distintos em uso (risco de expiração assíncrona)

| Campo | Detalhe |
|---|---|
| **Tipo** | Risco Operacional |
| **Prioridade** | Média |
| **Localização no fluxo** | Nó 3: `Busca dados completos do lead` e Nó 4: `Busca dados do contato` |
| **Descrição** | Os dois nós de busca no Kommo usam tokens JWT diferentes (JTI distintos nos headers). Quando um token expirar, o nó correspondente começará a falhar com 401 enquanto o outro ainda funciona. A falha será intermitente e difícil de diagnosticar. |
| **Impacto no negócio** | Fluxo quebra de forma intermitente. Parte dos pedidos são criados, parte não. Diagnóstico difícil por ser inconsistente. |
| **Evidência** | Mapeamento: Seção 5 — headers Authorization distintos nos dois nós HTTP |

---

### [P07] — `externalReference` com sufixo manual "-v3" (gambiarra de idempotência)

| Campo | Detalhe |
|---|---|
| **Tipo** | Ineficiência / Risco Operacional |
| **Prioridade** | Média |
| **Localização no fluxo** | Nó 7: `Vincula ID do cliente ao pedido` |
| **Descrição** | O código contém o comentário `// DICA: Mude o final para -v3 se o -v2 já tiver sido usado`. O sufixo `-v3` está hardcoded. Isso significa que, se o mesmo lead precisar ser reprocessado (ex: erro na primeira tentativa), o `externalReference` seria duplicado e o pedido seria rejeitado por conflito de chave. A "solução" atual exige edição manual do código a cada reprocessamento. |
| **Impacto no negócio** | Reprocessamento manual de pedidos falhos requer edição de código N8N por pessoa técnica. Gargalo operacional para casos de erro. |
| **Evidência** | Mapeamento: Seção 8 — código do nó 7 |

---

### [P08] — Mapeamento de campos no Google Sheets com discrepância de nomes

| Campo | Detalhe |
|---|---|
| **Tipo** | Fragilidade |
| **Prioridade** | Média |
| **Localização no fluxo** | Nó 11: `Registra log no Google Sheets` |
| **Descrição** | O Sheets tenta mapear campos como `cliente.whatsapp`, `pedido.data_prevista_entrega` e `pedido.tipo_cliente` que não existem no payload gerado pelo nó 5. O campo de telefone é `cliente.cellphone`, `data_prevista_entrega` não é gerado, e `tipo_cliente` não existe. As colunas correspondentes ficam vazias. |
| **Impacto no negócio** | Log no Sheets incompleto — informações de WhatsApp e tipo de cliente não são registradas. Relatório de backup fica com lacunas. |
| **Evidência** | Mapeamento: Seção 5 (payload) vs. Seção 3 nó 11 (colunas do Sheets) |

---

### [P09] — Google Sheets depois da notificação WhatsApp bloqueia resposta de sucesso

| Campo | Detalhe |
|---|---|
| **Tipo** | Fragilidade |
| **Prioridade** | Média |
| **Localização no fluxo** | Conexão: Nó 11 (Sheets) → Nó 12 (Responde webhook) |
| **Descrição** | O `respondToWebhook` (HTTP 200 para o Kommo) só é enviado DEPOIS que o Sheets registra o log. Se o Google Sheets tiver instabilidade, o webhook fica sem resposta — o Kommo pode reenviar o evento, causando pedido duplicado. A resposta ao webhook deveria ser enviada antes ou independentemente do log. |
| **Impacto no negócio** | Risco de duplicação de pedidos em caso de lentidão do Google Sheets. Kommo interpreta timeout como falha e reenvia. |
| **Evidência** | Mapeamento: Seção 3 — ordem de execução dos nós 11 e 12 |

---

### [P10] — Sem notificação interna para a equipe ao criar pedido

| Campo | Detalhe |
|---|---|
| **Tipo** | Ineficiência |
| **Prioridade** | Baixa |
| **Localização no fluxo** | Ausente — não existe nó de notificação interna |
| **Descrição** | Quando um pedido é criado com sucesso, nenhuma notificação é enviada para a equipe interna (Slack, WhatsApp grupo, email). A equipe só sabe que houve uma venda nova consultando o sistema manualmente. |
| **Impacto no negócio** | Ausência de visibilidade em tempo real das vendas convertidas. Equipe de produção pode não tomar ciência imediata de novos pedidos. |
| **Evidência** | Mapeamento: Seção 3 — sem nó de notificação interna |

---

### [P11] — Ausência de log de falha do nó IF (leads com status_id desconhecido não são rastreados)

| Campo | Detalhe |
|---|---|
| **Tipo** | Ineficiência |
| **Prioridade** | Baixa |
| **Localização no fluxo** | Nó 2: `É etapa Venda Ganha?` — Branch B (Ignora) |
| **Descrição** | Quando o Kommo dispara o webhook para uma mudança que não é "Venda Ganha", o fluxo responde com `Ignora (outro status)` sem registrar nada. Não há como saber quais eventos chegam e qual % deles é de etapas irrelevantes — dado útil para diagnosticar excesso de chamadas e otimizar webhook. |
| **Impacto no negócio** | Sem visibilidade do volume de requisições descartadas. Dificulta análise de carga e custo de execuções N8N. |
| **Evidência** | Mapeamento: Seção 3 — Branch B simplesmente responde 200 sem log |

---

## PROBLEMAS POR PRIORIDADE

### Alta Prioridade (impacto direto em faturamento ou operação)
- **[P01]** Token Kommo placeholder — ID do pedido NUNCA é salvo no Kommo
- **[P02]** Evolution API não configurada — WhatsApp de confirmação NUNCA é enviado
- **[P03]** Campo `whatsapp` inexistente — mensagem seria enviada para número inválido
- **[P04]** Sem Error Handling — falhas silenciosas, pedidos perdidos sem alerta
- **[P05]** Produto hardcoded — todos os pedidos criados como "Camiseta Dry Fit"

### Média Prioridade (impacto em confiabilidade e operação)
- **[P06]** Dois tokens Kommo distintos — risco de falha assíncrona ao expirar
- **[P07]** ExternalReference hardcoded com sufixo manual — reprocessamento exige edição de código
- **[P08]** Campos errados no Google Sheets — log incompleto
- **[P09]** Sheets antes do respondToWebhook — risco de duplicação de pedidos

### Baixa Prioridade (melhoria de visibilidade e operação)
- **[P10]** Sem notificação interna de novo pedido
- **[P11]** Branch de descarte sem log — volume de eventos irrelevantes invisível

---

## PONTOS SEM PROBLEMA IDENTIFICADO

- Lógica de extração de campos do Kommo (nó 5) — bem estruturada, com fallback para campos de contato
- Validação de dados obrigatórios (nome + telefone) antes de enviar ao Thales — presente e correta
- Idempotency-Key no POST de pedido — implementado corretamente via header
- Uso de `externalReference` para upsert de cliente — boa prática implementada
- Estrutura de branches do nó IF — correta (Alta para Venda Ganha, Baixa para demais)

---

## LIMITAÇÕES DA AUDITORIA

- Não foi possível verificar o comportamento real da API do Sistema Thales (endpoints `/integrations/clients` e `/integrations/orders`) — auditoria baseada nas notas dos nós
- Não foi verificado se o campo `ID Pedido Thales` existe como campo personalizado no Kommo (pode ser que o PATCH falhe também por esse motivo além do token)
- Volume real de execuções diárias não verificado — rate limits podem ser um problema não detectado
