---
name: diagnosticar-projeto
description: Analisa um projeto e gera visao executiva + operacional com status, gargalos e proximos passos. Usar quando precisar de um raio-X completo do andamento de um cliente.
type: prompt
version: 1.0.0
categories:
  - gestao
  - diagnostico
---

# Diagnosticar Projeto

## Objetivo

Gerar um diagnostico completo de um projeto ativo, cruzando escopo vendido, tarefas existentes, documentos produzidos e status no ClickUp. Entrega uma visao executiva para tomada de decisao rapida.

## Quando usar

- Inicio de semana para revisar andamento geral de um cliente
- Antes de reunioes de alinhamento com o cliente ou com o time
- Quando Gustavo pede "como esta o projeto X?"
- Apos periodos de inatividade ou troca de responsavel
- Quando ha sensacao de desorganizacao ou falta de clareza no projeto

## Input esperado

```
Cliente: [nome do cliente]
Produto: [AP360 / AP3M / outro]
Fase atual: [Onboarding / Execucao — Trilha X]
ClickUp Space/URL: [link opcional]
Observacoes: [contexto adicional livre]
```

## Processo interno (raciocinio do agente)

1. **Carregar contexto do cliente**
   - Ler `/clientes/[cliente]/contexto/` (diretrizes, oferta, persona, tom-de-voz, cliente.md)
   - Identificar produto contratado e fase atual

2. **Mapear documentos existentes**
   - Varrer `/clientes/[cliente]/` por todos os arquivos produzidos
   - Classificar por area: estrategia, conteudo, midia, comercial, design

3. **Sincronizar com ClickUp**
   - Ler tarefas do projeto no ClickUp (status, responsaveis, datas)
   - Ler Torre de Controle e verificar paginas preenchidas vs. vazias

4. **Cruzar escopo vs. realidade**
   - Comparar entregaveis previstos no produto com o que existe
   - Calcular % de avanco estimado por area

5. **Identificar gaps e gargalos**
   - O que deveria existir e nao existe?
   - O que esta atrasado ou travado?
   - O que depende de decisao do cliente?

6. **Formular recomendacoes**
   - Priorizar acoes por impacto no resultado
   - Separar o que o time pode resolver sozinho vs. o que precisa de Gustavo

## Output esperado

```markdown
## 📊 Diagnostico — [Nome do Cliente]

**Produto:** [produto]
**Fase:** [fase atual]
**Avanco estimado:** [X%]
**Data do diagnostico:** [YYYY-MM-DD]

### Situacao atual
- [O que esta funcionando — bullet points]

### Desalinhamentos
- [Escopo vs. realidade — bullet points]

---

## ⚠️ Gargalos

| # | Gargalo | Impacto | Urgencia |
|---|---------|---------|----------|
| 1 | [desc]  | [Alto/Medio/Baixo] | [Critico/Importante/Normal] |

---

## ✅ Recomendacoes

| # | Acao | Responsavel | Prazo sugerido |
|---|------|-------------|----------------|
| 1 | [desc] | [quem] | [quando] |

---

## 🧠 Decisao necessaria

- [ ] [Decisao 1 — quem precisa decidir e contexto]
- [ ] [Decisao 2]
```

## Possiveis acoes no ClickUp

- Atualizar status de tarefas desatualizadas
- Criar tarefas para gaps identificados
- Adicionar comentario de status em tarefas criticas
- Atualizar pagina de Dashboard na Torre de Controle com o diagnostico
- Reatribuir tarefas sem responsavel definido
