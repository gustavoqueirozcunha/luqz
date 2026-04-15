---
execution: inline
agent: clara-copy
inputFile: squads/luqz-conteudo/output/tema-objetivo.md
outputFile: squads/luqz-conteudo/output/estrutura-conteudo.md
---

# Step 03: Estrutura do Conteúdo

## Context Loading

Carregue antes de executar:
- `squads/luqz-conteudo/output/briefing-conteudo.md` — fonte primária de contexto
- `squads/luqz-conteudo/output/tema-objetivo.md` — tema, ângulo, formato e hook definidos por Bento

## Instructions

### Process

1. **Absorva o tema e o formato**: Leia o output de Bento. O formato do carrossel (Listicle, Tutorial, Mito vs Realidade, etc.) determina o arco narrativo obrigatório.

2. **Mapeie o arco narrativo por slide**: Com base no formato escolhido, distribua o conteúdo em até 10 slides. Cada slide tem um papel claro na narrativa.

3. **Defina a distribuição obrigatória**:
   - **Slide 1**: Hook (definido por Bento — usar exatamente)
   - **Slides 2–8**: Conteúdo (argumentos, dados, exemplos, passos)
   - **Slide 9** (se necessário): Síntese ou takeaway
   - **Slide 10**: CTA (ação concreta derivada do objetivo de conversão)

4. **Nomeie cada slide**: Um título de papel (não o copy final) — ex: "Slide 3 — Dado surpreendente", "Slide 5 — Exemplo real".

5. **Defina a intenção de cada slide**: dor / benefício / prova / CTA

## Output Format

```markdown
# Estrutura do Carrossel — [Tema Central]

**Formato:** [nome do formato]
**Total de slides:** [6 a 10]

---

| Slide | Papel | Intenção |
|-------|-------|----------|
| Slide 1 | Hook — [descrição] | dor |
| Slide 2 | [papel] | [intenção] |
| Slide 3 | [papel] | [intenção] |
| Slide 4 | [papel] | [intenção] |
| Slide 5 | [papel] | [intenção] |
| Slide 6 | [papel] | [intenção] |
| Slide 7 | [papel] | [intenção] |
| Slide 8 | [papel] | [intenção] |
| Slide 9 | Síntese | benefício |
| Slide 10 | CTA — [ação específica] | CTA |
```

## Veto Conditions

Rejeitar e refazer se:
1. Estrutura não mapear slides do 1 ao 10 (ou ao número definido, mínimo 6)
2. Slide 1 não for Hook ou slide final não for CTA
3. Intenção de algum slide não for um dos 4 valores: dor / benefício / prova / CTA
4. Estrutura contradizer o formato escolhido por Bento

## Quality Criteria

- [ ] Slide 1 é sempre Hook com a promessa definida por Bento
- [ ] Slide final é sempre CTA com ação derivada do objetivo de conversão
- [ ] Cada slide tem papel e intenção definidos
- [ ] Total entre 6 e 10 slides
- [ ] Arco narrativo segue o formato selecionado (Listicle, Tutorial, etc.)
