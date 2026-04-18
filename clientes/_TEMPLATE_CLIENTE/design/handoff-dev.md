# Handoff para Desenvolvimento

> **Documento:** Especificação técnica para desenvolvimento de landing page ou site
> **Produzido por:** Lucas Protótipo (prototipagem) + Designer (luqz-design)
> **Formatado por:** Davi Docs (antes de publicar no ClickUp)
> **Destinatário:** Desenvolvedor responsável pela implementação
>
> **Regra:** Este documento só é emitido após protótipo aprovado por Vera Veredicto.

---

## Metadados

| Campo | Valor |
|-------|-------|
| **Cliente** | |
| **Projeto** | ex: Landing Page AP360 / Site Institucional |
| **Versão** | v1.0 |
| **Data** | |
| **Responsável pelo design** | |
| **Responsável pelo dev** | |
| **Prazo de desenvolvimento** | |

---

## 1. Visão Geral

**Objetivo da página:**
_O que o visitante deve fazer ao chegar nesta página?_

**Micro-conversão:**
_ex: preencher formulário de agendamento_

**Macro-conversão:**
_ex: tornar-se cliente_

**URL de destino (se existente):**

---

## 2. Grid e Layout

| Campo | Valor |
|-------|-------|
| **Largura máxima do container** | ex: 1200px |
| **Colunas (desktop)** | ex: 12 colunas, gap 24px |
| **Colunas (mobile)** | ex: 1 coluna, padding 16px |
| **Breakpoints** | Mobile: 375px / Tablet: 768px / Desktop: 1280px |
| **Espaçamento entre seções** | ex: 80px desktop / 48px mobile |

---

## 3. Tipografia

| Elemento | Fonte | Peso | Tamanho Desktop | Tamanho Mobile | Cor |
|----------|-------|------|-----------------|----------------|-----|
| H1 | | | px | px | #hex |
| H2 | | | px | px | #hex |
| H3 | | | px | px | #hex |
| Parágrafo | | | px | px | #hex |
| Caption | | | px | px | #hex |
| CTA (botão) | | | px | px | #hex |

**Fonte carregada via:** [ ] Google Fonts [ ] Adobe Fonts [ ] Self-hosted
**URL / import:** 

---

## 4. Paleta de Cores

| Variável | Hex | Uso |
|----------|-----|-----|
| `--color-primary` | # | Ação principal, CTAs |
| `--color-secondary` | # | Elementos de suporte |
| `--color-accent` | # | Destaques, tags |
| `--color-bg` | # | Fundo padrão |
| `--color-bg-alt` | # | Fundo alternado (seções) |
| `--color-text` | # | Texto principal |
| `--color-text-muted` | # | Texto secundário, captions |
| `--color-border` | # | Bordas, separadores |

---

## 5. Componentes

### 5.1 Botão (CTA)

| Estado | Cor de fundo | Cor do texto | Borda | Border radius | Padding |
|--------|-------------|-------------|-------|---------------|---------|
| Default | # | # | | px | px px |
| Hover | # | # | | px | |
| Active | # | # | | px | |
| Disabled | # | # | | px | |

**Tipografia do botão:** Fonte — Peso — Tamanho px — Uppercase? [ ] Sim [ ] Não

---

### 5.2 Hero Section

| Campo | Valor |
|-------|-------|
| **Altura** | ex: 100vh / 680px desktop / auto mobile |
| **Background** | [ ] Cor sólida: # [ ] Gradiente: [ ] Imagem: |
| **Overlay** | [ ] Não [ ] Sim: cor # / opacidade % |
| **Alinhamento do texto** | [ ] Esquerda [ ] Centro [ ] Direita |
| **CTA posição** | |

---

### 5.3 Formulário

| Campo | Tipo | Obrigatório | Placeholder |
|-------|------|-------------|-------------|
| | text | [ ] | |
| | email | [ ] | |
| | tel | [ ] | |
| | select | [ ] | |
| | textarea | [ ] | |

**Validação:** [ ] Client-side (JS) [ ] Server-side [ ] Ambos
**Destino do formulário:** [ ] Webhook N8N: URL [ ] Formulário nativo: [ ] Outro:
**Mensagem de sucesso:** 
**Mensagem de erro:**

---

### 5.4 Seções da Página

| Ordem | Nome da Seção | Componente | Background | Observações |
|-------|--------------|-----------|-----------|-------------|
| 1 | Hero | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | CTA final | | | |

---

## 6. Assets

| Asset | Formato | Dimensão | Caminho / URL | Observações |
|-------|---------|----------|--------------|-------------|
| Logo | SVG / PNG | | | |
| Imagem hero | JPG / WebP | px × px | | |
| Ícones | SVG | 24px | | |
| Foto do especialista | JPG / WebP | px × px | | |

**Formatos de imagem para web:** Usar WebP com fallback JPG.
**Lazy loading:** Aplicar em todas imagens abaixo do fold.

---

## 7. Comportamentos e Animações

| Elemento | Comportamento | Trigger | Duração |
|----------|-------------|---------|---------|
| Hero CTA | Scroll suave | Click | — |
| Cards | Fade in | Scroll into view | 300ms |
| | | | |

**Animações complexas (JS necessário):** [ ] Sim — descrever: [ ] Não

---

## 8. SEO e Meta

| Campo | Valor |
|-------|-------|
| **Title tag** | |
| **Meta description** | |
| **OG Image** | (1200×630px) |
| **Canonical URL** | |
| **Google Analytics / GTM** | ID: |
| **Meta Pixel** | ID: |
| **Schema markup** | [ ] Não [ ] Sim: tipo ___ |

---

## 9. Performance e Técnico

| Requisito | Especificação |
|-----------|-------------|
| **Hosting** | |
| **Framework / stack** | ex: HTML/CSS puro / Next.js / WordPress |
| **CMS necessário** | [ ] Não [ ] Sim: |
| **Formulário via** | ex: Webhook N8N / Typeform embed |
| **Core Web Vitals alvo** | LCP < 2.5s / CLS < 0.1 / FID < 100ms |
| **Certificado SSL** | Obrigatório |

---

## 10. Protótipo de Referência

**Protótipo gerado por Lucas Protótipo:**
_Colar link ou caminho do arquivo de protótipo HTML aprovado_

**Arquivo:** `squads/luqz-demanda/output/prototipo-[cliente]-[projeto].html`

**Versão aprovada por Vera Veredicto:** [ ] Sim — data: ____ [ ] Não — não iniciar dev

---

## Checklist de Entrega para Dev

- [ ] Grid e breakpoints definidos
- [ ] Tipografia completa (fontes, pesos, tamanhos por elemento)
- [ ] Paleta de cores com variáveis CSS
- [ ] Todos os componentes especificados
- [ ] Assets listados com formato e dimensão
- [ ] Seções da página mapeadas em ordem
- [ ] Formulário com destino definido
- [ ] Meta tags preenchidas
- [ ] Protótipo aprovado anexado
- [ ] Davi Docs formatou e publicou no ClickUp

**Nenhum desenvolvimento começa sem este checklist completo.**
