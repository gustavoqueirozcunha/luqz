---
execution: inline
agent: clara-copy
inputFile: squads/luqz-aquisicao-conversao/output/estrategia-performance.md
outputFile: squads/luqz-aquisicao-conversao/output/copy-ativos.md
---

# Step 05: Copy dos Ativos

## Context Loading

Load these files before executing:
- `squads/luqz-aquisicao-conversao/output/estrategia-performance.md` — Estratégia aprovada: ICP, ativos a produzir, função de cada um, etapa do funil
- `squads/luqz-aquisicao-conversao/output/briefing-cliente.md` — Contexto do cliente: produto, vocabulário, histórico
- `squads/luqz-aquisicao-conversao/pipeline/data/tone-of-voice.md` — Opções de tom de voz
- `squads/luqz-aquisicao-conversao/pipeline/data/output-examples.md` — Exemplos de referência de qualidade
- `squads/luqz-aquisicao-conversao/pipeline/data/anti-patterns.md` — Anti-padrões a evitar
- `_opensquad/_memory/company.md` — Contexto da LUQZ

## Instructions

### Process

1. **Selecionar o tom de voz**: Ler `pipeline/data/tone-of-voice.md`. Recomendar o tom mais adequado ao ICP e ao setor do cliente. Apresentar as opções e aguardar confirmação do usuário antes de começar a escrever.

2. **Confirmar lista de ativos**: Com base na estratégia aprovada, confirmar quais ativos de copy serão produzidos neste passo (landing page, carrosseis, estáticos — os roteiros de vídeo ficam com Rafael Roteiro no próximo passo).

3. **Criar copy da landing page** (se aplicável):
   - Hero: Headline (3 versões) → escolher + subheadline + CTA primário
   - Problema: amplificação da dor em 1–2 parágrafos
   - Solução: benefícios específicos em formato de lista
   - Prova: estrutura de depoimento ou dado
   - Oferta: o que o cliente recebe exatamente
   - CTA final com urgência ou escassez (somente se genuínas)
   - Anotar intenção de cada seção

4. **Criar copy dos carrosseis** (se aplicável): Para cada carrossel, definir tema, gancho do slide 1, desenvolvimento slides 2–N (máx. 40 palavras/slide), CTA final. Incluir sugestão de visual por slide.

5. **Criar copy dos estáticos** (se aplicável): Para cada estático, headline de impacto + descrição do visual recomendado + CTA. Máximo 15 palavras visíveis.

6. **Entregar estruturado**: Todo o copy organizado por ativo, com anotações de intenção e instruções de design quando necessário.

## Output Format

```markdown
# Copy dos Ativos — [Nome do Cliente]
**Tom de voz selecionado:** [tom]
**Data:** [data]
**Copywriter:** Clara Copy

---

## ATIVO 1 — [Nome do Ativo]
**Tipo:** Landing Page | Carrossel | Estático
**Função:** [função no funil]
**Etapa do ICP:** [consciência | consideração | decisão]

### [Seção 1]
[copy]
*Intenção: [explicação da escolha]*

### [Seção 2]
...

---

## ATIVO 2 — [Nome do Ativo]
...
```

## Output Example

```markdown
# Copy dos Ativos — Studio Conta
**Tom de voz selecionado:** Direto e empático — fala como um amigo que entende do assunto
**Data:** 2026-04-06
**Copywriter:** Clara Copy

---

## ATIVO 1 — Landing Page de Pré-Diagnóstico
**Tipo:** Landing Page
**Função:** Captura e qualificação de leads via formulário
**Etapa do ICP:** Decisão

### HERO

**Headline (3 versões testadas):**
A) Sua empresa cresce, mas o caixa nunca sobra?
B) Você paga seus impostos certinho — mas está pagando mais do que deveria.
C) Contabilidade que entende de empresa — não só de imposto.

**Headline escolhida:** A — ataca a dor mais universal do ICP (caixa apertado apesar do crescimento)

**Subheadline:** Fazemos um diagnóstico gratuito de 30 minutos da situação contábil da sua empresa. Você sai sabendo exatamente onde está perdendo dinheiro e o que resolver primeiro.

**CTA primário:** → Quero meu diagnóstico gratuito
*Intenção: CTA descreve o que acontece (diagnóstico), remove objeção (gratuito) e é ação específica, não "saiba mais".*

---

### PROBLEMA

**Título:** Crescer sem estrutura é trabalhar pra pagar contador. Mas não é assim que deveria ser.

**Body:** A maioria dos empresários que atendemos chega com o mesmo problema: fatura bem, mas no final do mês o dinheiro sumiu. Imposto surpresa. Custo que não sabia que existia. Declaração errada do ano passado que vai gerar multa agora.

Não é falta de esforço. É falta de uma contabilidade que olhe para o seu negócio de verdade — não só para o CNPJ.

*Intenção: Amplifica a dor sem culpar o cliente. Posiciona o problema como sistêmico, não pessoal. Termina com a distinção que posiciona o serviço.*

---

### SOLUÇÃO

**Título:** Uma contabilidade que trabalha junto com você. Não só por você.

**Benefícios:**
- ✓ Diagnóstico real da situação fiscal — sem surpresa de imposto no final do trimestre
- ✓ Relatório mensal em linguagem de empresário — não de contador
- ✓ Alertas de prazo antes de multa — nunca mais pagar por atraso
- ✓ Reunião mensal de 30 min para alinhar onde a empresa está — e para onde vai

*Intenção: Cada benefício resolve uma dor específica nomeada no bloco de problema. Linguagem simples — "linguagem de empresário" é o vocabulário do ICP.*

---

### PROVA

**Depoimento:**
"Em 3 meses, o Studio Conta identificou R$14.000 em créditos tributários que eu nem sabia que tinha. Só isso pagou 1 ano de honorários." — Carlos M., dono de e-commerce, SP

**Dado:** 89% dos nossos clientes identificam redução de carga tributária no primeiro trimestre.

---

### CTA FINAL

**Headline:** Pronto para entender de verdade como está a situação da sua empresa?

**Subtext:** 30 minutos. Gratuito. Sem compromisso. Você sai com clareza — independente de contratar ou não.

**CTA:** → Agendar meu diagnóstico gratuito agora

---

## ATIVO 2 — Carrossel Instagram: "O erro mais comum de quem cresce sem estrutura"
**Tipo:** Carrossel (6 slides)
**Função:** Educação e qualificação — identificação do ICP com o problema
**Etapa do ICP:** Consciência

**SLIDE 1 — GANCHO**
Texto: Seu negócio cresceu. Sua contabilidade, não.
*Visual: Fundo verde escuro, texto branco, grande. Sem imagem.*
*Intenção: Afirmação de identificação — o empresário que cresceu sem organizar a parte contábil vai se ver nessa frase.*

**SLIDE 2 — PROBLEMA**
Texto: 3 sinais de que sua contabilidade não acompanhou o crescimento:
→ Você não sabe quanto paga de imposto por mês
→ Sua declaração é sempre uma surpresa
→ Você não tem relatório mensal do seu negócio
*Visual: Lista com ícones de alerta*

**SLIDE 3 — CUSTO DO PROBLEMA**
Texto: Sem estrutura contábil, você paga mais imposto do que deve — sem saber.
A maioria dos MEIs e MEs em crescimento tem crédito tributário não aproveitado.
*Visual: Ícone de dinheiro "escapando"*

**SLIDE 4 — SOLUÇÃO PARCIAL**
Texto: O que muda quando a contabilidade é feita certo:
→ Você sabe exatamente quanto sobra todo mês
→ Nenhum imposto surpresa
→ Decisões baseadas em número real, não em feeling
*Visual: Ícone de gráfico subindo*

**SLIDE 5 — PROVA**
Texto: Carlos tinha esse problema. Em 3 meses, identificamos R$14k em créditos que ele nem sabia que tinha.
*Visual: Foto ou avatar do cliente + número em destaque*

**SLIDE 6 — CTA**
Texto: Quer saber como está a situação da sua empresa?
Fazemos diagnóstico gratuito. Link na bio.
*Visual: CTA em destaque, cor contrastante*
```

## Veto Conditions

Reject and redo if ANY of these are true:
1. Headline genérico sem dor específica ou benefício concreto do ICP.
2. CTA descrito como "Saiba mais", "Entre em contato" ou equivalente — deve dizer o que acontece após o clique.
3. Algum slide do carrossel com mais de 40 palavras.
4. Promessa sem prova (dado, depoimento ou garantia) em landing page.
5. Tom de voz não selecionado e confirmado antes da produção.

## Quality Criteria

- [ ] Tom de voz selecionado e confirmado antes da escrita
- [ ] Headline apresentado em 3 versões com escolha justificada
- [ ] CTA de cada ativo específico sobre o que acontece após o clique
- [ ] Intenção de cada seção documentada junto ao texto
- [ ] Carrosseis dentro do limite de 40 palavras por slide
- [ ] Toda promessa acompanhada de prova (dado, depoimento, garantia)
- [ ] Sugestões de visual incluídas para cada ativo
