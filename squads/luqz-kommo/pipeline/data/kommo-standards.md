# Padrões Kommo — Referência Bruno CRM

> Convenções obrigatórias para configuração do Kommo em contas gerenciadas pela LUQZ.

---

## Nomenclatura de Pipelines

| Padrão | Exemplo |
|--------|---------|
| `[Cliente] — [Produto]` | `Clínica X — Consultas` |
| Maiúsculo para etapas, minúsculo para sub-categorias | `Novo Lead`, `Qualificado (MQL)` |
| Etapas de perda sempre no final e nomeadas com causa | `Perdido — Sem Budget`, `Perdido — Sem Fit` |

---

## Campos Personalizados — Padrão Mínimo

Todo pipeline LUQZ deve ter no mínimo:

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| `origem_utm` | Texto | Sim |
| `produto_interesse` | Lista | Sim |
| `temperatura` | Lista (Frio/Morno/Quente) | Sim |
| `motivo_perda` | Lista | Sim (preencher ao mover para Perdido) |
| `data_primeiro_contato` | Data/Hora | Sim |
| `numero_followups` | Número | Recomendado |
| `budget_declarado` | Moeda | Quando aplicável |

---

## Tags — Sistema Padrão

Tags são aplicadas via Salesbot ou manualmente pelos SDRs. Nunca deletar tags — arquivar.

**Tags de estado:**
- `lead-novo` — removida após primeiro contato
- `sem-resposta` — após ciclo de follow-up sem retorno
- `reativacao` — lead antigo sendo trabalhado
- `no-show` — agendou e não compareceu
- `no-show-definitivo` — segundo no-show consecutivo

**Tags de qualidade:**
- `desqualificado` — sem fit com produto
- `alto-ticket` — acima do threshold do cliente
- `alta-intencao` — sinais fortes de compra

**Tags de origem:**
- `trafego-pago` — Meta Ads / Google Ads
- `organico` — Instagram, indicação, SEO
- `indicacao` — indicação direta por cliente

---

## Regras de Movimentação de Etapas

1. Nenhum lead avança de etapa sem atividade registrada (nota, e-mail ou mensagem)
2. Leads só vão para "Perdido" com campo `motivo_perda` preenchido
3. Leads reativados retornam para a etapa correta conforme estágio atual — nunca para o início sem motivo
4. Agendamentos cancelados voltam para "Qualificado (MQL)", não para "Novo Lead"

---

## Integrações Padrão

| Integração | Função | Ferramenta |
|-----------|--------|-----------|
| Entrada de leads | Meta Ads / Google Ads → Kommo | n8n webhook ou integração nativa |
| Notificação de SDR | Novo lead → alerta no WhatsApp do SDR | n8n + Kommo webhook |
| Salesbot | Primeiro contato + follow-ups automáticos | Kommo nativo |
| Rastreamento UTM | Campanhas → campos do Kommo | n8n + parâmetros UTM |
| Confirmação de agenda | Agendamento → mensagem automática D-1 | Salesbot ou n8n |

---

## Relatórios Mínimos (acompanhamento semanal)

1. **Volume de novos leads por origem** — identificar campanhas com melhor qualidade
2. **Taxa de resposta ao primeiro contato** — principal indicador de saúde do funil
3. **Tempo médio do primeiro contato** — deve ser < 5 minutos
4. **Conversão MQL → Agendamento** — gargalo mais comum em funis de tráfego
5. **Taxa de comparecimento** — indicador de qualidade da qualificação
6. **Motivos de perda** — distribuição por causa (identificar padrões)
