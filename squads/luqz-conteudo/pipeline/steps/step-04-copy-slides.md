---
execution: inline
agent: clara-copy
inputFile: squads/luqz-conteudo/output/estrutura-conteudo.md
outputFile: squads/luqz-conteudo/output/copy-slides.md
---

# Step 04: Copy Slide a Slide

## Context Loading

Carregue antes de executar:
- `squads/luqz-conteudo/output/briefing-conteudo.md` — fonte primária (ICP, tom, produto, funil)
- `squads/luqz-conteudo/output/tema-objetivo.md` — tema, ângulo, hook e objetivo de conversão
- `squads/luqz-conteudo/output/estrutura-conteudo.md` — mapa de slides com papéis e intenções

## Instructions

### Process

1. **Respeite o mapa de slides**: Cada slide já tem papel e intenção definidos na estrutura. Escreva copy que serve a esse papel — não invente novos ângulos.

2. **Escreva slide a slide em sequência**: Comece pelo Slide 1 (Hook). Cada slide deve fazer sentido sozinho E dar razão para o ICP avançar ao próximo.

3. **Aplique o formato de copy obrigatório** para cada slide (veja abaixo).

4. **Respeite os limites extremos de design**:
   - Título: máximo 8 palavras (ideal 5)
   - Texto: 10 a 25 palavras MÁXIMO
   - A prioridade é TER RESPIRO. O design importa mais que a explicação exaustiva.
   - Slide de CTA: título é a ação, texto é a instrução curta e direta

5. **Aplique o tom de voz do briefing** em todos os slides. Não mude o tom entre slides.

6. **Slide 1 (Hook)**: Use exatamente a promessa definida por Bento no tema-objetivo.md. Não reescreva — refine se necessário para caber em 8 palavras.

### Formato Obrigatório por Slide

```
Slide N — [papel do slide]
- Título: [máx 8 palavras — frase de curtíssimo impacto]
- Texto: [10-25 palavras — mensagem ultracurta, direto ao ponto]
- Intenção: [dor / benefício / prova / CTA]
```

## Output Format

```markdown
# Copy de Slides — [Tema Central]

**ICP:** [copiado do briefing]
**Tom:** [copiado do briefing]
**Objetivo de conversão:** [copiado do tema-objetivo]

---

Slide 1 — Hook
- Título: [frase de impacto, máx 8 palavras]
- Texto: [contexto direto, 10-25 palavras]
- Intenção: dor

Slide 2 — [papel]
- Título: [ponto central, máx 8 palavras]
- Texto: [desenvolvimento rápido / dado, 10-25 palavras]
- Intenção: [benefício / prova]

[... repetir para todos os slides da estrutura ...]

Slide [N] — CTA
- Título: [ação urgente, máx 8 palavras]
- Texto: [instrução clara sem rodeios, 10-25 palavras]
- Intenção: CTA
```

## Veto Conditions

Rejeitar e refazer se:
1. Qualquer slide não tiver os 3 campos (Título / Texto / Intenção)
2. Algum slide tiver mais de 8 palavras no Título ou mais de 25 no Texto
3. Algum slide tiver menos de 10 palavras no Texto
4. O tom de voz variar entre slides
5. Slide 1 não for Hook ou slide final não for CTA
6. Copy de algum slide contradizer o papel definido na estrutura

## Quality Criteria

- [ ] Todos os slides têm exatamente os 3 campos: Título / Texto / Intenção
- [ ] Títulos extremamente curtos, ideal de 5 a 8 palavras
- [ ] Textos de alto impacto com 10 a 25 palavras (Foco em design/respiro)
- [ ] Tom de voz consistente em todos os slides
- [ ] Slide 1 usa a promessa de hook definida por Bento
- [ ] Slide final é CTA com ação concreta e específica
- [ ] Cada slide avança o arco narrativo — sem repetição ou enchimento
