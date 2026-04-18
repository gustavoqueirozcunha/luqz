---
name: claude-design
description: >
  Prototipagem visual e especificação de layout via Claude. Gera wireframes HTML/CSS,
  protótipos interativos e especificações técnicas prontas para handoff de desenvolvimento
  ou execução no Canva.
description_pt-BR: >
  Prototipagem visual e especificação de layout via Claude. Gera wireframes HTML/CSS,
  protótipos interativos e especificações técnicas prontas para handoff de desenvolvimento
  ou execução no Canva.
type: native
version: "1.0.0"
categories: [design, prototyping, layout, handoff, landing-page]
---

# Claude Design — Prototipagem Visual

## O que é

Claude Design é a capacidade nativa do Claude de criar protótipos visuais como artefatos HTML/CSS — wireframes, layouts de landing page, estruturas de carrossel e especificações técnicas de design — diretamente no fluxo de trabalho, sem ferramentas externas.

Não substitui o Canva (execução final) nem o Designer (direção de arte). **É a ponte entre estratégia e execução visual.**

---

## Quando usar

| Situação | Usar Claude Design? |
|----------|-------------------|
| Landing page ou site precisa de wireframe antes da execução | ✅ Sim |
| Carrossel complexo precisa de estrutura visual antes do copy | ✅ Sim |
| Briefing de design precisa de referência visual para o cliente aprovar | ✅ Sim |
| Handoff para desenvolvedor externo — especificação técnica necessária | ✅ Sim |
| Post estático simples com sistema visual já definido | ❌ Não — ir direto para Caetano Executor |
| Reel cover com direção visual pronta | ❌ Não — ir direto para Caetano Executor |
| Direção de arte (decidir paleta/identidade) | ❌ Não — usar Designer (luqz-design) |

---

## Onde entra no fluxo LUQZ

```
[Estela — Plano Estratégico]
         ↓
[Lucas Protótipo — PROTOTIPAGEM]    ← Claude Design atua aqui
  Inputs: plano estratégico + briefing de design + sistema visual do cliente
  Outputs:
    → Protótipo HTML da landing page (para aprovação visual)
    → layout-spec.md (estrutura de carrossel para Caetano)
    → handoff-dev.md preenchido (para desenvolvimento)
         ↓
[Aprovação visual — Gustavo / Cliente]
         ↓
[Caetano Executor — Execução Canva]  ← recebe layout-spec.md
   ou
[Desenvolvedor — Implementação]      ← recebe handoff-dev.md
```

---

## Tipos de output gerados

### 1. Protótipo HTML de Landing Page
- Arquivo HTML/CSS auto-contido (sem dependências externas)
- Responsivo (mobile + desktop)
- Fiel à paleta, tipografia e identidade do cliente
- Interativo (scroll, hover states, formulário mockado)
- **Formato de saída:** artefato HTML inline no chat

### 2. Layout Spec de Carrossel (`layout-spec.md`)
- Estrutura visual slide a slide
- Especifica: dimensão, grid, posição de elementos, hierarquia tipográfica
- Não contém copy — recebe copy do step anterior
- Alimenta diretamente Caetano Executor
- **Formato de saída:** arquivo `.md` em `squads/luqz-conteudo/output/layout-spec.md`

### 3. Handoff para Desenvolvimento (`handoff-dev.md`)
- Preenche o template `clientes/[cliente]/design/handoff-dev.md`
- Inclui: grid, tipografia, paleta, componentes, assets, meta tags
- Derivado do protótipo aprovado
- **Formato de saída:** arquivo `.md` no caminho do cliente

---

## Inputs obrigatórios

| Input | Fonte | Obrigatório |
|-------|-------|-------------|
| Plano estratégico do cliente | `squads/luqz-aquisicao-conversao/output/estrategia-performance.md` | ✅ Sempre |
| Sistema visual do cliente | `clientes/[cliente]/design/sistema-visual.md` | ✅ Sempre |
| Direção visual | `clientes/[cliente]/design/direcao-visual.md` | ✅ Sempre |
| Briefing de design | `clientes/[cliente]/briefings/briefing-design.md` | ✅ Sempre |
| Copy aprovado | `squads/luqz-conteudo/output/copy-slides.md` | ✅ Para carrossel |
| Objetivo de conversão | (do plano estratégico) | ✅ Sempre |

**Se sistema visual não existe: PARAR. Solicitar criação ao Designer (luqz-design) antes de prototipar.**

---

## Instruções de uso

### Para landing page

```
Criar protótipo HTML de landing page para [cliente].
Inputs carregados:
- Sistema visual: clientes/[cliente]/design/sistema-visual.md
- Direção visual: clientes/[cliente]/design/direcao-visual.md
- Plano estratégico: squads/luqz-aquisicao-conversao/output/estrategia-performance.md
- Briefing: clientes/[cliente]/briefings/briefing-design.md

Entregar:
1. Protótipo HTML responsivo (artefato)
2. handoff-dev.md preenchido em clientes/[cliente]/design/handoff-dev.md
```

### Para estrutura de carrossel

```
Criar layout-spec.md para carrossel de [cliente].
Tema: [tema do carrossel]
Copy disponível em: squads/luqz-conteudo/output/copy-slides.md
Sistema visual: clientes/[cliente]/design/sistema-visual.md

Entregar:
layout-spec.md em squads/luqz-conteudo/output/layout-spec.md
```

---

## Padrões obrigatórios

- **Fidelidade ao sistema visual do cliente** — paleta, tipografia e espaçamentos do `sistema-visual.md` são lei
- **Mobile-first** — protótipos sempre responsivos, começar pelo mobile
- **Hierarquia visual LUQZ** — título > subtítulo > corpo > CTA
- **Zero elementos genéricos** — nenhum ícone flat colorido, nenhuma imagem placeholder com Lorem ipsum
- **Contraste WCAG AA** — mínimo 4.5:1 para todo texto

---

## Restrições

- Claude Design **não substitui o Designer** para decisões de identidade e direção de arte
- Claude Design **não substitui o Canva** para execução final de peças sociais
- Protótipos HTML são **para aprovação e referência** — não são o entregável final para o cliente
- Toda prototipagem passa por **aprovação de Vera Veredicto** antes de ir para execução ou dev

---

## Agente responsável

Este skill é operado pelo agente **Lucas Protótipo**.
Definição completa: `squads/luqz-demanda/agents/lucas-prototipo.agent.md`
