---
name: planejar-acoes
description: Transforma contexto e diagnostico em plano de execucao sequenciado com impacto esperado. Usar quando souber O QUE precisa ser feito mas nao COMO sequenciar.
type: prompt
version: 1.0.0
categories:
  - gestao
  - planejamento
---

# Planejar Proximas Acoes

## Objetivo

Transformar um diagnostico, situacao atual ou conjunto de demandas em um plano de execucao concreto, sequenciado e com impacto esperado definido. Responde a pergunta: "dado onde estamos, quais sao os proximos passos ideais?"

## Quando usar

- Apos executar a skill "Diagnosticar Projeto" e precisar de um plano
- Quando o time sabe o que precisa fazer mas nao sabe por onde comecar
- Apos reunioes estrategicas que definem novas direcoes
- Quando um projeto muda de fase (ex: Onboarding → Execucao)
- Para planejar a proxima sprint ou ciclo de trabalho

## Input esperado

```
Cliente: [nome do cliente]
Situacao atual: [resumo do diagnostico ou contexto — pode colar output de outra skill]
Objetivo: [o que queremos atingir no proximo ciclo]
Restricoes: [prazos, recursos limitados, dependencias externas]
Horizonte: [proximos 7 dias / 15 dias / 30 dias]
```

## Processo interno (raciocinio do agente)

1. **Analisar ponto de partida**
   - O que ja esta feito? O que esta em andamento?
   - Quais tarefas estao bloqueadas e por que?
   - Qual e a fase atual do produto contratado?

2. **Definir objetivo do ciclo**
   - Qual resultado tangivel queremos ao final do horizonte?
   - Esse objetivo esta alinhado com o escopo vendido?
   - E realista dado os recursos disponiveis?

3. **Mapear acoes necessarias**
   - Listar todas as acoes que levam ao objetivo
   - Identificar dependencias entre acoes
   - Classificar: execucao interna vs. depende do cliente

4. **Sequenciar por logica de impacto**
   - Priorizar acoes que desbloqueiam outras (gargalos primeiro)
   - Depois: acoes de maior impacto no resultado do cliente
   - Por ultimo: acoes de organizacao e documentacao

5. **Estimar impacto esperado**
   - O que muda concretamente se essa acao for executada?
   - Qual indicador e afetado? (leads, conversao, autoridade, organizacao)

6. **Distribuir responsabilidades**
   - Quem executa cada acao? (squad, pessoa, cliente)
   - Existe sobrecarga em alguem?

## Output esperado

```markdown
## 📊 Diagnostico — Planejamento de Acoes

**Cliente:** [nome]
**Horizonte:** [periodo]
**Objetivo do ciclo:** [resultado esperado]

### Ponto de partida
- [Resumo da situacao atual — 3-5 bullets]

---

## ⚠️ Gargalos — Restricoes do Plano

- [O que pode travar a execucao]
- [Dependencias externas]
- [Recursos limitados]

---

## ✅ Recomendacoes — Plano de Execucao

### Fase 1 — Desbloqueio (dias 1-3)
| # | Acao | Responsavel | Impacto esperado |
|---|------|-------------|------------------|
| 1 | [acao] | [quem] | [o que muda] |

### Fase 2 — Producao (dias 4-10)
| # | Acao | Responsavel | Depende de | Impacto esperado |
|---|------|-------------|------------|------------------|
| 1 | [acao] | [quem] | Fase 1.1 | [o que muda] |

### Fase 3 — Consolidacao (dias 11-15)
| # | Acao | Responsavel | Impacto esperado |
|---|------|-------------|------------------|
| 1 | [acao] | [quem] | [o que muda] |

### Resultado esperado ao final do ciclo
- [Indicador 1: de X para Y]
- [Indicador 2: de X para Y]

---

## 🧠 Decisao necessaria

- [ ] Aprovar sequencia de execucao
- [ ] Confirmar alocacao de [recurso] para [tarefa]
- [ ] Definir se [acao X] entra neste ciclo ou no proximo
```

## Possiveis acoes no ClickUp

- Criar tarefas para cada acao do plano
- Definir due dates conforme as fases
- Adicionar dependencias entre tarefas sequenciais
- Criar milestone/marco para o objetivo do ciclo
- Adicionar comentario com o plano completo na tarefa principal do projeto
