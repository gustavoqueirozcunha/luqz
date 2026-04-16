---
name: triar-tarefas
description: Organiza tarefas vindas de reunioes, WhatsApp ou ideias soltas em lista estruturada com prioridade, responsavel e ordem de execucao. Usar quando chegar demanda desestruturada.
type: prompt
version: 1.0.0
categories:
  - gestao
  - organizacao
---

# Triar Novas Tarefas

## Objetivo

Transformar demandas brutas (anotacoes de reuniao, mensagens de WhatsApp, brainstorms, pedidos avulsos) em tarefas estruturadas, priorizadas e prontas para execucao no ClickUp.

## Quando usar

- Apos reunioes de alinhamento ou kickoff
- Quando chegam demandas por WhatsApp ou email
- Quando Gustavo lista coisas que precisam ser feitas
- Ao consolidar ideias soltas em plano de acao
- Apos calls com clientes que geram novas demandas

## Input esperado

```
Cliente: [nome do cliente]
Fonte: [Reuniao / WhatsApp / Email / Brainstorm / Outro]
Demandas brutas:
"""
[colar aqui o texto bruto — anotacoes, mensagens, lista de ideias]
"""
Contexto adicional: [informacao relevante sobre urgencia, fase, etc.]
```

## Processo interno (raciocinio do agente)

1. **Extrair acoes**
   - Ler o texto bruto e isolar cada acao ou demanda implicita
   - Descartar comentarios, cumprimentos e informacoes nao-acionaveis
   - Identificar dependencias entre acoes

2. **Classificar por area**
   - Estrategia / Conteudo / Midia / Comercial / Design / Operacional
   - Associar ao squad responsavel quando aplicavel

3. **Definir prioridade**
   - **P1 — Critica:** Bloqueia o projeto ou impacta receita
   - **P2 — Alta:** Importante para o avanco da fase atual
   - **P3 — Media:** Relevante mas nao urgente
   - **P4 — Baixa:** Nice-to-have, pode esperar

4. **Sugerir responsavel**
   - Baseado no squad e na natureza da tarefa
   - Quando ambiguo, sugerir e marcar como "a confirmar"

5. **Ordenar execucao**
   - Sequenciar pela combinacao: prioridade + dependencias + esforco
   - Agrupar tarefas que podem ser feitas em paralelo

6. **Validar coerencia**
   - A tarefa pertence a fase atual do projeto?
   - Existe conflito com alguma diretriz do cliente?

## Output esperado

```markdown
## 📊 Diagnostico — Triagem de [X] demandas

**Cliente:** [nome]
**Fonte:** [origem]
**Demandas identificadas:** [numero]

### Resumo
- [X] tarefas acionaveis extraidas
- [X] descartadas (nao-acionaveis)
- [X] dependem de decisao

---

## ⚠️ Gargalos

- [Demandas que conflitam entre si]
- [Tarefas que dependem de input externo]
- [Sobrecarga em algum squad/responsavel]

---

## ✅ Recomendacoes — Tarefas Estruturadas

| # | Tarefa | Area | Prioridade | Responsavel | Depende de | Ordem |
|---|--------|------|------------|-------------|------------|-------|
| 1 | [desc] | [area] | P1 | [quem] | — | 1o |
| 2 | [desc] | [area] | P1 | [quem] | Tarefa 1 | 2o |
| 3 | [desc] | [area] | P2 | [quem] | — | 1o |

### Descartadas
- "[texto original]" — Motivo: [nao acionavel / duplicada / fora de escopo]

---

## 🧠 Decisao necessaria

- [ ] Confirmar responsavel para tarefa [X]
- [ ] Aprovar prioridade P1 para [tarefa]
- [ ] Definir se [demanda] entra no escopo atual
```

## Possiveis acoes no ClickUp

- Criar tarefa para cada item aprovado
- Definir prioridade e responsavel em cada tarefa
- Adicionar dependencias entre tarefas relacionadas
- Adicionar comentario com contexto original (fonte da demanda)
- Mover tarefas para a lista correta do projeto
