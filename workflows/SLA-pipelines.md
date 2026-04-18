# SLA por Step de Pipeline — LUQZ

> Define o tempo máximo esperado para cada step de cada pipeline.
> Usado pelo Gestor de Projetos para monitorar andamento e identificar atrasos.
>
> **SLA = tempo de execução do agente após receber o input aprovado do step anterior.**
> Não inclui tempo de aprovação do cliente — apenas tempo interno de produção.

---

## Pipeline: luqz-aquisicao-conversao

| Step | Agente | Entrega | SLA |
|------|--------|---------|-----|
| Step 01 — Briefing | Gestor / Gustavo | `briefing-cliente.md` preenchido | 1 dia útil |
| Step 02 — Estratégia | Estela Estratégia | Plano estratégico de performance | 1 sessão (2–3h) |
| Step 03 — Aprovação Estratégia | Gustavo / Cliente | Estratégia validada ou revisão solicitada | 1 dia útil |
| Step 04 — Plano de Mídia | Márcio Mídia | Plano de mídia com canais, budget e segmentação | 1 sessão (1–2h) |
| Step 04b — Prototipagem Visual | Lucas Protótipo | Protótipo HTML de landing page (quando aplicável) | 1 sessão (2–3h) |
| Step 05 — Copy | Clara Copy | Copy de landing page, anúncios e/ou carrosseis | 1 sessão (2–3h) |
| Step 06 — Roteiros | Rafael Roteiro | Roteiros de vídeo (VSL, reels) quando aplicável | 1 sessão (1–2h) |
| Step 07 — Aprovação Ativos | Gustavo / Cliente | Ativos validados ou revisão solicitada | 1 dia útil |
| Step 08 — Revisão Final | Vera Veredicto | Veredicto com aprovação ou rejeição fundamentada | 1 sessão (1h) |

**SLA total estimado (execução interna):** 2–3 dias úteis de produção + tempo de aprovações

---

## Pipeline: luqz-conteudo

| Step | Agente | Entrega | SLA |
|------|--------|---------|-----|
| Step 01 — Briefing de Conteúdo | Gestor / Gustavo | `briefing-conteudo.md` preenchido | 30 min |
| Step 02 — Estratégia de Conteúdo | Bento Estrategista | Plano de conteúdo (temas, formatos, sequência) | 1 sessão (1–2h) |
| Step 02b — Layout de Carrossel | Lucas Protótipo | Estrutura visual dos slides (quando carrossel complexo) | 1 sessão (30–60 min) |
| Step 03 — Estrutura dos Slides | Bento / Mateo Copy | Estrutura de narrativa (arco, distribuição por slide) | 1 sessão (30 min) |
| Step 04 — Copy dos Slides | Mateo Copy | Copy slide a slide com título, texto e intenção | 1 sessão (1–2h) |
| Step 05 — Roteiro (se vídeo) | Rafael Roteiro | Roteiro de reel ou vídeo orgânico | 1 sessão (1h) |
| Step 06 — Execução Visual | Caetano Executor | Layout Canva (Modo 1 ou 2) | 1 sessão (1–2h) |
| Step 07 — Revisão Final | Vera Veredicto | Veredicto com aprovação ou rejeição | 1 sessão (30 min) |

**SLA total estimado:** 1–2 dias úteis para produção completa de um carrossel

---

## Regras de SLA

### Quando o SLA começa
O cronômetro de SLA começa quando o agente recebe o input aprovado do step anterior. Aprovações pendentes (cliente ou Gustavo) pausam o SLA.

### O que invalida o SLA
- Input incompleto ou ambíguo — o agente para e solicita complemento antes de iniciar
- Contexto do cliente não carregado — interrompe antes de começar
- Aprovação pendente do step anterior — não inicia sem output aprovado

### Sinalização de atraso
O Gestor de Projetos deve escalar para Gustavo se qualquer step ultrapassar **2x o SLA estimado**.

### Revisões
Cada step tem direito a **1 rodada de revisão** dentro do SLA. Segunda rodada de revisão conta como novo SLA.

---

## Referência: Ciclos de Produção AP360

| Período | Cadência de entregas | Calls |
|---------|---------------------|-------|
| Semanas 1–4 (Fase 1) | Onboarding + setup + primeiras peças | 4 calls |
| Semanas 5–24 (Fase 2) | Produção contínua por trilha | 11 calls |
| Média por semana | 2–4 peças de conteúdo + 1 ativo de conversão/mês | — |

> Atualizar este arquivo se os tempos reais divergirem consistentemente das estimativas.
> Responsável: Gestor de Projetos.
