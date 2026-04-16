---
name: prioridades-semana
description: Define as prioridades da semana para o time com foco em impacto. Organiza o que fazer hoje, esta semana e o que pode esperar. Usar toda segunda-feira ou inicio de ciclo.
type: prompt
version: 1.0.0
categories:
  - gestao
  - planejamento
---

# Definir Prioridades da Semana

## Objetivo

Transformar o backlog e as tarefas em andamento em um plano semanal claro com foco definido. Responde: "o que o time deve fazer HOJE, o que deve terminar ESTA SEMANA e o que pode esperar."

## Quando usar

- Toda segunda-feira (ritual de inicio de semana)
- Quando o time esta perdido sobre o que priorizar
- Apos acumulo de demandas novas na semana anterior
- Quando Gustavo pergunta "o que estamos fazendo essa semana?"
- Apos retorno de feriado ou periodo parado

## Input esperado

```
Cliente(s): [nome(s) do(s) cliente(s) — pode ser todos]
Semana: [YYYY-MM-DD a YYYY-MM-DD]
Capacidade do time: [normal / reduzida — motivo]
Contexto: [evento importante, deadline, entrega ao cliente, etc.]
ClickUp URL: [link opcional]
```

## Processo interno (raciocinio do agente)

1. **Coletar tarefas pendentes**
   - Ler tarefas com status "a fazer", "em andamento" e "em revisao"
   - Verificar due dates da semana
   - Identificar tarefas atrasadas de semanas anteriores

2. **Classificar por impacto**
   - **Impacto direto no cliente:** Entrega visivel, aprovacao pendente, reuniao
   - **Impacto na operacao:** Desbloqueia outras tarefas, elimina gargalo
   - **Impacto no resultado:** Afeta leads, conversao, receita
   - **Organizacional:** Documentacao, setup, limpeza

3. **Aplicar matriz de priorizacao**

   | | Urgente | Nao urgente |
   |---|---------|-------------|
   | **Importante** | FAZER HOJE | Fazer esta semana |
   | **Nao importante** | Delegar/Automatizar | Backlog |

4. **Distribuir por dia (quando aplicavel)**
   - Segunda: Planejamento + desbloqueios
   - Terca-Quarta: Producao pesada
   - Quinta: Revisao e ajustes
   - Sexta: Entregas e fechamento

5. **Verificar equilibrio**
   - Nenhum responsavel com mais de 5 tarefas prioritarias
   - Mix saudavel: 60% producao, 20% revisao, 20% estrategia
   - Margem para imprevistos (~20% da capacidade livre)

6. **Definir meta da semana**
   - 1 resultado tangivel que define "semana bem-sucedida"

## Output esperado

```markdown
## 📊 Diagnostico — Prioridades da Semana

**Semana:** [datas]
**Clientes em foco:** [nomes]
**Capacidade:** [normal/reduzida]

### Meta da semana
> [1 frase que define sucesso — ex: "Entregar os 4 roteiros do Cassio e aprovar identidade visual"]

---

## ⚠️ Gargalos — Atencao Imediata

- [Tarefa atrasada que precisa ser resolvida antes de tudo]
- [Bloqueio que impede progresso]
- [Dependencia externa critica]

---

## ✅ Recomendacoes — Plano da Semana

### 🔴 FAZER HOJE
| # | Tarefa | Cliente | Responsavel | Por que hoje? |
|---|--------|---------|-------------|---------------|
| 1 | [desc] | [cliente] | [quem] | [motivo] |

### 🟡 FAZER ESTA SEMANA
| # | Tarefa | Cliente | Responsavel | Dia sugerido |
|---|--------|---------|-------------|--------------|
| 1 | [desc] | [cliente] | [quem] | Terca |

### 🟢 PODE ESPERAR (Backlog priorizado)
| # | Tarefa | Cliente | Motivo para adiar |
|---|--------|---------|-------------------|
| 1 | [desc] | [cliente] | [justificativa] |

### Distribuicao por responsavel
| Responsavel | Tarefas hoje | Tarefas semana | Carga |
|-------------|-------------|----------------|-------|
| [nome] | [X] | [X] | [Normal/Alta/Critica] |

---

## 🧠 Decisao necessaria

- [ ] Aprovar prioridades da semana
- [ ] Definir se [tarefa X] entra ou fica no backlog
- [ ] Confirmar capacidade de [responsavel] para [tarefa]
```

## Possiveis acoes no ClickUp

- Atualizar prioridade das tarefas conforme classificacao
- Definir due dates para tarefas da semana
- Mover tarefas de backlog para sprint/lista da semana
- Adicionar tag "PRIORIDADE-SEMANA" nas tarefas selecionadas
- Criar tarefa de revisao para sexta-feira
- Adicionar comentario com o plano semanal na visao do projeto
