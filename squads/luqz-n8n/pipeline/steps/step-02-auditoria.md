# Step 02 — Auditoria do Fluxo

**Agente responsável:** N8N Auditor 🔍
**Input obrigatório:** `squads/luqz-n8n/output/mapeamentos/[nome-do-fluxo].md`
**Output esperado:** `squads/luqz-n8n/output/auditorias/[nome-do-fluxo].md`

---

## Instrução de Execução

Executar N8N Auditor com o documento de mapeamento como input.

O Auditor deve analisar obrigatoriamente as 4 dimensões:
1. Fragilidade (pontos de falha, ausência de error handling)
2. Ineficiência (redundância, desperdício de processamento)
3. Risco Operacional (logs, dados sensíveis, idempotência, owner)
4. Escalabilidade (limites de volume, rate limits, dependência manual)

## Critério de Conclusão

- [ ] Relatório de auditoria criado no caminho correto
- [ ] Resumo executivo com contagem de problemas por prioridade
- [ ] Cada problema com tipo, prioridade, localização, descrição e impacto
- [ ] Seção "pontos sem problema identificado" presente
- [ ] Nenhuma solução proposta no documento

## Veto Condition

Não avançar para o Step 03 se:
- Relatório de auditoria ausente
- Algum problema de Alta prioridade sem campo de impacto no negócio preenchido
