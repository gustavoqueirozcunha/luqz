# Benchmarks de Funil — Referência Bruno CRM

> Fonte: benchmarks de mercado para funis de tráfego pago + consultoria comercial B2C/B2B de médio ticket (R$ 2.000–R$ 15.000).

---

## Taxas de Conversão por Etapa

| Transição | Meta Mínima | Meta Saudável | Meta Excelente |
|-----------|------------|---------------|----------------|
| Lead → Resposta (WhatsApp) | 20% | 35% | 50%+ |
| Resposta → MQL | 30% | 50% | 65%+ |
| MQL → Agendamento | 40% | 60% | 75%+ |
| Agendamento → Comparecimento | 50% | 70% | 85%+ |
| Comparecimento → Proposta | 70% | 85% | 95%+ |
| Proposta → Fechamento | 15% | 30% | 45%+ |

---

## Tempo de Primeiro Contato

| Tempo | Impacto na Taxa de Resposta |
|-------|----------------------------|
| < 5 minutos | Máximo — lead ainda está no contexto do anúncio |
| 5–30 minutos | Bom — redução de ~30% na taxa de resposta |
| 30min–2h | Médio — redução de ~55% |
| 2h–24h | Ruim — redução de ~75% |
| > 24h | Crítico — redução de ~85% |

---

## Volume de Follow-ups por Temperatura

| Temperatura | Nº de Follow-ups | Intervalo Entre Cada |
|-------------|-----------------|----------------------|
| Quente (respondeu antes) | 4–5 | 24h, 48h, 72h, 7 dias |
| Morno (interagiu mas sumiu) | 3 | 24h, 48h, 7 dias |
| Frio (nunca respondeu) | 2–3 | 24h, 72h, encerrar ciclo |

---

## Limites de Disparo WhatsApp (segurança antiblqueio)

| Tipo de Conta | Máximo por Dia | Intervalo Mínimo | Aquecimento |
|--------------|---------------|------------------|-------------|
| Número novo (< 30 dias) | 30–50 | 3–5 minutos | 2–4 semanas orgânico |
| Conta aquecida (30–90 dias) | 100–150 | 1–3 minutos | — |
| Conta consolidada (> 90 dias) | 200–300 | 45s–2 minutos | — |
| API Oficial com template | Ilimitado* | Gerenciado pela Meta | Templates aprovados |

*Sujeito a limites de qualidade da conta Meta.

---

## Critério de Limpeza de Base

| Condição | Ação |
|----------|------|
| Sem interação alguma > 90 dias + sem dados de qualificação | Arquivar e remover do pipeline ativo |
| Sem resposta após 3 follow-ups completos | Tag `sem-resposta` + mover para fila de reativação mensal |
| Lead desqualificado (sem fit de produto/budget) | Tag `desqualificado` + remover do pipeline + manter no CRM para histórico |
| Número inválido confirmado | Deletar do pipeline ativo |
| No-show após 2 tentativas de reagendamento | Tag `no-show-definitivo` + mover para reativação trimestral |
