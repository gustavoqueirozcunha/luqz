# Skills — Squad Gestor de Projetos

> Indice geral das skills operacionais do squad `luqz-gestor-projetos`.
> Cada skill e um modulo reutilizavel para gestao de projetos integrada ao ClickUp.

---

## Visao Geral

| # | Skill | Arquivo | Funcao resumida |
|---|-------|---------|-----------------|
| 1 | Diagnosticar Projeto | [diagnosticar-projeto.md](diagnosticar-projeto.md) | Raio-X completo do projeto: status, gaps, gargalos e proximos passos |
| 2 | Triar Novas Tarefas | [triar-tarefas.md](triar-tarefas.md) | Organiza demandas brutas em tarefas estruturadas e priorizadas |
| 3 | Detectar Riscos e Atrasos | [detectar-riscos.md](detectar-riscos.md) | Radar preventivo de tarefas atrasadas e projetos estagnados |
| 4 | Planejar Proximas Acoes | [planejar-acoes.md](planejar-acoes.md) | Transforma diagnostico em plano de execucao sequenciado |
| 5 | Reorganizar Projeto | [reorganizar-projeto.md](reorganizar-projeto.md) | Reestrutura projetos bagunçados com nova arquitetura |
| 6 | Auditar Execucao | [auditar-execucao.md](auditar-execucao.md) | QA Gate operacional — valida qualidade antes de entregar |
| 7 | Alinhar com Escopo | [alinhar-escopo.md](alinhar-escopo.md) | Compara escopo vendido vs. executado e identifica gaps |
| 8 | Definir Prioridades da Semana | [prioridades-semana.md](prioridades-semana.md) | Plano semanal com foco em impacto e distribuicao de carga |

---

## Formato padrao de resposta

Toda skill responde neste formato obrigatorio:

```
## 📊 Diagnostico
## ⚠️ Gargalos
## ✅ Recomendacoes
## 🧠 Decisao necessaria
```

---

## Fluxos combinados

As skills podem ser encadeadas para fluxos mais completos:

### Fluxo 1: Revisao semanal completa
```
prioridades-semana → detectar-riscos → planejar-acoes
```
Ideal para: segunda-feira, revisao com Gustavo

### Fluxo 2: Onboarding de cliente
```
alinhar-escopo → diagnosticar-projeto → reorganizar-projeto → planejar-acoes
```
Ideal para: primeiras semanas de um novo cliente

### Fluxo 3: Controle de qualidade
```
auditar-execucao → alinhar-escopo → detectar-riscos
```
Ideal para: antes de entregas ao cliente ou final de sprint

### Fluxo 4: Triagem de demandas
```
triar-tarefas → prioridades-semana → planejar-acoes
```
Ideal para: apos reunioes ou acumulo de pedidos

---

## Regras gerais

1. **Toda skill le contexto antes de executar.** Pasta `/clientes/[cliente]/contexto/` e obrigatoria.
2. **Nenhuma acao no ClickUp e automatica.** Sempre sugerir e aguardar aprovacao do Gustavo.
3. **Output padronizado.** Seguir o formato de resposta definido em cada skill.
4. **Skills sao combinaveis.** O output de uma skill pode ser input da proxima.
5. **Dados reais, nunca inventados.** Se falta informacao, sinalizar e aguardar.

---

## Potencial de automacao

| Skill | Automatizavel? | Trigger sugerido |
|-------|---------------|------------------|
| Diagnosticar Projeto | Parcial | Cron semanal (segunda 8h) |
| Triar Tarefas | Parcial | Nova tarefa criada no ClickUp / mensagem no Slack |
| Detectar Riscos | Total | Cron diario (verifica due dates vencidas) |
| Planejar Acoes | Parcial | Apos diagnostico automatico |
| Reorganizar Projeto | Manual | Sob demanda (requer julgamento humano) |
| Auditar Execucao | Parcial | Tarefa movida para status "Concluida" |
| Alinhar Escopo | Parcial | Cron mensal / transicao de fase |
| Prioridades Semana | Total | Cron semanal (segunda 7h) |

---

> skills.md — v1.0 | Squad Gestor de Projetos — LUQZ | Abril 2026
