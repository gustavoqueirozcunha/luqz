---
execution: inline
agent: estela-estrategia
inputFile: squads/luqz-aquisicao-conversao/output/briefing-cliente.md
outputFile: squads/luqz-aquisicao-conversao/output/estrategia-performance.md
---

# Step 02: Estratégia de Performance

## Context Loading

Load these files before executing:
- `squads/luqz-aquisicao-conversao/output/briefing-cliente.md` — Briefing completo do cliente com produto, ICP, objetivo, orçamento e histórico
- `squads/luqz-aquisicao-conversao/pipeline/data/domain-framework.md` — Framework de performance e conversão
- `squads/luqz-aquisicao-conversao/pipeline/data/quality-criteria.md` — Critérios de qualidade da LUQZ
- `_opensquad/_memory/company.md` — Contexto e princípios da LUQZ

## Instructions

### Process

1. **Ler o briefing do cliente**: Absorver todas as informações disponíveis — produto, ICP, objetivo declarado, orçamento, histórico. Identificar o que falta e notar como premissa a ser validada, não como bloqueio.

2. **Diagnosticar o gargalo do funil**: Com base no histórico e objetivo, identificar onde o funil está quebrando. É na geração de tráfego? Na conversão da landing page? No processo comercial? Nomear o gargalo com especificidade.

3. **Definir o objetivo de conversão**: Para cada ativo que será produzido, definir:
   - Micro-conversão (ação imediata esperada)
   - Macro-conversão (resultado de negócio esperado)
   - Taxa de conversão alvo com benchmark de referência do setor

4. **Mapear a jornada do ICP**: Do primeiro contato com o conteúdo/anúncio até o fechamento. Cada ativo tem um papel nessa jornada — nomear qual.

5. **Listar os ativos a produzir**: Em ordem de prioridade (o ativo que desbloqueia os outros vai primeiro). Para cada ativo: nome, função no funil, etapa do ICP, métrica de sucesso.

6. **Documentar riscos e mitigações**: Identificar 2–3 riscos reais (capacidade de atendimento, prazo de produção, dependência de terceiros) com mitigação proposta.

## Output Format

```markdown
# Plano Estratégico de Performance — [Nome do Cliente]
**Data:** [data]
**Estrategista:** Estela Estratégia

---

## Diagnóstico
**Gargalo identificado:** [diagnóstico específico com dado ou observação]

---

## Objetivo de Conversão
- **Micro-conversão:** [ação imediata] → Meta: [% ou volume]
- **Macro-conversão:** [resultado de negócio] → Meta: [% ou volume]
- **Benchmark de referência:** [dado do setor para o tipo de ativo]

---

## Ativos a Produzir

| Ativo | Função no Funil | Etapa do ICP | Métrica de Sucesso |
|---|---|---|---|
| [ativo] | [função] | [etapa] | [métrica] |

---

## Jornada do ICP
[Mapa narrativo do primeiro contato até o fechamento]

---

## Sequência de Produção Recomendada
1. [Ativo 1] — [justificativa de prioridade]
2. [Ativo 2] — [justificativa]
...

---

## Riscos e Mitigações
- **Risco:** [risco específico] → **Mitigação:** [ação concreta]
```

## Output Example

```markdown
# Plano Estratégico de Performance — Studio Conta
**Data:** 2026-04-06
**Estrategista:** Estela Estratégia

---

## Diagnóstico
**Gargalo identificado:** O cliente tem presença orgânica no Instagram com 4.200 seguidores e taxa de engajamento de 6,8%, mas não possui ativo de conversão — não há link de destino, formulário ou página que transforme seguidor em lead. Todo o esforço de conteúdo está gerando audiência sem gerar oportunidades comerciais.

---

## Objetivo de Conversão
- **Micro-conversão:** Seguidor → Clique no link da bio → Preenchimento de formulário de pré-diagnóstico → Meta: 1,5% dos seguidores ativos/mês (≈ 63 novos leads/mês)
- **Macro-conversão:** Lead → Contratação de serviço de contabilidade → Meta: 25% de conversão (≈ 16 novos clientes/mês)
- **Benchmark de referência:** Taxa de conversão de LP para serviços de contabilidade: 1,8–3,2% (Unbounce Industry Report 2025)

---

## Ativos a Produzir

| Ativo | Função no Funil | Etapa do ICP | Métrica de Sucesso |
|---|---|---|---|
| Landing page de pré-diagnóstico gratuito | Captura e qualificação de leads | Decisão | 2% de conversão de visitante |
| Carrossel Instagram — Problema (3 peças) | Educação e qualificação do ICP | Consciência | Taxa de salvamento > 4% |
| Estático — CTA direto (2 variações) | Drive de tráfego para a LP | Conversão | CTR > 2,5% |
| Roteiro Reel 30s — Gancho de problema | Alcance e qualificação inicial | Consciência | Retenção > 60% |

---

## Jornada do ICP
Empresário pequeno (MEI ou ME) vê Reel sobre "erro mais comum na contabilidade de quem está crescendo" → se identifica → segue o perfil → vê carrossel aprofundando o problema → acumula confiança ao longo de 2–3 semanas → vê estático com CTA direto → clica no link da bio → acessa landing page → preenche formulário de pré-diagnóstico → recebe contato em até 24h → contrata.

---

## Sequência de Produção Recomendada
1. **Landing page + formulário** — Infraestrutura de conversão. Sem isso, nenhum outro ativo gera resultado.
2. **Estático de CTA** — Alavanca o tráfego orgânico existente imediatamente.
3. **Roteiro Reel** — Expande o alcance e qualifica novos seguidores.
4. **Carrosseis de problema** — Nutrição de médio prazo para seguidor que ainda está na fase de consciência.

---

## Riscos e Mitigações
- **Risco:** Time de atendimento não preparado para volume adicional de leads → **Mitigação:** Começar com formulário que coleta informações de qualificação (segmento, faturamento) para filtrar antes do primeiro contato.
- **Risco:** Produção do Reel dependente de disponibilidade do cliente para gravar → **Mitigação:** Produzir todos os outros ativos primeiro; Reel entra na semana 2 após validação da LP.
```

## Veto Conditions

Reject and redo if ANY of these are true:
1. Nenhum gargalo específico identificado — "cliente precisa crescer" não é diagnóstico.
2. Ativos listados sem função no funil ou métrica de sucesso definida.
3. Jornada do ICP não conecta o primeiro contato ao fechamento de forma lógica.
4. Sequência de produção sem justificativa de prioridade.

## Quality Criteria

- [ ] Gargalo identificado com especificidade (dado ou observação concreta)
- [ ] Cada ativo tem função, etapa do ICP e métrica de sucesso
- [ ] Jornada do ICP mapeada do topo ao fechamento
- [ ] Sequência de produção justificada por lógica de desbloqueio
- [ ] Benchmarks de referência do setor incluídos
- [ ] Riscos identificados com mitigação concreta
