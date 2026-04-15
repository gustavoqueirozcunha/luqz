---
execution: inline
agent: estela-estrategia
inputFile: squads/luqz-conteudo/output/briefing-conteudo.md
outputFile: squads/luqz-conteudo/output/tema-objetivo.md
---

# Step 02: Tema e Objetivo Estratégico

## Context Loading

Carregue antes de executar:
- `squads/luqz-conteudo/output/briefing-conteudo.md` — fonte primária e única de contexto
- `_opensquad/_memory/company.md` — princípios da LUQZ

## Instructions

### Process

1. **Leia o briefing integralmente**: Absorva nicho, ICP, objetivo, produto, tom e estágio do funil. Não suponha nada além do que está escrito.

2. **Defina o tema central do carrossel**: Uma frase que resume o assunto — específico o suficiente para guiar o copy slide a slide. Não é o título do carrossel, é a âncora estratégica.

3. **Defina o ângulo de entrada**: Qual a perspectiva que torna esse tema relevante para o ICP agora? Opções: dor não nomeada, dado surpreendente, mito vs. realidade, passo a passo, antes e depois.

4. **Defina o objetivo de conversão do carrossel**: O que o ICP deve fazer após ver o último slide? (ex: salvar, comentar keyword, clicar no link da bio, enviar para alguém)

5. **Selecione o formato de carrossel**: Com base no ângulo, escolha o formato mais adequado:
   - Editorial / Tese
   - Listicle / Lista
   - Tutorial / Passo-a-passo
   - Mito vs. Realidade
   - Antes e Depois
   - Storytelling / Narrativa
   - Problema → Solução

6. **Defina a promessa do slide 1 (hook)**: Uma frase-âncora que para o scroll. Deve ser validada contra o ICP e o estágio do funil.

## Output Format

```markdown
# Tema e Objetivo — [Nicho do Briefing]

**Tema central:** [frase âncora — não é título, é diretriz]
**Ângulo de entrada:** [dor não nomeada / dado surpreendente / mito vs realidade / passo a passo / antes e depois]
**Formato do carrossel:** [nome do formato escolhido]
**Objetivo de conversão:** [ação esperada após o último slide]
**Promessa do hook (Slide 1):** [frase que para o scroll]

## Justificativa Estratégica
[2-3 frases explicando por que esse tema + ângulo + formato servem ao ICP e ao objetivo declarado no briefing]
```

## Veto Conditions

Rejeitar e refazer se:
1. Tema central não derivar diretamente do briefing (nicho + ICP + objetivo)
2. Formato de carrossel não for um dos 7 formatos listados
3. Promessa do hook for genérica ("5 dicas de marketing") sem especificidade para o ICP
4. Objetivo de conversão não for uma ação concreta e mensurável

## Quality Criteria

- [ ] Tema central é específico ao nicho e ICP do briefing
- [ ] Ângulo escolhido combina com o estágio do funil declarado
- [ ] Formato de carrossel justificado com base no ângulo
- [ ] Promessa do hook é específica e direcionada ao ICP
- [ ] Objetivo de conversão é uma ação concreta (não "engajamento geral")
