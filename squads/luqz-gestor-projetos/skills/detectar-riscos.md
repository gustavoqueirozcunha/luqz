---
name: detectar-riscos
description: Identifica projetos ou tarefas com risco de falha, atraso ou estagnacao. Usar para varredura preventiva antes que problemas se tornem criticos.
type: prompt
version: 1.0.0
categories:
  - gestao
  - risco
---

# Detectar Riscos e Atrasos

## Objetivo

Realizar varredura sistematica em um ou mais projetos para identificar tarefas atrasadas, projetos estagnados e riscos de entrega antes que se tornem criticos. Funciona como um radar de problemas.

## Quando usar

- Revisao semanal de portfolio (todos os clientes)
- Quando um projeto parece "travado" sem motivo claro
- Antes de reports ou reunioes com Gustavo
- Quando um responsavel nao atualiza tarefas ha mais de 3 dias
- Apos mudanca de escopo ou replanejamento

## Input esperado

```
Escopo: [Cliente especifico / Todos os clientes ativos]
Periodo de analise: [ultima semana / ultimos 15 dias / mes atual]
ClickUp Space/URL: [link opcional]
Foco especial: [area ou preocupacao especifica, se houver]
```

## Processo interno (raciocinio do agente)

1. **Coletar dados de tarefas**
   - Ler todas as tarefas do(s) projeto(s) no ClickUp
   - Filtrar por: status, data de vencimento, ultima atualizacao, responsavel

2. **Aplicar criterios de risco**
   - **Atraso direto:** Tarefa com due date vencida e status != completa
   - **Estagnacao:** Tarefa "em andamento" sem atualizacao ha 3+ dias
   - **Orfandade:** Tarefa sem responsavel atribuido
   - **Bloqueio:** Tarefa com dependencia nao resolvida
   - **Acumulo:** Responsavel com 5+ tarefas simultaneas em andamento
   - **Fase atrasada:** Conjunto de tarefas de uma fase com menos de 50% do esperado

3. **Classificar severidade**
   - **Critico:** Impacta entrega ao cliente ou receita. Acao imediata.
   - **Alto:** Pode virar critico em 3-5 dias se nao tratado.
   - **Medio:** Risco latente. Monitorar na proxima revisao.

4. **Analisar causa raiz**
   - O atraso e por falta de recurso, falta de briefing, ou falta de prioridade?
   - Existe dependencia externa (cliente, fornecedor)?
   - O escopo mudou sem ajuste no cronograma?

5. **Propor mitigacao**
   - Acao corretiva especifica para cada risco
   - Priorizar por severidade e facilidade de resolucao

## Output esperado

```markdown
## 📊 Diagnostico — Radar de Riscos

**Escopo:** [cliente ou portfolio]
**Periodo:** [datas]
**Data da varredura:** [YYYY-MM-DD]

### Resumo executivo
- 🔴 [X] riscos criticos
- 🟡 [X] riscos altos
- 🟢 [X] riscos medios
- Total de tarefas analisadas: [N]

---

## ⚠️ Gargalos — Riscos Identificados

### 🔴 Criticos

| # | Tarefa/Projeto | Tipo de risco | Dias em atraso | Responsavel | Causa provavel |
|---|---------------|---------------|----------------|-------------|----------------|
| 1 | [desc] | Atraso | [X] dias | [quem] | [causa] |

### 🟡 Altos

| # | Tarefa/Projeto | Tipo de risco | Sinal | Responsavel |
|---|---------------|---------------|-------|-------------|
| 1 | [desc] | Estagnacao | Sem update 5d | [quem] |

### 🟢 Medios

- [Risco latente — monitorar]

---

## ✅ Recomendacoes — Plano de Mitigacao

| # | Risco | Acao corretiva | Responsavel | Prazo |
|---|-------|----------------|-------------|-------|
| 1 | [risco] | [acao] | [quem] | [quando] |

---

## 🧠 Decisao necessaria

- [ ] Escalar [tarefa] — precisa intervencao do Gustavo
- [ ] Renegociar prazo com cliente [X] para [entregavel]
- [ ] Realocar [responsavel] de [projeto A] para [projeto B]
```

## Possiveis acoes no ClickUp

- Adicionar flag de prioridade "URGENTE" em tarefas criticas
- Criar tarefa de follow-up para responsaveis atrasados
- Adicionar comentario de alerta em tarefas estagnadas
- Atualizar due dates quando renegociadas
- Criar subtarefa de "desbloqueio" para tarefas bloqueadas
