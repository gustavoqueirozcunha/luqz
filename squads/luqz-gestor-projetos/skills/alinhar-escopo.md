---
name: alinhar-escopo
description: Garante que o projeto esta alinhado com o que foi vendido ao cliente. Identifica o que falta, o que sobra e riscos de desalinhamento escopo vs. execucao.
type: prompt
version: 1.0.0
categories:
  - gestao
  - escopo
---

# Alinhar com Escopo

## Objetivo

Comparar sistematicamente o que foi vendido ao cliente (proposta comercial, produto contratado) com o que esta sendo executado. Identificar gaps, excessos e riscos de desalinhamento que podem gerar frustracao, reclamacao ou perda de receita.

## Quando usar

- Apos o Onboarding de um novo cliente (validacao inicial)
- Na transicao entre fases do projeto
- Quando o cliente questiona "o que esta incluso?"
- Quando o time esta produzindo coisas que nao foram vendidas
- Revisao mensal de escopo vs. execucao
- Antes de renovacao ou upsell

## Input esperado

```
Cliente: [nome do cliente]
Produto contratado: [AP360 / AP3M / outro]
Valor: [R$ X.XXX]
Duracao: [X meses]
Proposta/Contrato: [link ou resumo do que foi vendido]
ClickUp URL: [link do projeto]
Fase atual: [Onboarding / Execucao — Trilha X / Mes X]
```

## Processo interno (raciocinio do agente)

1. **Mapear escopo vendido**
   - Ler documentacao do produto em `/Produtos/[produto]/`
   - Identificar todos os entregaveis prometidos por fase
   - Listar servicos inclusos vs. exclusos
   - Verificar se ha adendos ou ajustes no contrato

2. **Mapear execucao real**
   - Ler tarefas do ClickUp (concluidas + em andamento + planejadas)
   - Ler documentos existentes em `/clientes/[cliente]/`
   - Verificar Torre de Controle

3. **Cruzar e classificar**
   Para cada entregavel do escopo:
   - **Entregue:** Existe e esta completo
   - **Em andamento:** Existe mas nao concluido
   - **Faltante:** Deveria existir e nao existe
   - **Excedente:** Existe mas nao faz parte do escopo vendido

4. **Avaliar impacto dos gaps**
   - Gap afeta a experiencia do cliente? → Risco de reclamacao
   - Gap afeta o resultado prometido? → Risco de churn
   - Excedente consume recurso sem retorno? → Risco de prejuizo

5. **Propor ajustes**
   - O que precisa ser criado com urgencia
   - O que pode ser cortado (excedente nao estrategico)
   - O que precisa ser renegociado com o cliente

## Output esperado

```markdown
## 📊 Diagnostico — Alinhamento de Escopo

**Cliente:** [nome]
**Produto:** [produto] | R$ [valor] | [duracao]
**Fase atual:** [fase]
**Data da analise:** [YYYY-MM-DD]

### Score de alinhamento: [X/10]

| Categoria | Previsto | Entregue | Em andamento | Faltante |
|-----------|----------|----------|--------------|----------|
| Estrategia | [X] | [X] | [X] | [X] |
| Conteudo | [X] | [X] | [X] | [X] |
| Midia | [X] | [X] | [X] | [X] |
| Comercial | [X] | [X] | [X] | [X] |
| Design | [X] | [X] | [X] | [X] |

---

## ⚠️ Gargalos — Desalinhamentos

### O que esta faltando (deveria existir)
| # | Entregavel | Fase prevista | Impacto da ausencia |
|---|-----------|---------------|---------------------|
| 1 | [desc] | [fase] | [risco] |

### O que esta sobrando (nao esta no escopo)
| # | Atividade | Esforco gasto | Decisao sugerida |
|---|-----------|---------------|------------------|
| 1 | [desc] | [horas/recursos] | Manter / Cortar / Converter em upsell |

### Riscos de desalinhamento
| # | Risco | Probabilidade | Impacto |
|---|-------|---------------|---------|
| 1 | Cliente questionar falta de [X] | [Alta/Media/Baixa] | [desc] |

---

## ✅ Recomendacoes

| # | Acao | Tipo | Urgencia | Responsavel |
|---|------|------|----------|-------------|
| 1 | Criar [entregavel faltante] | Gap critico | Imediata | [quem] |
| 2 | Parar producao de [excedente] | Economia | Proxima sprint | [quem] |
| 3 | Propor upsell de [servico extra] | Receita | Proximo alinhamento | Gustavo |

---

## 🧠 Decisao necessaria

- [ ] Aprovar producao dos [X] entregaveis faltantes
- [ ] Confirmar corte de [atividade excedente]
- [ ] Alinhar com cliente sobre expectativa de [entregavel]
- [ ] Avaliar proposta de upsell para [servico]
```

## Possiveis acoes no ClickUp

- Criar tarefas para entregaveis faltantes com prioridade adequada
- Arquivar ou cancelar tarefas de atividades excedentes
- Adicionar comentario de "fora do escopo" em tarefas excedentes
- Atualizar Torre de Controle com status de alinhamento
- Criar tarefa de alinhamento com cliente quando necessario
