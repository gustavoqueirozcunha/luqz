---
execution: inline
agent: marcio-midia
inputFile: squads/luqz-aquisicao-conversao/output/estrategia-performance.md
outputFile: squads/luqz-aquisicao-conversao/output/plano-midia.md
---

# Step 04: Plano de Mídia

## Context Loading

Load these files before executing:
- `squads/luqz-aquisicao-conversao/output/estrategia-performance.md` — Estratégia aprovada: ICP, ativos definidos, métricas de conversão esperadas
- `squads/luqz-aquisicao-conversao/output/briefing-cliente.md` — Briefing original com orçamento de mídia e contexto do cliente
- `squads/luqz-aquisicao-conversao/pipeline/data/domain-framework.md` — Framework de planejamento de mídia
- `_opensquad/_memory/company.md` — Contexto da LUQZ

## Instructions

### Process

1. **Calcular a viabilidade financeira**: Com base no ticket médio, meta de novos clientes e taxas de conversão esperadas da estratégia, calcular o volume de leads necessários e o CAC máximo tolerável. Documentar o cálculo com memória explícita.

2. **Selecionar canais**: Para cada canal (Meta, Google Search, LinkedIn, YouTube Ads), avaliar:
   - Presença e receptividade do ICP
   - Estimativa de CPL no setor (pesquisa ou benchmark)
   - Compatibilidade com os ativos que serão produzidos
   Selecionar 2–3 canais para fase de teste. Justificar cada inclusão e exclusão.

3. **Distribuir verba**: Definir alocação por canal em valor absoluto e porcentagem, com lógica de fase de teste (mês 1) e escala (mês 2+). Incluir reserva de teste (5–10% da verba).

4. **Definir segmentação por canal**: Para cada canal, especificar público-alvo com parâmetros concretos — cargo, setor, interesse, comportamento, palavra-chave, tamanho de empresa. Não usar "público amplo" sem justificativa.

5. **Montar cronograma de ativação**: Semana a semana no mês 1 — o que sobe quando, quando faz primeira revisão, quando corta o que não funciona.

6. **Definir KPIs e critérios de corte**: Para cada canal, definir CPL alvo, ROAS esperado e critério de corte (se CPL > X em Y dias, pausar segmentação).

## Output Format

```markdown
# Plano de Mídia — [Nome do Cliente]
**Período:** [período]
**Verba total:** R$ [valor]/mês
**Planejador:** Márcio Mídia

---

## Sumário Executivo
**Ticket médio:** R$ [valor]
**CAC tolerável:** R$ [valor] ([%] do ticket)
**Meta de clientes novos/mês:** [N]
**Volume de leads necessários:** [N] (considerando [X]% de conv. LP → lead e [Y]% de conv. lead → cliente)
**CPL máximo tolerável:** R$ [valor]

---

## Distribuição de Verba

| Canal | Verba | % | Objetivo | CPL Estimado | Volume Est. |
|---|---|---|---|---|---|
| [canal] | R$[valor] | [%]% | [objetivo] | R$[cpl] | ~[N] leads |
| **Total** | **R$[total]** | **100%** | | | **~[N] leads** |

---

## Segmentação por Canal

**[Canal 1]:**
- [parâmetros específicos]
- Formato: [formatos de anúncio a usar]

---

## Cronograma de Ativação

| Semana | Ação |
|---|---|
| Semana 1 | [ação] |
| Semana 2 | [ação] |
| Semana 3 | [ação] |
| Semana 4 | [revisão] |

---

## KPIs e Critérios de Decisão

| Métrica | Meta | Critério de Escala | Critério de Corte |
|---|---|---|---|
| CPL médio | R$[valor] | Abaixo de R$[X]: escalar | Acima de R$[Y] em 14 dias: pausar |
| Taxa de conv. LP | [%]% | — | Abaixo de [%]%: revisar LP |
| ROAS | [X]x | Acima de [Y]x: escalar | Abaixo de [Z]x: revisar segmentação |
```

## Output Example

```markdown
# Plano de Mídia — Studio Conta
**Período:** Mês 1 — Fase de Teste
**Verba total:** R$5.000/mês
**Planejador:** Márcio Mídia

---

## Sumário Executivo
**Ticket médio:** R$890/mês (contrato de contabilidade)
**LTV médio (12 meses):** R$10.680
**CAC tolerável:** R$1.068 (10% do LTV)
**Meta de novos clientes/mês:** 8
**Volume de leads necessários:** 320 (considerando 1,5% de conv. LP e 15% de conv. lead → cliente — conservador para mês 1)
**CPL máximo tolerável:** R$15,62 (R$5.000 / 320 leads)

---

## Distribuição de Verba

| Canal | Verba | % | Objetivo | CPL Estimado | Volume Est. |
|---|---|---|---|---|---|
| Meta Ads (Feed + Stories) | R$3.000 | 60% | Leads de MEI e ME em crescimento | R$12–18 | ~195 leads |
| Meta Ads (Retargeting) | R$1.500 | 30% | Reconversão visitantes LP (últimos 14 dias) | R$8–12 | ~155 leads |
| Reserva de teste | R$500 | 10% | Testar 2 variações de criativo e 1 público novo | — | — |
| **Total** | **R$5.000** | **100%** | | | **~350 leads** |

**Por que não LinkedIn ou Google?**
LinkedIn: ICP (pequeno empresário) não está receptivo a compra no LinkedIn — rede profissional não é o ambiente de decisão para esse perfil.
Google Search: volume de busca para "contabilidade para MEI" é relevante (18.000/mês no Brasil), mas CPL estimado de R$35–55 ultrapassa o CAC tolerável. Incluir em mês 2 se LP validar conversão acima de 3%.

---

## Segmentação por Canal

**Meta Ads — Público Frio:**
- Idade: 25–45 anos
- Comportamento: "Proprietário de pequena empresa", "Empreendedor"
- Interesse: "Contabilidade", "Gestão empresarial", "MEI", "Simples Nacional"
- Geo: [Cidade do cliente] + raio de 30km
- Formato: Carrossel de problema (3 slides) + Reel 30s + Estático CTA
- Exclusão: Quem já é seguidor do Instagram

**Meta Ads — Retargeting:**
- Público: Visitantes da landing page nos últimos 14 dias que não converteram
- Formato: Estático com urgência suave ("Ainda pensando? Seu diagnóstico é gratuito.")
- Frequência máxima: 3x por semana por pessoa

---

## Cronograma de Ativação

| Semana | Ação |
|---|---|
| Semana 1 | Subir campanha de público frio com 2 conjuntos de anúncio (carrossel + Reel). Aguardar 7 dias para sair da fase de aprendizado. |
| Semana 2 | Ativar retargeting. Analisar CPL por conjunto de anúncio. |
| Semana 3 | Pausar conjuntos com CPL > R$20. Testar estático vs. carrossel no público com melhor CPL. |
| Semana 4 | Revisão completa de mês 1. Definir alocação de mês 2 baseada em dados reais. |

---

## KPIs e Critérios de Decisão

| Métrica | Meta Mês 1 | Critério de Escala | Critério de Corte |
|---|---|---|---|
| CPL médio | < R$15,62 | Abaixo de R$10: escalar em 30% | Acima de R$25 em 14 dias: pausar segmentação |
| Taxa de conv. LP | > 1,5% | Acima de 3%: aumentar verba em 50% | Abaixo de 0,8%: revisar copy da LP |
| ROAS (LTV/CAC) | > 10x | — | Abaixo de 5x no mês 2: rever estratégia |
| Leads gerados | 320 | — | — |
```

## Veto Conditions

Reject and redo if ANY of these are true:
1. CAC tolerável não calculado — plano sem âncora financeira não tem critério de sucesso.
2. Canal proposto sem justificativa baseada no ICP — "porque é popular" não é justificativa.
3. Segmentação genérica ("público amplo", "interesses gerais") sem especificidade.
4. Cronograma sem datas de revisão e critérios de corte definidos.

## Quality Criteria

- [ ] CAC tolerável calculado com memória de cálculo explícita
- [ ] Canais não incluídos têm justificativa de exclusão
- [ ] Segmentação específica por canal (não genérica)
- [ ] Verba em valor absoluto e porcentagem
- [ ] Volume estimado de leads coerente com meta de clientes
- [ ] Cronograma de ativação semana a semana com ações específicas
- [ ] Critérios de corte e escala numéricos por canal
