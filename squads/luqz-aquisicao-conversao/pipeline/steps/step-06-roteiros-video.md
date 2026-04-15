---
execution: inline
agent: rafael-roteiro
inputFile: squads/luqz-aquisicao-conversao/output/estrategia-performance.md
outputFile: squads/luqz-aquisicao-conversao/output/roteiros-video.md
---

# Step 06: Roteiros de Vídeo

## Context Loading

Load these files before executing:
- `squads/luqz-aquisicao-conversao/output/estrategia-performance.md` — Estratégia aprovada: tipo de vídeo necessário, ICP, etapa do funil, objetivo de conversão
- `squads/luqz-aquisicao-conversao/output/briefing-cliente.md` — Contexto do cliente: produto, público, vocabulário
- `squads/luqz-aquisicao-conversao/output/copy-ativos.md` — Copy produzida por Clara Copy — para manter coerência de voz e mensagem
- `_opensquad/_memory/company.md` — Contexto da LUQZ

## Instructions

### Process

1. **Verificar quais roteiros são necessários**: Checar a estratégia aprovada para identificar os formatos de vídeo a produzir (VSL, Reel, Demo, Educativo, Depoimento estruturado). Confirmar com o usuário se a lista está correta antes de começar.

2. **Classificar cada formato**: Para cada roteiro, aplicar a estrutura correta:
   - **Reel (até 90s)**: Gancho 3s → Problema → Agitação → Virada → CTA
   - **VSL (2–15min)**: Gancho → Problema → Agitação → Solução → Prova → Oferta → Garantia → CTA
   - **Demo (1–3min)**: Gancho → "Vou te mostrar" → Demonstração passo a passo → Resultado → CTA
   - **Educativo (1–5min)**: Gancho → Contexto → Conteúdo de valor → Teaser de próximo passo → CTA suave

3. **Criar o gancho**: Para cada roteiro, criar ao menos 3 versões de gancho (primeiros 3 segundos). Escolher e justificar.

4. **Redigir cena a cena**: Para cada cena, especificar:
   - Copy falada (palavra por palavra, como será dita)
   - Visual na tela (o que o espectador vê: B-roll, texto animado, gráfico, close no apresentador)
   - Tempo estimado da cena
   - Tom emocional pretendido

5. **Revisar ritmo**: Verificar se o roteiro lê naturalmente em voz alta. Ajustar frases que travam. Conferir duração total.

6. **Entregar com sumário**: Cada roteiro começa com sumário (formato, duração total, objetivo, ICP) seguido do roteiro cena a cena.

## Output Format

```markdown
# Roteiros de Vídeo — [Nome do Cliente]
**Data:** [data]
**Roteirista:** Rafael Roteiro

---

## ROTEIRO 1 — [Nome do Vídeo]

### Sumário
- **Formato:** [Reel | VSL | Demo | Educativo]
- **Duração estimada:** [X segundos / X minutos]
- **Objetivo:** [conversão esperada]
- **ICP:** [quem é o espectador-alvo]
- **Plataforma:** [Instagram | LinkedIn | YouTube | Landing Page]

### Gancho (3 versões)
A) [versão A]
B) [versão B]
C) [versão C]
**Escolhido:** [letra] — [justificativa]

---

### Roteiro

**CENA 1 — [Nome da cena] ([tempo estimado])**
**Visual:** [o que aparece na tela]
**Fala:** "[texto exato que será dito]"
**Tom:** [tom emocional pretendido]

**CENA 2 — ...**
...

---
```

## Output Example

```markdown
# Roteiros de Vídeo — Studio Conta
**Data:** 2026-04-06
**Roteirista:** Rafael Roteiro

---

## ROTEIRO 1 — Reel de Conversão: "O diagnóstico que todo empresário precisa"

### Sumário
- **Formato:** Instagram/LinkedIn Reel
- **Duração estimada:** 45 segundos
- **Objetivo:** Gerar clique no link da bio → Agendamento de diagnóstico gratuito
- **ICP:** MEI e ME em crescimento, faturamento R$200k–R$1M/ano, com problemas de organização financeira
- **Plataforma:** Instagram Feed + Stories (corte)

### Gancho (3 versões)
A) "Você sabe quanto sua empresa pagou de imposto esse mês?"
B) "Seu negócio cresceu. Sua contabilidade não acompanhou."
C) "Todo empresário que conheço paga mais imposto do que deveria."

**Escolhido:** A — pergunta de identificação direta que expõe uma dor específica. A maioria do ICP não saberá responder, o que provoca desconforto e atenção imediata.

---

### Roteiro

**CENA 1 — GANCHO (0–4s)**
**Visual:** Close frontal no apresentador, fundo neutro claro, câmera estável
**Fala:** "Você sabe quanto sua empresa pagou de imposto esse mês?"
**Tom:** Direto, sem rodeios. Uma pergunta simples que expõe algo que o ICP sabe que não sabe.

**CENA 2 — IDENTIFICAÇÃO DO PROBLEMA (4–15s)**
**Visual:** Apresentador continua + texto animado na tela: "A maioria não sabe."
**Fala:** "A maioria dos empresários que conheço não sabe. Pagam o boleto quando chega, torcem pra não ter mais nenhum — e ficam sempre na dúvida se estão pagando certo ou pagando demais."
**Tom:** Empático. "Eu sei que você passa por isso." Sem julgamento.

**CENA 3 — AGITAÇÃO (15–25s)**
**Visual:** Texto animado: "Empresas em crescimento pagam em média 23% a mais em impostos do que deveriam."
**Fala:** "E na maioria das vezes, a resposta é: pagando demais. Empresas em crescimento têm crédito tributário que simplesmente não são aproveitados porque a contabilidade não olha para o negócio — só para o declaratório."
**Tom:** Revelador. "Eu sei de algo que você não sabe." Não alarmista.

**CENA 4 — SOLUÇÃO RÁPIDA (25–38s)**
**Visual:** Apresentador + texto: "Diagnóstico gratuito — 30 minutos"
**Fala:** "Por isso a gente faz um diagnóstico gratuito de 30 minutos. A gente olha para a situação real da sua empresa e te fala onde está perdendo dinheiro e o que resolver primeiro. Sem compromisso nenhum."
**Tom:** Generoso. Confiante. Remove objeções de custo e compromisso.

**CENA 5 — CTA (38–45s)**
**Visual:** Texto na tela: "LINK NA BIO → Agendar diagnóstico gratuito"
**Fala:** "Link na bio pra agendar o seu. Leva 30 segundos e você não precisa preparar nada."
**Tom:** Simples, direto. Remove atrito do CTA ("não precisa preparar nada").

---

## ROTEIRO 2 — Educativo: "3 sinais de que sua empresa cresceu mais do que sua contabilidade"

### Sumário
- **Formato:** Instagram Reel / LinkedIn Vídeo
- **Duração estimada:** 90 segundos
- **Objetivo:** Educação de mercado — gerar confiança e seguidor qualificado
- **ICP:** Mesma do roteiro anterior
- **Plataforma:** Instagram + LinkedIn

### Gancho (3 versões)
A) "Se sua empresa fatura mais de R$300k por ano, presta atenção nesses 3 sinais."
B) "Tem 3 coisas que acontecem quando sua empresa cresce mais rápido do que sua estrutura."
C) "A maioria dos empresários descobre que tem problema contábil quando já é tarde."

**Escolhido:** A — específico, cria identificação pelo faturamento, gera curiosidade imediata com "3 sinais".

---

### Roteiro

**CENA 1 — GANCHO (0–4s)**
**Visual:** Close frontal, tom sério mas acolhedor
**Fala:** "Se sua empresa fatura mais de 300 mil por ano, presta atenção nesses 3 sinais."
**Tom:** Autoridade calma. "Você precisa saber disso."

**CENA 2 — SINAL 1 (4–30s)**
**Visual:** Texto animado: "SINAL 1: Você não sabe quanto sobra todo mês"
**Fala:** "Primeiro: você não sabe quanto de fato sobra no final do mês. Faturou bem, pagou as contas, mas o saldo no banco não bate com a sensação. Se você não tem um DRE real — não o contábil, o de verdade — você está gerindo no escuro."
**Tom:** Claro, didático.

**CENA 3 — SINAL 2 (30–55s)**
**Visual:** Texto animado: "SINAL 2: Imposto é sempre surpresa"
**Fala:** "Segundo: o imposto é sempre uma surpresa. Você descobre o valor quando chega o boleto — nunca antes. Isso significa que sua contabilidade não está projetando o que você deve, só registrando o que você pagou."
**Tom:** Revela um problema que o ICP reconhece mas não sabia nomear.

**CENA 4 — SINAL 3 (55s–1min15s)**
**Visual:** Texto animado: "SINAL 3: Seu contador não te liga, você que liga"
**Fala:** "Terceiro — e esse é o mais importante: seu contador não te procura. Você que corre atrás quando tem dúvida. Contabilidade que não é proativa com empresas em crescimento é contabilidade que vai te custar caro eventualmente."
**Tom:** Firme, mas não agressivo. Posiciona o problema sem atacar o contador do ICP.

**CENA 5 — CTA (1min15s–1min30s)**
**Visual:** Texto: "Diagnóstico gratuito — link na bio"
**Fala:** "Se você se viu em pelo menos um desses, vale a pena fazer nosso diagnóstico gratuito. São 30 minutos e você sai sabendo exatamente onde está a oportunidade de melhoria. Link na bio."
**Tom:** Suave. Não vende — convida. CTA de baixo compromisso.
```

## Veto Conditions

Reject and redo if ANY of these are true:
1. Roteiro começa com apresentação do apresentador ("Olá, meu nome é...") nos primeiros 5 segundos — o gancho vem primeiro, sempre.
2. Cena sem indicação de visual na tela — roteiro incompleto para produção.
3. CTA com mais de um pedido de ação simultâneo.
4. Frases com mais de 25 palavras no roteiro — dificulta a fala natural e a compreensão.
5. Duração total do roteiro incompatível com o formato declarado (Reel > 90s, VSL < 2min).

## Quality Criteria

- [ ] Gancho apresentado em 3 versões com escolha justificada
- [ ] Tempo estimado anotado em cada cena
- [ ] Tom emocional documentado em cada cena
- [ ] Copy escrita para ser falada (frases curtas, contrações, ritmo conversacional)
- [ ] Visual na tela especificado em cada cena
- [ ] CTA único e específico no momento correto da estrutura
- [ ] Duração total compatível com o formato declarado
