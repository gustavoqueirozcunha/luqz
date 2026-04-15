---
name: nano-banana-2
description: >
  Generates high-quality images using Nano Banana 2 (Gemini 3.1 Flash).
  Supports 4K resolution, text rendering, green screen transparency,
  reference images for subject/style consistency, and aspect ratio control.
  Ideal for social media content, carousels, and brand-consistent visuals.
description_pt-BR: >
  Gera imagens de alta qualidade usando Nano Banana 2 (Gemini 3.1 Flash).
  Suporta resolução 4K, renderização de texto, fundo transparente (green screen),
  imagens de referência para consistência de sujeito/estilo e controle de proporção.
  Ideal para conteúdo de redes sociais, carrosséis e visuais consistentes com a marca.
type: script
version: "1.0.0"
script:
  path: scripts/generate.sh
  runtime: bash
  invoke: "bash {skill_path}/scripts/generate.sh --prompt \"{prompt}\" --output \"{output}\" --aspect \"{aspect}\""
env:
  - GEMINI_API_KEY
categories: [assets, images, ai, generation, social-media]
repo: https://github.com/kingbootoshi/nano-banana-2-skill
---

# Nano Banana 2 — Image Generation

## When to use

Use Nano Banana 2 when you need to generate images for social media content, carousels, or any visual asset that requires high quality output. This skill uses Gemini 3.1 Flash and produces results suitable for Instagram, LinkedIn, and other platforms.

**Think before generating.** Image generation costs tokens and time. Before generating:
1. Check if a suitable image already exists in the squad's assets folder
2. Only generate when no existing alternative is good enough
3. Generate one image at a time — never batch-generate variations speculatively

## Capabilities

- **4K resolution** — suitable for social media publishing
- **Text rendering** — renders text within images accurately (multi-language)
- **Subject consistency** — can maintain up to 5 characters / 14 objects across images
- **Reference images** — accepts logo, mascot, or style reference for brand consistency
- **Transparency mode** — green screen removal (requires FFmpeg + ImageMagick)
- **Aspect ratios** — `1:1` (feed quadrado), `4:5` (portrait Instagram), `16:9` (landscape)

## Installation

Requires: **Bun**, **Gemini API key**. Optional: FFmpeg + ImageMagick (for transparency mode).

```bash
# Clone the skill repo
git clone https://github.com/kingbootoshi/nano-banana-2-skill skills/nano-banana-2/repo
cd skills/nano-banana-2/repo
bun install

# Set your Gemini API key
export GEMINI_API_KEY=your_key_here
```

## Usage

### Basic generation

```bash
nano-banana-2 --prompt "Mulher de negócios confiante em escritório moderno, luz natural, estilo editorial" \
              --output output/images/slide-1.png \
              --aspect 4:5
```

### With reference image (brand consistency)

```bash
nano-banana-2 --prompt "Logo da LUQZ em fundo branco minimalista" \
              --output output/images/logo-slide.png \
              --reference assets/logo-luqz.png \
              --aspect 1:1
```

### Transparency mode

```bash
nano-banana-2 --prompt "Pessoa apontando para gráfico de crescimento" \
              --output output/images/person-transparent.png \
              --transparent \
              --aspect 4:5
```

## Integration with luqz-conteudo pipeline

This skill is primarily used in:
- **Step 05** (Rafael Roteiro) — gerar imagens de referência visual para cada slide
- **Step 06** (Designer Canva) — gerar imagens finais quando Canva autofill não estiver disponível

### Decision: quando usar vs. image-ai-generator

| Situação | Skill recomendada |
|----------|-------------------|
| Iteração rápida, testar composição | `image-ai-generator` (modo test) |
| Output final de alta qualidade | `nano-banana-2` |
| Consistência de personagem entre slides | `nano-banana-2` (subject consistency) |
| Texto renderizado dentro da imagem | `nano-banana-2` |
| Fundo transparente | `nano-banana-2` (transparency mode) |

## Output Format

```markdown
## Imagens Geradas — Nano Banana 2

| Slide | Prompt usado | Arquivo | Aspecto |
|-------|-------------|---------|---------|
| Slide 1 | [prompt] | output/images/slide-1.png | 4:5 |
| Slide 3 | [prompt] | output/images/slide-3.png | 4:5 |

**Modelo:** Gemini 3.1 Flash (Nano Banana 2)
**Referência usada:** [sim/não — arquivo]
```

## Anti-Patterns

1. **Gerar imagem para cada slide sem necessidade** — use apenas nos slides que precisam de imagem real
2. **Prompts vagos** — "imagem bonita de negócios" não funciona; descreva composição, sujeito, luz, estilo
3. **Ignorar aspect ratio** — sempre especifique o aspecto correto para a plataforma
