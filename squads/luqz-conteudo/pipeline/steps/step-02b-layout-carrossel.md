# Step 02b — Layout de Carrossel

> **Agente:** Lucas Protótipo
> **Condição:** Executar apenas para carrosseis complexos (7+ slides, narrativa não-linear, ou quando cliente precisar aprovar estrutura antes do copy)
> **Tipo:** agent
> **Depends on:** Step 02 (Tema e Objetivo Estratégico aprovado)
> **Passes to:** Step 03 (Estrutura do Conteúdo) — layout-spec.md alimenta Clara Copy

---

## Objetivo

Definir a estrutura visual do carrossel antes que Clara Copy escreva o texto. Isso resolve um problema real: Clara escreve copy que não cabe no layout, ou o Caetano precisa adaptar o layout para um copy que já foi aprovado. Com o layout-spec definido antes, copy e execução ficam alinhados desde o início.

---

## Quando acionar

| Situação | Acionar? |
|----------|---------|
| Carrossel com 7+ slides | ✅ Sim |
| Narrativa não-linear (flashback, comparação, antes/depois) | ✅ Sim |
| Cliente precisa aprovar estrutura visual antes de investir em copy | ✅ Sim |
| Carrossel novo para cliente sem histórico de aprovação visual | ✅ Sim |
| Post simples (1–4 slides) com estrutura padrão LUQZ | ❌ Não — ir para step-03 |
| Segundo carrossel do mesmo formato já aprovado | ❌ Não — reusar estrutura anterior |

---

## Inputs Obrigatórios

| Arquivo | Caminho |
|---------|---------|
| Tema e objetivo do conteúdo | `squads/luqz-conteudo/output/tema-objetivo.md` |
| Sistema visual do cliente | `clientes/[cliente]/design/sistema-visual.md` |
| Direção visual | `clientes/[cliente]/design/direcao-visual.md` |
| Briefing de conteúdo | `clientes/[cliente]/briefings/briefing-conteudo.md` |

---

## Execução

Lucas Protótipo:

1. Lê todos os inputs obrigatórios
2. Define a narrativa visual do carrossel: qual é o arco (problema → causa → solução → CTA)
3. Distribui o arco pelos slides: quantos slides por seção, qual papel cada slide tem
4. Especifica a estrutura visual de cada slide: tipo de layout, posição dos elementos, hierarquia
5. Gera `layout-spec.md` com a especificação completa
6. Sinaliza onde copy ficará mais longo/curto para Clara Copy adaptar

---

## Output

| Arquivo | Caminho |
|---------|---------|
| Layout spec do carrossel | `squads/luqz-conteudo/output/layout-spec.md` |

---

## Como Clara Copy usa o layout-spec

Clara Copy recebe o `layout-spec.md` junto com o briefing no Step 03/04. Para cada slide, ela sabe:
- Quantos caracteres o campo de título comporta
- Se há espaço para subtítulo ou só headline
- Se o slide é de lista (3–4 bullets) ou de parágrafo
- Qual slide é o CTA (estrutura já fixada — não negociar)

---

## Critério para pular este step

Se o carrossel **não se enquadra nas condições de ativação** — ir direto para Step 03.
Registrar no log do pipeline: `"Step 02b pulado — carrossel padrão sem necessidade de layout-spec prévio."`
