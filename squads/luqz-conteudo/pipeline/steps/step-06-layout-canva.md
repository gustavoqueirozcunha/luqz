---
execution: inline
agent: designer-canva
inputFile: squads/luqz-conteudo/output/direcao-visual.md
outputFile: squads/luqz-conteudo/output/layout-canva.md
skills:
  - canva
  - nano-banana-2
  - image-ai-generator
---

# Step 06: Geração de Layout no Canva

## Context Loading

Carregue antes de executar:
- `squads/luqz-conteudo/output/briefing-conteudo.md` — contexto de marca e referência visual
- `squads/luqz-conteudo/output/copy-slides.md` — copy exato de cada slide (Título / Texto)
- `squads/luqz-conteudo/output/direcao-visual.md` — sistema visual e especificações por slide
- `squads/luqz-conteudo/pipeline/data/visual-identity.md` — REFERÊNCIA MESTRA. Sobrescreve as regras de fonte/cor para imposição estrita no layout final.

## Instructions

### Decisão de Modo

**Verifique se o skill `canva` está ativo:**
- Se sim → execute Modo 2 (Integração MCP)
- Se não → execute Modo HTML (Geração de Código Visual Perfeito em HTML)

### Geração de Imagens para os Slides

Antes de executar o layout, verifique em `direcao-visual.md` se algum slide tem `Imagem gerada: não` mas precisa de fotografia real.

**Decisão de geração de imagem:**
| Situação | Ação |
|----------|------|
| Imagem já gerada por Rafael (ref-slide-N.png) | Usar diretamente |
| Slide com fotografia de pessoa/produto, alta qualidade | Acionar `nano-banana-2` |
| Slide com composição simples ou iteração rápida | Acionar `image-ai-generator` (modo test) |
| Slide sem imagem (padrão geométrico ou fundo sólido) | Não gerar |

Salvar imagens geradas em `squads/luqz-conteudo/output/images/slide-[N].png`.

### Modo HTML — Renderização em Código (Fallback Oficial)

Quando o Canva MCP não estiver operante, você DEVE gerar um arquivo HTML completo que unifica todos os slides em blocos `<div class="slide">`, reproduzindo exatamente o design system de `template-reference.html` e a paleta definida em `visual-identity.md`.

Regras de execução:
1. Incorpore a fonte Inter (Google Fonts)
2. Use flexbox para alinhar os slides horizontalmente (`display: flex; gap: 20px;`)
3. Programe 1 div base para cada slide aplicando as variações Dark / Light / Accent conforme a direção visual (Step 05).
4. O Título deve seguir com precisão o Copy original, destacando com `color: var(--accent)` as palavras designadas.
5. Emita o HTML CÓDIGO FONTE FINAL como Saída da sua tarefa.

NUNCA emita mais descrições textuais se a conexão cair, emita o HTML.

### Modo 2 — Integração MCP

Sequência obrigatória:
1. `browse_templates` ou `search_designs` — buscar template adequado ao objetivo do carrossel
2. Selecionar 1 template único para todos os slides
3. Para cada slide: `autofill_template` com Título e Texto do copy-slides.md
4. Para cada slide: `export_design` em PNG (1080x1350px para 4:5 portrait)
5. Documentar: ID do template, slides gerados, URLs de exportação

## Output Format

### Modo HTML

```markdown
# Layout de Carrossel — [Tema Central]
**Modo:** HTML Render (Fallback)

Para visualizar com perfeição tipográfica o carrossel, salve o código abaixo em um arquivo `.html` e abra no navegador:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<!-- Repita exatamente a estrutura do template-reference.html ->
</head>
<body>
<div class="carousel-container">
    <div class="slide dark">
       <!-- Título e Texto Slide 1 -->
    </div>
    <!-- Inserir demais slides -->
</div>
</body>
</html>
```
```

### Modo 2

```markdown
# Layout de Carrossel — [Tema Central]
**Modo:** Integração MCP

## Template Selecionado
- **ID Canva:** [id]
- **Nome:** [nome do template]
- **Justificativa:** [por que escolhido]

## Execução por Slide

| Slide | Papel | Status | Export URL |
|-------|-------|--------|------------|
| Slide 1 | Hook | ✅ Gerado | [url] |
| Slide 2 | [papel] | ✅ Gerado | [url] |
[... todos os slides ...]

## Observações de Execução
[desvios, fallbacks aplicados, limitações encontradas]
```

## Veto Conditions

Rejeitar e refazer se:
1. Templates diferentes usados para slides diferentes
2. Slide de CTA não tiver fundo claramente distinto dos demais
3. Texto inserido divergir do copy-slides.md
4. Modo 2: exportação não gerada para algum slide
5. Slides parecerem visualmente desconectados (paleta ou tipografia diferente)

## Quality Criteria

- [ ] Modo de execução documentado (HTML ou MCP)
- [ ] Script HTML deve possuir tags funcionais e as classes do template reference
- [ ] Copy exato de copy-slides.md inserido nas divs (sem reescrita)
- [ ] Modo 2: exportação PNG documentada para cada slide
