# Step 03 — Blueprint de Otimização

**Agente responsável:** N8N Designer 🏗️
**Input obrigatório:** `squads/luqz-n8n/output/auditorias/[nome-do-fluxo].md`
**Output esperado:** `squads/luqz-n8n/output/blueprints/[nome-do-fluxo].md`

---

## Instrução de Execução

Executar N8N Designer com o relatório de auditoria como input.

O Designer deve:
1. Endereçar todos os problemas de Alta prioridade (obrigatório)
2. Endereçar problemas de Média prioridade se não aumentarem complexidade
3. Listar explicitamente quais problemas de Baixa ficam para próximo ciclo
4. Identificar se alguma mudança requer decisão do usuário antes de implementar

## Critério de Conclusão

- [ ] Blueprint criado no caminho correto
- [ ] Todos os problemas de Alta prioridade com solução proposta
- [ ] Cada mudança com critério de validação definido
- [ ] Decisões que requerem input do usuário listadas explicitamente
- [ ] Diagrama antes/depois para mudanças estruturais

## Veto Condition

Não avançar para o Step 04 se:
- Algum problema de Alta prioridade sem solução proposta no blueprint
- Decisões de negócio necessárias identificadas mas não listadas para o usuário
