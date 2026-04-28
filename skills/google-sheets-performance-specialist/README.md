# google-sheets-performance-specialist

> Skill especialista em Google Sheets aplicado a agências de tráfego pago e funis de marketing/vendas.
> Corrige fórmulas quebradas, escreve cálculos de performance e estrutura dashboards executivos — sempre em cima da planilha que o usuário já tem, nunca reinventando do zero.

---

## Para que serve

Em performance paga, 80% das decisões passam por uma planilha. Quando ela quebra (`#DIV/0!`, `#REF!`, CPL invertido, ROAS fantasma), o gestor deixa de pilotar o funil às cegas. Esta skill existe para resolver esse atrito em segundos, sem a agência precisar parar para abrir ticket com time de dados.

Ela atua em quatro frentes:

1. **Debug** — diagnosticar e corrigir fórmulas que estão retornando erro.
2. **Cálculo** — escrever fórmulas novas para CPL, CPC, CTR, ROAS, ticket médio, pacing, projeção linear, taxa de conversão entre etapas.
3. **Consolidação** — juntar dados de Meta Ads + Google Ads + CRM em uma tabela única via `QUERY`, `FILTER`, `ARRAYFORMULA`.
4. **Estrutura** — orientar a montagem de dashboards executivos (estilo Cockpit LUQZ) com KPIs de topo, pacing, funil e quebra por canal.

---

## Quando acionar

Bons gatilhos:

- "Minha fórmula de CPL está dando `#DIV/0!` em mês sem campanha"
- "Como calculo o ritmo da meta no dashboard?"
- "Preciso consolidar Meta e Google na mesma aba"
- "Qual a fórmula de taxa de conversão entre MQL e SQL?"
- "Meu `PROCV` está retornando `#N/A` mesmo tendo a chave"
- "Quero projetar vendas do mês com base no ritmo atual"

Maus gatilhos (não é caso para esta skill):

- Automações em Apps Script — usar skill específica de automação.
- Power BI / Looker / Metabase — BI externo, sintaxe diferente.
- Excel com VBA — Google Sheets não executa VBA.

---

## O que a skill entrega

Toda resposta é estruturada em **5 seções fixas**:

| # | Seção | O que contém |
|---|-------|--------------|
| 1 | Diagnóstico | O que está quebrado e por quê, em 1-3 frases |
| 2 | Fórmula corrigida | Bloco pronto para copiar e colar |
| 3 | Explicação simples | Por que a fórmula funciona (lógica, não documentação) |
| 4 | Possíveis erros futuros | Cenários que ainda podem quebrar a fórmula |
| 5 | Sugestão opcional | Refactor ou extensão — sempre rotulada como opcional |

Esse contrato é inegociável: se uma seção for pulada, a resposta está incompleta.

---

## Princípios operacionais

1. **Diagnóstico antes de prescrição** — nunca responder sem modelo mental da tabela.
2. **Preservar a estrutura do usuário** — refactor é sugestão, não caminho único.
3. **Fórmula pronta para colar** — intervalos concretos, não placeholders vazios.
4. **Blindagem contra dado ruim** — todo cálculo é resiliente a vazio/zero/texto.

---

## Arquivos

| Arquivo | Função |
|---------|--------|
| `SKILL.md` | Documentação principal — comportamento, biblioteca de fórmulas, playbook de debugging |
| `exemplos.md` | Casos práticos com input do usuário e output completo no formato de 5 seções |
| `README.md` | Este arquivo — visão geral e quando usar |

---

## Fórmulas centrais (amostra)

Para a biblioteca completa, ver `SKILL.md`. Amostra:

```
# Divisão segura (base de tudo)
=SEERRO(numerador/denominador; 0)

# Pacing (ritmo de meta dentro do mês)
=SEERRO( (DIA(HOJE())/DIA(FIMMÊS(HOJE();0))) * Meta; 0)

# Projeção linear de fechamento
=SEERRO( Realizado / (DIA(HOJE())/DIA(FIMMÊS(HOJE();0))); 0)

# Taxa de conversão entre etapas
=SEERRO(EtapaN/EtapaAnterior; 0)

# PROCV com proteção
=SEERRO(PROCV(chave; tabela; col; FALSO); "—")
```

---

## Restrições

- Não recomenda "refaz do zero" como solução principal.
- Não entrega resposta sem fórmula pronta.
- Não inventa nomes de colunas — pergunta ou usa placeholder explícito.
- Não simplifica lógica de negócio por conveniência.

---

## Integrações com o sistema LUQZ

- **Padrão estético de dashboards**: segue a estética LUQZ (minimalismo Apple/Stripe/Linear — ver `CLAUDE.md §4`).
- **Compatível com Cockpit LUQZ**: a hierarquia de 5 níveis (KPIs → pacing → funil → canais → séries) está alinhada ao cockpit institucional.
- **Não conflita com skills de BI/visualização**: esta skill termina no Sheets; se a entrega final for Canva, Looker ou gráfico estático, o hand-off acontece depois.

---

> v1.0.0 · Abril 2026 · Sistema LUQZ
