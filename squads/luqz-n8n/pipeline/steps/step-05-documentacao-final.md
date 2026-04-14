# Step 05 — Documentação Final

**Agente responsável:** N8N Docs 📄
**Input obrigatório:**
  - `squads/luqz-n8n/output/mapeamentos/[nome-do-fluxo].md`
  - `squads/luqz-n8n/output/auditorias/[nome-do-fluxo].md`
  - `squads/luqz-n8n/output/blueprints/[nome-do-fluxo].md`
  - Decisões do usuário no Step 04

**Output esperado:**
  - `squads/luqz-n8n/output/documentacao/[nome-do-fluxo].md`
  - `squads/luqz-n8n/output/indice-fluxos.md` (atualizado)

---

## Instrução de Execução

Executar N8N Docs com todos os outputs anteriores e as decisões do usuário do Step 04.

O Docs deve:
1. Consolidar mapeamento + auditoria + blueprint num documento único e autocontido
2. Separar claramente estado atual ([ATUAL]) de versão proposta ([PROPOSTO])
3. Incluir seção operacional com passo a passo para operadores
4. Registrar todas as pendências não resolvidas neste ciclo
5. Atualizar o índice central de fluxos

## Critério de Conclusão

- [ ] Documento final criado no caminho correto com todas as seções
- [ ] Estado atual e versão proposta claramente separados
- [ ] Seção operacional com tabela de "o que fazer quando falha"
- [ ] Histórico de mudanças com data e versão 1.0
- [ ] Índice de fluxos atualizado
- [ ] Seção de pendências e próximos passos preenchida

## Veto Condition

Não marcar o ciclo como concluído se:
- Documento final ausente ou sem seção operacional
- Índice de fluxos não atualizado
