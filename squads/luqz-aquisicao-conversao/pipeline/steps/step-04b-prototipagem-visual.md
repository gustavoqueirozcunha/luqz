# Step 04b — Prototipagem Visual

> **Agente:** Lucas Protótipo
> **Condição:** Executar apenas quando o plano estratégico inclui landing page como ativo
> **Tipo:** agent
> **Depends on:** Step 04 (Plano de Mídia aprovado)
> **Passes to:** Step 05 (Copy dos Ativos) — o protótipo serve de referência para Clara Copy

---

## Objetivo

Transformar o plano estratégico e a identidade visual do cliente em um protótipo HTML de landing page, antes que Copy e Execução comecem. Isso permite:

1. **Aprovar arquitetura visual antes de investir em produção**
2. **Dar a Clara Copy o contexto visual exato de onde o copy vai ser aplicado**
3. **Gerar handoff-dev.md para caso a LP vá para desenvolvimento externo**

---

## Inputs Obrigatórios

| Arquivo | Caminho |
|---------|---------|
| Plano estratégico | `squads/luqz-aquisicao-conversao/output/estrategia-performance.md` |
| Plano de mídia | `squads/luqz-aquisicao-conversao/output/plano-midia.md` |
| Sistema visual do cliente | `clientes/[cliente]/design/sistema-visual.md` |
| Direção visual | `clientes/[cliente]/design/direcao-visual.md` |
| Briefing de design | `clientes/[cliente]/briefings/briefing-design.md` |

---

## Execução

Lucas Protótipo:

1. Lê todos os inputs obrigatórios
2. Mapeia as seções necessárias da landing page com base na jornada do ICP (do plano estratégico)
3. Define estrutura: hero → benefícios/problema → prova social → CTA → formulário
4. Gera protótipo HTML responsivo via Claude Design
5. Sinaliza lacunas de copy com `[COPY PENDENTE: descrição]`
6. Preenche `handoff-dev.md` se a LP for para desenvolvimento
7. Passa para QA Gate (Vera Veredicto) antes de avançar

---

## Outputs

| Arquivo | Caminho | Uso |
|---------|---------|-----|
| Protótipo HTML | `squads/luqz-demanda/output/prototipo-[cliente]-lp.html` | Aprovação visual + referência para Clara Copy |
| Handoff dev (se aplicável) | `clientes/[cliente]/design/handoff-dev.md` | Especificação técnica para dev externo |

---

## Checkpoint de Aprovação

Após geração do protótipo:
- Apresentar a Gustavo para aprovação visual
- Ajustes de estrutura (não de copy) resolvidos aqui
- Após aprovação: Clara Copy recebe o protótipo como referência para escrever copy encaixado na estrutura

---

## Critério para pular este step

Se o plano estratégico **não inclui landing page** como ativo — ir direto para Step 05.
Registrar no log do pipeline: `"Step 04b pulado — LP não prevista neste ciclo."`
