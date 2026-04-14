---
execution: inline
agent: rafael-roteiro
inputFile: squads/luqz-conteudo/output/copy-slides.md
outputFile: squads/luqz-conteudo/output/direcao-visual.md
---

# Step 05: Direção Visual por Slide

## Context Loading

Carregue antes de executar:
- `squads/luqz-conteudo/output/briefing-conteudo.md` — tom de voz, ICP, referência visual
- `squads/luqz-conteudo/output/copy-slides.md` — copy final slide a slide
- `squads/luqz-conteudo/pipeline/data/visual-identity.md` — Regras OBRIGATÓRIAS de identidade visual da marca

## Instructions

### Pré-processo: Prototipagem com Google Stitch (opcional, recomendado)

Antes de escrever a direção visual, use o [Google Stitch](https://stitch.withgoogle.com/) para prototipar o sistema visual quando:
- O briefing pede estilo visual novo ou não familiar
- Há incerteza sobre composição do slide de hook ou CTA
- O cliente não tem brand guideline definida

**Como usar:**
1. Acesse stitch.withgoogle.com (conta Google gratuita)
2. Descreva o carrossel em linguagem natural: _"Instagram carousel, [estilo], [paleta], [tema]"_
3. Itere até validar o sistema visual (paleta, tipografia, ritmo)
4. Use o protótipo como referência para a direção visual escrita

### Process

1. **Defina o sistema visual do carrossel**: Antes de slide a slide, estabeleça a identidade visual do conjunto:
   - Paleta de 3 cores (primária, secundária, acento)
   - Tipografia (fonte para título, fonte para texto)
   - Estilo de imagem (fotografia real, ilustração, sem imagem, padrão geométrico)
   - Proporção (4:5 portrait para Instagram, 1:1 quadrado)

2. **Garanta coesão**: O sistema visual definido no início se aplica a TODOS os slides. Não varia tipografia, não muda paleta.

3. **Especifique cada slide individualmente**: Para cada slide do copy, defina:
   - Cor de fundo (da paleta definida)
   - Imagem sugerida (descrição objetiva e precisa — será usada como prompt para geração ou busca)
   - Palavras para destacar em acento
   - Posição do texto (centrado, terço inferior, etc.)
   - Variação de fundo (claro / escuro / acento) para criar ritmo
   - **Gerar imagem agora?** (`sim` / `não`) — se sim, acionar skill `nano-banana-2` com a descrição da imagem

4. **Slide de CTA é diferente**: Fundo em cor de acento ou cor totalmente distinta. Texto grande. Mínimo de elementos visuais.

5. **Crie ritmo visual**: Alterne fondos claro/escuro ao longo dos slides para evitar monotonia visual.

## Output Format

```markdown
# Direção Visual — [Tema Central]

## Sistema Visual do Carrossel

- **Cor primária:** [hex] — usada em títulos e elementos principais
- **Cor secundária:** [hex] — usada em fundos e suportes
- **Cor de acento:** [hex] — usada em destaques e CTA
- **Fonte título:** [nome da fonte] — Bold
- **Fonte texto:** [nome da fonte] — Regular
- **Estilo de imagem:** [fotografia real / ilustração / padrão geométrico / sem imagem]
- **Proporção:** [4:5 portrait / 1:1 quadrado]

---

## Slide 1 — Hook
- **Fundo:** [cor primária / secundária / acento — hex]
- **Imagem:** [descrição objetiva da imagem ideal]
- **Imagem gerada:** [sim — `output/images/ref-slide-1.png` / não]
- **Destaque em acento:** [palavras específicas do título]
- **Layout:** [centrado / terço inferior / terço superior]
- **Variação:** [claro / escuro]

## Slide 2 — [papel]
[mesma estrutura...]

[... repetir para todos os slides ...]

## Slide [N] — CTA
- **Fundo:** [cor de acento ou distinta — hex — DIFERENTE de todos os outros]
- **Imagem:** [sem imagem / imagem de fechamento]
- **Destaque:** [CTA inteiro em negrito]
- **Layout:** centrado, título grande
- **Variação:** contraste máximo
```

## Veto Conditions

Rejeitar e refazer se:
1. Sistema visual não for definido antes dos slides individuais
2. Tipografia ou paleta variar entre slides
3. Slide de CTA não tiver fundo claramente diferente dos demais
4. Algum slide não tiver os 4 campos: Fundo / Imagem / Destaque / Layout
5. Direção visual não cobrir todos os slides do copy (mesma contagem)

## Quality Criteria

- [ ] Sistema visual definido com 3 cores + 2 fontes antes dos slides
- [ ] Todos os slides cobertos com a mesma estrutura de campos
- [ ] Fundos alternando claro/escuro para criar ritmo visual
- [ ] Slide de CTA tem fundo e layout claramente distintos
- [ ] Nenhuma variação de fonte ou paleta entre slides
- [ ] Imagens descritas de forma objetiva (não "imagem bonita")
