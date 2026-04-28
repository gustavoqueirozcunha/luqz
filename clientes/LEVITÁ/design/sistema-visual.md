# Sistema Visual — LEVITÁ

> **Instrução:** Este documento é o "Style Guide" técnico. Todas as peças criadas devem obedecer estritamente às variáveis definidas aqui.
> **Pivô de branding aprovado em 27/04/2026** — paleta anterior (verde/neutros) substituída pela direção quente/apetitosa.
> **⚠️ STATUS 28/04/2026: ID Visual em revisão — NÃO aprovada. Logo em ajuste. Não usar este documento para produção até nova versão aprovada.**

## 1. Tipografia Principal

- **Tipografia Primária — Display/Logo (Títulos/Capas):** Cormorant Garamond
  - Peso padrão: Bold (logo e H1 capas)
  - Caixa: Mista — versalete para logo, título case para H1
  - Tracking: +20 a +40 (abertura levemente ampliada)
- **Tipografia Secundária — Corpo/Detalhes:** DM Sans
  - Peso padrão: Medium (H2 subtítulos) | Regular (corpo) | Light (caption)
  - Entrelinhas (Line-height): 140% corpo | 120% títulos

## 2. Paleta de Cores

| Nome | HEX | Uso |
|------|-----|-----|
| **Vermelho LEVITÁ** | `#D72B2B` | Cor principal — logo, fundos de destaque, CTAs primários |
| **Laranja Braseiro** | `#E8622A` | Apoio quente — gradientes com vermelho, ícones de destaque |
| ~~**Amarelo Açafrão**~~ | ~~`#F0A500`~~ | **⛔ BLOQUEADO** — associação negativa com projeto anterior "Cupim". Não usar. |
| **Terracota** | `#C04B2D` | Fundos alternativos — mais sofisticado e profundo que o vermelho puro |
| **Off-White Leite** | `#F9F4EE` | Fundo principal de peças "limpas" — contraste com vermelho |
| **Bege Manteiga** | `#EDE0CC` | Backgrounds de cards, fundo de stories descritivos |
| **Marrom Canela** | `#7A4B35` | Texto sobre fundos claros, detalhes texturizados |
| **Preto Fumaça** | `#1A1108` | Texto corrido e títulos sobre fundo claro — nunca preto puro |

**Regra de ouro:** máximo 3 cores por peça. Vermelho LEVITÁ + Off-White Leite é a combinação principal.

### Combinações Aprovadas

| Combo | Composição | Uso |
|-------|-----------|-----|
| **Principal** | Fundo `#D72B2B` + Texto `#F9F4EE` + Detalhe `#F0A500` | Posts de lançamento, capas de stories, CTA direto |
| **Quente Sutil** | Fundo `#F9F4EE` + Bloco `#E8622A` + Texto `#1A1108` | Carrossel de produto, cardápio visual, posts informativos |
| **Premium Terroso** | Fundo `#C04B2D` + Texto `#EDE0CC` + Detalhe `#7A4B35` | Posts institucionais, bastidor, credibilidade |
| **Foco no Produto** | Fundo `#EDE0CC` + foto em close + bloco `#D72B2B` na base | Produto único, prato do dia |

## 3. Hierarquia e Grid (1080x1350px)

- **H1 (Título da Capa):** 90px – 120px. Cormorant Garamond Bold. Máximo 4 linhas.
- **H2 (Subtítulo/Apoio):** 44px – 56px. DM Sans Medium.
- **Corpo do texto:** 32px – 38px. DM Sans Regular.
- **Caption:** 22px – 26px. DM Sans Light.
- **Margens:** Mínimo 80px de respiro em todas as bordas.
- **Alinhamento:** esquerda como padrão; centralizado apenas em capas e CTAs.

## 4. Padrões de Componentes

- **Fundos:** Vermelho LEVITÁ ou Off-White Leite como padrão. Terracota como variação premium.
- **Sombras:** Muito suaves (`blur: 40px, spread: -10, opacity: 8-12%`). Nunca sombra dura.
- **Tags e rótulos:** Fundo Vermelho LEVITÁ, texto Off-White Leite, border-radius 4px.
- **CTAs:** Fundo Vermelho LEVITÁ, texto Off-White Leite, bordas arredondadas. Alternativa: fundo Amarelo Açafrão, texto Preto Fumaça.
- **Ícones:** Traço fino (1-2px), estilo linear minimalista.

## 5. Diretrizes de Contraste

- Texto Off-White Leite sobre Vermelho LEVITÁ: ✅ aprovado (contraste alto)
- Texto Preto Fumaça sobre Off-White Leite: ✅ aprovado
- Texto Off-White Leite sobre Terracota: ✅ aprovado
- Texto sobre foto: aplicar Gradient Overlay Terracota/Vermelho de 0 a 70%
- Textos brancos: fundo com mínimo 70% de escuridão

## 6. Logo e Marca

- **Sobre fundo escuro (Vermelho LEVITÁ / Terracota):** logo em Off-White Leite (`#F9F4EE`)
- **Sobre fundo claro (Off-White / Bege):** logo em Vermelho LEVITÁ (`#D72B2B`)
- **Posicionamento nos Criativos:** canto superior esquerdo (padrão) | centralizado em capas institucionais
- **Tamanho mínimo digital:** 120px de largura
- **Tamanho mínimo impresso:** 25mm de largura
- **Área de proteção:** espaço equivalente à altura da letra "L" em todos os lados

## 7. Diretrizes de Fotografia

- **Temperatura de cor:** 3200K–4000K — iluminação quente e dourada, nunca luz fria/azulada
- **Enquadramento:** close extremo sobre o prato — textura, vapor, molho, cor da proteína em evidência
- **Fundo:** superfícies de contexto real — madeira, pedra, tecido rústico. Nunca fundo branco sem intenção.
- **Cor dominante na foto:** o prato deve ter tons quentes visíveis (vermelho de molho, dourado de grelhado, laranja de batata-doce)
- **Âncora humana:** mão ou pessoa parcial em cena — não foto de vitrine
- **Filtro:** nenhum filtro dessaturado ou frio. Preservar (ou reforçar) tons quentes no pós-processamento
