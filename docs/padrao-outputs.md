# Padrão de Outputs — Sistema LUQZ

> Todo output da IA segue um destes templates.  
> Outputs sem template definido = output não padronizado = não publicar.  
> Após aprovação pelo QA Gate → salvar no destino correto → publicar via luqz-documentacao.

---

## DESTINOS POR TIPO

| Tipo de Output | Destino |
|---|---|
| Estratégia de tráfego | `squads/luqz-aquisicao-conversao/output/[timestamp]/` |
| Diagnóstico de conta | `clientes/[x]/logs/diagnostico-[periodo].md` |
| Planejamento de campanha | `clientes/[x]/projetos/ativos/campanha-[nome].md` |
| Análise de desempenho | `clientes/[x]/logs/analise-semana-N.md` |
| Carrossel | `clientes/[x]/projetos/conteudo/carrossel-[tema].md` |
| Copy de anúncio | `clientes/[x]/projetos/ativos/copy-[campanha].md` |
| Roteiro de vídeo | `clientes/[x]/projetos/conteudo/roteiro-[tema].md` |

---

## TEMPLATE 1 — ESTRATÉGIA DE TRÁFEGO

```markdown
# Estratégia de Tráfego — [CLIENTE] — [MÊS/ANO]

**Agente:** Estela Estratégia + Marcio Mídia  
**Produto:** [AP360 / outro]  
**Fase/Semana:** [Fase X | Semana N]  
**Data:** [data]

---

## CONTEXTO DA CONTA

- **Objetivo primário:** [leads / vendas / awareness]
- **Budget disponível:** R$ [valor]
- **Canais ativos:** [Meta Ads / Google Ads / ambos]
- **Fase de maturidade da conta:** [fria / morna / aquecida]

## DIAGNÓSTICO ATUAL

| Métrica | Atual | Meta | Gap |
|---------|-------|------|-----|
| CPA | | | |
| CPL | | | |
| ROAS | | | |
| Taxa de conversão LP | | | |

## ESTRATÉGIA

### Hipótese central
[Uma frase: o que acreditamos que vai mover o resultado]

### Alavancas prioritárias
1. [Alavanca 1 — o que fazer e por quê]
2. [Alavanca 2]
3. [Alavanca 3]

### Distribuição de budget
| Canal | Budget | Objetivo | KPI |
|-------|--------|----------|-----|
| | | | |

## PLANO DE AÇÃO

| Ação | Responsável | Prazo | Status |
|------|-------------|-------|--------|
| | | | |

## INDICADORES DE SUCESSO
- [Métrica 1]: [meta concreta]
- [Métrica 2]: [meta concreta]

---
QA Gate: ✅ Estratégia | ✅ Copy | ✅ Design | ✅ Negócio  
Veredicto: [APROVADO / REPROVADO — motivo]
```

---

## TEMPLATE 2 — DIAGNÓSTICO DE CONTA

```markdown
# Diagnóstico — [CLIENTE] — Semana [N] / [Período]

**Agente:** Estela Estratégia  
**Data:** [data]

---

## SITUAÇÃO ATUAL

### Performance Geral
| KPI | Período Atual | Período Anterior | Variação |
|-----|---------------|------------------|----------|
| Investimento | | | |
| Receita gerada | | | |
| ROAS | | | |
| CPA / CPL | | | |
| CTR | | | |
| Taxa de conversão | | | |

### O que está funcionando
- [Ponto forte 1 — com dado]
- [Ponto forte 2 — com dado]

### O que não está funcionando
- [Problema 1 — com dado e hipótese de causa]
- [Problema 2 — com dado e hipótese de causa]

## GAPS IDENTIFICADOS

1. **[Gap 1]:** [descrição + impacto estimado]
2. **[Gap 2]:** [descrição + impacto estimado]

## HIPÓTESES

| Hipótese | Prioridade | Teste proposto |
|----------|------------|----------------|
| | Alta/Média/Baixa | |

## AÇÕES RECOMENDADAS

| Ação | Prioridade | Esforço | Impacto esperado | Prazo |
|------|------------|---------|------------------|-------|
| | | | | |

---
QA Gate: ✅ Estratégia | ✅ Copy | ✅ Design | ✅ Negócio
```

---

## TEMPLATE 3 — PLANEJAMENTO DE CAMPANHA

```markdown
# Planejamento de Campanha — [NOME DA CAMPANHA]

**Cliente:** [nome]  
**Agente:** Estela + Marcio + Clara  
**Produto LUQZ:** [AP360 / outro]  
**Objetivo:** [conversão / geração de leads / awareness]  
**Data de início:** [data]  
**Data de fim:** [data]

---

## OBJETIVO SMART

[Específico, mensurável, atingível, relevante, temporal]

## PÚBLICO-ALVO

**Audiência primária:**
- [Descrição detalhada baseada em persona.md]

**Audiência secundária (retargeting):**
- [Quem já interagiu e como reconquistar]

**Audiência excluída:**
- [Quem NÃO deve ver — evitar desperdício]

## ESTRUTURA DA CAMPANHA

| Nível | Descrição | Budget | Objetivo |
|-------|-----------|--------|----------|
| Campanha | | | |
| Conjunto de anúncios 1 | | | |
| Conjunto de anúncios 2 | | | |
| Anúncio A | | | |
| Anúncio B | | | |

## ATIVOS NECESSÁRIOS

| Ativo | Formato | Tamanho | Status |
|-------|---------|---------|--------|
| | | | ☐ A criar / ✅ Pronto |

## FUNIL

Topo → [criativo / canal]  
Meio → [criativo / canal]  
Fundo → [criativo / canal]

## INDICADORES

- KPI primário: [métrica] = [meta]
- KPI secundário: [métrica] = [meta]
- Budget total: R$ [valor]
- CPA/CPL alvo: R$ [valor]

---
QA Gate: ✅ Estratégia | ✅ Copy | ✅ Design | ✅ Negócio
```

---

## TEMPLATE 4 — ANÁLISE DE DESEMPENHO

```markdown
# Análise de Desempenho — [CLIENTE] — [Período]

**Agente:** Estela Estratégia  
**Trilha:** T4 — Análise de Performance  
**Data:** [data]

---

## RESUMO EXECUTIVO

[2-3 frases: o que aconteceu neste período em termos de resultado]

## MÉTRICAS DO PERÍODO

### Meta Ads
| Campanha | Investimento | Resultado | CPA/CPL | ROAS |
|----------|-------------|-----------|---------|------|
| | | | | |

### Google Ads
| Campanha | Investimento | Resultado | CPA/CPL | ROAS |
|----------|-------------|-----------|---------|------|
| | | | | |

### Orgânico
| Métrica | Valor | Variação |
|---------|-------|----------|
| Alcance | | |
| Engajamento | | |
| Seguidores | | |

## ANÁLISE DE CRIATIVOS

| Criativo | Impressões | CTR | Conversão | Status |
|---------|------------|-----|-----------|--------|
| | | | | ✅ Escalar / ❌ Pausar / 🔄 Testar |

## APRENDIZADOS DO PERÍODO

1. [Aprendizado 1 — com dado]
2. [Aprendizado 2 — com dado]

## PRÓXIMOS PASSOS

| Ação | Prioridade | Prazo |
|------|------------|-------|
| | Alta/Média/Baixa | |

---
QA Gate: ✅ Estratégia | ✅ Copy | ✅ Design | ✅ Negócio
```

---

## TEMPLATE 5 — CARROSSEL

```markdown
# Carrossel — [TEMA] — [CLIENTE]

**Agente:** Clara Copy + Rafael Roteiro + Designer  
**Trilha:** T3 — Produção de Conteúdo  
**Objetivo:** [educação / autoridade / conversão / relacionamento]  
**Data:** [data]

---

## ESTRATÉGIA DO CONTEÚDO

**Hook principal:** [Por que alguém vai parar e ler?]
**Transformação prometida:** [De X para Y]
**CTA:** [O que o usuário deve fazer após ler?]

## SLIDES

### SLIDE 1 — CAPA
**Headline:** [máx. 6 palavras]  
**Subheadline:** [máx. 10 palavras]  
**Visual:** [descrição do visual — o que deve aparecer]

### SLIDE 2
**Título:** [título do slide]  
**Texto:** [conteúdo — máx. 3 linhas]  
**Visual:** [descrição]

[repetir para cada slide]

### SLIDE FINAL — CTA
**Texto:** [chamada para ação]  
**CTA:** [botão / instrução]

---

## NOTAS DE DESIGN

- Referência visual: [arquivo em design/sistema-visual.md]
- Paleta: [cores específicas do cliente]
- Tipografia: [fontes do sistema visual]

---
QA Gate: ✅ Estratégia | ✅ Copy | ✅ Design | ✅ Negócio
```

---

## TEMPLATE 6 — COPY DE ANÚNCIO

```markdown
# Copy de Anúncio — [CAMPANHA] — [CLIENTE]

**Agente:** Clara Copy  
**Formato:** [Feed / Stories / Reels / Search / Display]  
**Objetivo:** [conversão / tráfego / leads]  
**Data:** [data]

---

## CONTEXTO

- **Público:** [segmento específico]
- **Estágio do funil:** [Topo / Meio / Fundo]
- **Produto/Oferta anunciada:** [o que está sendo promovido]

---

## VARIAÇÃO A

**Headline:** [máx. 40 caracteres]  
**Texto principal:**  
[3-5 linhas — hook + problema + solução + prova + CTA]  
**CTA:** [botão — máx. 20 caracteres]  
**Descrição (se aplicável):** [máx. 30 caracteres]

## VARIAÇÃO B

**Headline:**  
**Texto principal:**  
**CTA:**  

## VARIAÇÃO C (se solicitado)

**Headline:**  
**Texto principal:**  
**CTA:**  

---

## NOTAS DE TESTE

- A vs B: [o que está sendo testado — headline / abordagem / CTA]
- Hipótese: [qual deve ganhar e por quê]

---
QA Gate: ✅ Estratégia | ✅ Copy | ✅ Design | ✅ Negócio
```

---

## TEMPLATE 7 — ROTEIRO DE VÍDEO

```markdown
# Roteiro — [TEMA] — [CLIENTE]

**Agente:** Rafael Roteiro  
**Formato:** [Reels / Tiktok / YouTube Shorts / Story]  
**Duração alvo:** [15s / 30s / 60s / 90s]  
**Objetivo:** [alcance / conversão / autoridade / relacionamento]  
**Data:** [data]

---

## ESTRUTURA

| Tempo | Elemento | Roteiro | Notas de Produção |
|-------|----------|---------|-------------------|
| 0-3s | HOOK | [fala exata] | [ação visual] |
| 3-15s | DESENVOLVIMENTO | [fala exata] | [ação visual] |
| 15-25s | VIRADA / PROVA | [fala exata] | [ação visual] |
| 25-30s | CTA | [fala exata] | [ação visual] |

---

## ROTEIRO COMPLETO

**[0-3s — HOOK]**  
[Fala exata. Começa no problema ou na curiosidade.]

**[3-15s — DESENVOLVIMENTO]**  
[Aprofunda o problema ou a promessa.]

**[15-25s — VIRADA]**  
[Entrega o valor. Prova ou insight.]

**[25-30s — CTA]**  
[Ação específica. Simples. Direta.]

---

## DIREÇÃO DE PRODUÇÃO

- **Localização:** [estúdio / externo / fundo neutro]
- **Estilo de edição:** [cuts rápidos / lento / legendas / sem fala]
- **Trilha sonora:** [referência de estilo / energia]
- **Texto on-screen:** [o que aparece na tela escrito]

---
QA Gate: ✅ Estratégia | ✅ Copy | ✅ Design | ✅ Negócio
```

---

> docs/padrao-outputs.md — v1.0 | Sistema LUQZ | Abril 2026
