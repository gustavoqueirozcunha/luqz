---
name: reorganizar-projeto
description: Reestrutura projetos desorganizados com nova hierarquia de listas, priorizacao e sequencia de execucao. Usar quando o ClickUp esta bagunçado ou o projeto perdeu estrutura.
type: prompt
version: 1.0.0
categories:
  - gestao
  - organizacao
---

# Reorganizar Projeto

## Objetivo

Reestruturar um projeto que perdeu organizacao — listas confusas, tarefas duplicadas, prioridades desatualizadas, responsaveis incorretos. Propoe uma nova arquitetura de projeto limpa e executavel.

## Quando usar

- Projeto com muitas tarefas mas sem clareza de progresso
- Listas no ClickUp que nao refletem a realidade da operacao
- Apos mudanca significativa de escopo ou equipe
- Quando ninguem sabe o status real do projeto
- Projeto herdado de outro gestor ou migrado de outra ferramenta
- Quando ha tarefas duplicadas, orfas ou mal categorizadas

## Input esperado

```
Cliente: [nome do cliente]
Produto: [AP360 / AP3M / outro]
ClickUp Space/URL: [link do projeto]
Problema principal: [o que esta desorganizado — listas, tarefas, prioridades]
Restricoes: [manter alguma estrutura existente? migrar tudo?]
```

## Processo interno (raciocinio do agente)

1. **Auditar estrutura atual**
   - Ler todas as listas, folders e tarefas do projeto no ClickUp
   - Mapear: quantas tarefas por status, quantas sem responsavel, quantas vencidas
   - Identificar duplicatas e tarefas orfas (sem lista clara)

2. **Comparar com modelo ideal**
   - Qual a estrutura padrao para esse tipo de produto?
   - AP360: Onboarding > T1-T5 > Entregas por trilha
   - AP3M: M1 > M2 > M3 > Entregas por mes
   - Existe Torre de Controle? Esta atualizada?

3. **Propor nova arquitetura**
   - Definir hierarquia: Space > Folders > Lists
   - Nomear listas de forma padronizada
   - Agrupar tarefas por area funcional e fase

4. **Reclassificar tarefas existentes**
   - Para cada tarefa: manter, mover, fundir ou arquivar
   - Atualizar prioridades baseado na fase atual
   - Definir responsaveis corretos

5. **Definir sequencia pos-reorganizacao**
   - O que executar primeiro na estrutura nova?
   - Quais tarefas desbloqueiam o fluxo?

## Output esperado

```markdown
## 📊 Diagnostico — Reorganizacao de Projeto

**Cliente:** [nome]
**Situacao encontrada:**
- [X] tarefas totais | [X] sem responsavel | [X] vencidas | [X] duplicadas
- [X] listas existentes
- Problemas: [resumo]

---

## ⚠️ Gargalos — Problemas Estruturais

| # | Problema | Impacto |
|---|----------|---------|
| 1 | [desc] | [como afeta o projeto] |

---

## ✅ Recomendacoes — Nova Estrutura

### Arquitetura proposta

```
📁 [Nome do Projeto]
├── 📂 Onboarding
│   ├── 📋 Setup Inicial
│   └── 📋 Diagnostico
├── 📂 Execucao
│   ├── 📋 [Area 1]
│   ├── 📋 [Area 2]
│   └── 📋 [Area 3]
├── 📂 Entregas
│   └── 📋 Entregaveis Aprovados
└── 📂 Backlog
    └── 📋 Ideias e Futuro
```

### Mapa de migracao

| Tarefa | Lista atual | Nova lista | Acao |
|--------|------------|------------|------|
| [nome] | [atual] | [nova] | Mover |
| [nome] | [atual] | — | Arquivar |
| [nome] + [nome] | [atual] | [nova] | Fundir |

### Tarefas a criar
| Tarefa | Lista | Prioridade | Responsavel |
|--------|-------|-----------|-------------|
| [nova tarefa necessaria] | [lista] | [P1-P4] | [quem] |

### Sequencia de execucao pos-reorganizacao
1. [Primeira acao]
2. [Segunda acao]
3. [Terceira acao]

---

## 🧠 Decisao necessaria

- [ ] Aprovar nova estrutura de listas
- [ ] Confirmar arquivamento de [X] tarefas obsoletas
- [ ] Definir responsavel para tarefas orfas
```

## Possiveis acoes no ClickUp

- Criar novas listas/folders conforme arquitetura aprovada
- Mover tarefas entre listas
- Arquivar tarefas obsoletas ou duplicadas
- Atualizar prioridades e responsaveis em lote
- Adicionar descricoes padronizadas nas novas listas
- Reorganizar Torre de Controle para refletir nova estrutura
