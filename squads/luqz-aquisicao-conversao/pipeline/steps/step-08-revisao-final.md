---
execution: inline
agent: vera-veredicto
inputFile: squads/luqz-aquisicao-conversao/output/copy-ativos.md
outputFile: squads/luqz-aquisicao-conversao/output/revisao-final.md
---

# Step 08: Revisão Final

## Context Loading

Load these files before executing:
- `squads/luqz-aquisicao-conversao/output/estrategia-performance.md` — Objetivo de conversão de cada ativo e critérios de sucesso definidos por Estela
- `squads/luqz-aquisicao-conversao/output/plano-midia.md` — Plano de mídia com CAC e metas de conversão
- `squads/luqz-aquisicao-conversao/output/copy-ativos.md` — Copy de landing pages, carrosseis e estáticos produzida por Clara Copy
- `squads/luqz-aquisicao-conversao/output/roteiros-video.md` — Roteiros de vídeo produzidos por Rafael Roteiro
- `squads/luqz-aquisicao-conversao/pipeline/data/quality-criteria.md` — Critérios de qualidade da LUQZ
- `_opensquad/_memory/company.md` — Princípios e padrões da LUQZ

## Instructions

### Process

1. **Carregar a estratégia**: Entender o objetivo de conversão de cada ativo antes de avaliar qualquer copy ou roteiro. A estratégia é o critério de avaliação — não o gosto pessoal.

2. **Avaliação estratégica**: Verificar se cada ativo serve ao objetivo declarado na estratégia. O ativo está na etapa correta do funil? A mensagem está calibrada para o ICP certo?

3. **Avaliação de copy** (landing pages, carrosseis, estáticos):
   - Headline: específico e orientado a dor ou benefício do ICP?
   - CTA: descreve o que acontece após o clique?
   - Prova: toda promessa tem evidência?
   - Tom: alinhado ao ICP pesquisado?
   - Brevidade: slides de carrossel dentro do limite de 40 palavras?
   - Coerência entre ativos: mesma voz, mesmo ICP, mesmas métricas?

4. **Avaliação de roteiros**:
   - Gancho: interrompe o padrão nos primeiros 3 segundos?
   - Estrutura: adequada ao formato declarado?
   - Linguagem: escrita para ser falada, não lida?
   - CTA: único e específico no momento correto?
   - Visual: indicado em cada cena?

5. **Avaliação do plano de mídia** (verificação de coerência):
   - Os canais propostos são compatíveis com os ativos produzidos?
   - Os formatos de anúncio citados no plano existem na copy produzida?

6. **Classificar todos os problemas** encontrados:
   - **Crítico**: bloqueia entrega ou compromete o objetivo de conversão
   - **Recomendação**: melhoria que não bloqueia mas deve ser implementada

7. **Emitir o veredicto geral** com próximos passos claros.

## Output Format

```markdown
# Veredicto de Qualidade — [Nome do Cliente]
**Data:** [data]
**Revisora:** Vera Veredicto

---

## VEREDICTO GERAL: [✅ APROVADO | ⚠️ APROVADO COM RESSALVAS | ❌ REJEITADO]

[Sumário de 1–2 frases do veredicto geral]

---

## [Ativo 1] — [Nome]

**Nota:** [N]/5 — [✅ Aprovado | ⚠️ Aprovado com ressalva | ❌ Rejeitado]

**Diagnóstico:** [análise objetiva]

**[Crítico | Ressalva]:** [problema específico e como corrigir]

---

## [Ativo 2] — ...

---

## COERÊNCIA DE PACOTE

[Verificação de alinhamento entre todos os ativos — mesma voz, mesmo ICP, coerência com o plano de mídia]

---

## PRÓXIMOS PASSOS

**Bloqueantes para entrega:** [lista ou "Nenhum"]

**Ajustes recomendados:**
1. [ativo] — [ajuste específico]
...

**Veredicto final:** [o que acontece agora]
```

## Output Example

```markdown
# Veredicto de Qualidade — Studio Conta
**Data:** 2026-04-06
**Revisora:** Vera Veredicto

---

## VEREDICTO GERAL: ✅ APROVADO COM RESSALVAS

4 de 5 ativos aprovados integralmente. 1 ativo com ajuste necessário (não-bloqueante). Pacote pronto para entrega após correção do item apontado.

---

## Estratégia de Performance — ✅ Aprovado (5/5)

**Diagnóstico:** Gargalo identificado com dado específico. Sequência de produção lógica. Benchmarks presentes. Riscos mapeados com mitigação. Documento completo e replicável para outros clientes do mesmo segmento.

---

## Plano de Mídia — ✅ Aprovado (5/5)

**Diagnóstico:** CAC calculado com memória explícita. Exclusão do Google e LinkedIn justificada pelo CAC. Segmentação Meta detalhada e adequada ao ICP. Critérios de corte numéricos definidos. Cronograma semanal acionável.

---

## Copy — Landing Page — ✅ Aprovado (5/5)

**Diagnóstico:**
- Headline escolhida ataca dor real e universal do ICP ✓
- CTA específico e remove objeção de tempo ✓
- Depoimento com resultado quantificado e prazo ✓
- Tom: linguagem de empresário, sem jargão contábil ✓
- Intenção de cada seção documentada ✓

---

## Copy — Carrossel "Cresceu sem estrutura" — ⚠️ Aprovado com Ressalva (3/5)

**Diagnóstico:**
- Gancho (slide 1): forte e de identificação imediata ✓
- Desenvolvimento (slides 2–5): progressão lógica e boa ✓
- **Ressalva (recomendação):** Slide 3 tem 47 palavras — acima do limite de 40. Reduzir para 2 bullets ao invés de 3.
- CTA (slide 6): único e específico ✓

**Ajuste necessário:** Slide 3 — remover um dos bullets ou condensar em linguagem mais curta.

---

## Roteiros de Vídeo — ✅ Aprovado (5/5)

**Diagnóstico (Reel de Conversão):**
- Gancho selecionado: pergunta de identificação direta — forte ✓
- Estrutura problema → agitação → solução → CTA em 45s bem equilibrada ✓
- Linguagem natural para fala — contrações presentes, frases curtas ✓
- Visual especificado em todas as cenas ✓
- CTA único com detalhe de remoção de atrito ("não precisa preparar nada") ✓

**Diagnóstico (Reel Educativo):**
- Gancho com especificidade de faturamento cria filtro de ICP ✓
- 3 sinais bem distribuídos no tempo ✓
- CTA suave adequado para conteúdo educativo ✓

---

## COERÊNCIA DE PACOTE

✅ Tom de voz consistente entre landing page, carrosseis e roteiros — empático, direto, sem jargão.
✅ ICP idêntico em todos os ativos — MEI/ME em crescimento, preocupado com organização financeira.
✅ Plano de mídia usa formatos (carrossel + Reel) que existem nos ativos produzidos.
⚠️ Verificar: o estático de CTA mencionado no plano de mídia (para retargeting) não foi produzido. Confirmar se é para produzir em fase 2 ou se deveria ter sido entregue neste pacote.

---

## PRÓXIMOS PASSOS

**Bloqueantes para entrega:** Nenhum.

**Ajustes antes da entrega:**
1. Carrossel Slide 3: reduzir para máximo 40 palavras
2. Confirmar se estático de retargeting entra neste pacote ou em fase 2

**Veredicto final:** Após os ajustes acima (estimativa: 10 minutos), pacote está pronto para apresentação e entrega ao Studio Conta.
```

## Veto Conditions

Reject and redo if ANY of these are true:
1. Algum ativo não foi avaliado — todo ativo do pacote precisa ter nota e diagnóstico.
2. Nota abaixo de 4 sem diagnóstico escrito e ação corretiva específica.
3. Coerência entre ativos não verificada explicitamente.
4. Veredicto geral sem próximos passos acionáveis.

## Quality Criteria

- [ ] Todos os ativos do pacote avaliados (nenhum pulado)
- [ ] Nota por ativo com diagnóstico objetivo
- [ ] Problemas classificados como crítico ou recomendação
- [ ] Toda nota abaixo de 4 com ação corretiva específica
- [ ] Coerência entre ativos verificada explicitamente
- [ ] Coerência entre ativos e plano de mídia verificada
- [ ] Próximos passos claros com distinção entre bloqueante e recomendação
