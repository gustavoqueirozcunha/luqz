---
name: auditar-execucao
description: Valida qualidade das tarefas executadas, identifica falhas e entregas incompletas. Usar para controle de qualidade operacional antes de entregar ao cliente.
type: prompt
version: 1.0.0
categories:
  - gestao
  - qualidade
---

# Auditar Execucao

## Objetivo

Revisar tarefas marcadas como concluidas ou em fase final para validar se a execucao atende ao padrao LUQZ. Identifica entregas incompletas, falhas de qualidade e ajustes necessarios antes da entrega ao cliente.

## Quando usar

- Antes de entregar qualquer material ao cliente
- Revisao de fim de sprint ou ciclo
- Quando uma tarefa e marcada como "concluida" mas nao foi validada
- Apos producao em lote (ex: 10 roteiros, 5 criativos)
- Quando o cliente reclama de qualidade ou desalinhamento
- Como gate obrigatorio antes de publicacao

## Input esperado

```
Cliente: [nome do cliente]
Escopo da auditoria: [tarefas especificas / lista inteira / sprint X]
ClickUp URL: [link das tarefas a auditar]
Criterios especiais: [alguma preocupacao especifica do cliente ou do Gustavo]
```

## Processo interno (raciocinio do agente)

1. **Coletar tarefas a auditar**
   - Filtrar tarefas com status "concluida", "em revisao" ou "pronta para entrega"
   - Ler descricao, subtarefas e anexos de cada tarefa

2. **Aplicar QA Gate LUQZ (4 dimensoes)**

   Para cada tarefa, avaliar:

   | Dimensao | Pergunta-chave |
   |----------|----------------|
   | Estrategia | Alinhado com produto, fase e trilha? |
   | Copy | Especifico e premium? Ou generico? |
   | Design | Produto de marca premium? Ou template amador? |
   | Negocio | Gera demanda qualificada? Sustenta o ticket? |

3. **Verificar completude**
   - Todas as subtarefas estao concluidas?
   - O output esta no formato esperado?
   - Arquivos foram anexados corretamente?
   - A tarefa tem tudo que o proximo responsavel precisa?

4. **Cruzar com contexto do cliente**
   - O tom de voz esta correto? (verificar `tom-de-voz.md`)
   - A persona esta refletida? (verificar `persona.md`)
   - As diretrizes estao respeitadas? (verificar `diretrizes.md`)
   - A oferta esta correta? (verificar `oferta.md`)

5. **Classificar resultado**
   - **Aprovada:** Pronta para entrega
   - **Ajuste menor:** Correcao rapida, nao precisa refazer
   - **Refazer:** Nao atende ao padrao, precisa ser refeita
   - **Bloqueada:** Falta informacao ou decisao para avaliar

## Output esperado

```markdown
## 📊 Diagnostico — Auditoria de Execucao

**Cliente:** [nome]
**Escopo auditado:** [descricao]
**Tarefas analisadas:** [numero]
**Data da auditoria:** [YYYY-MM-DD]

### Resumo
- ✅ Aprovadas: [X]
- 🟡 Ajuste menor: [X]
- 🔴 Refazer: [X]
- ⬜ Bloqueadas: [X]

---

## ⚠️ Gargalos — Falhas Identificadas

### Tarefas com ajuste menor
| # | Tarefa | Problema | Ajuste necessario |
|---|--------|----------|-------------------|
| 1 | [nome] | [falha] | [o que corrigir] |

### Tarefas para refazer
| # | Tarefa | Dimensao reprovada | Motivo |
|---|--------|--------------------|--------|
| 1 | [nome] | Copy | [generico, nao reflete persona] |

### Tarefas bloqueadas
| # | Tarefa | O que falta |
|---|--------|-------------|
| 1 | [nome] | [input necessario] |

---

## ✅ Recomendacoes

| # | Acao | Responsavel | Prazo |
|---|------|-------------|-------|
| 1 | Corrigir [tarefa] — [ajuste especifico] | [quem] | [quando] |
| 2 | Refazer [tarefa] com contexto de [arquivo] | [quem] | [quando] |

---

## 🧠 Decisao necessaria

- [ ] Aprovar entregas validadas para envio ao cliente
- [ ] Definir se [tarefa bloqueada] aguarda ou e descartada
- [ ] Validar se ajuste em [tarefa] atende expectativa do Gustavo
```

## Possiveis acoes no ClickUp

- Atualizar status: aprovada → "Pronta para entrega"
- Atualizar status: ajuste menor → "Em revisao" com comentario
- Atualizar status: refazer → "Em andamento" com briefing de correcao
- Adicionar comentario detalhado com feedback em cada tarefa
- Criar subtarefa de correcao quando aplicavel
- Adicionar checklist de QA Gate na tarefa para rastreabilidade
