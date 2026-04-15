# Step 01 — Mapeamento de Fluxo

**Agente responsável:** N8N Mapper 🗺️
**Input obrigatório:** Nome ou ID do workflow no N8N (ou export JSON)
**Output esperado:** `squads/luqz-n8n/output/mapeamentos/[nome-do-fluxo].md`

---

## Instrução de Execução

Antes de iniciar, confirmar com o usuário:
1. Qual fluxo será mapeado? (nome exato, ID ou "todos os fluxos ativos")
2. O acesso à API N8N está disponível? (URL: `http://editor.luqz.com.br/api/v1/workflows/`)
3. Se API indisponível: solicitar export JSON do workflow

Executar N8N Mapper com o contexto acima.

## Critério de Conclusão

- [ ] Documento de mapeamento criado no caminho correto
- [ ] Todos os campos do template preenchidos ou marcados com `[PENDÊNCIA: motivo]`
- [ ] Nenhuma avaliação de qualidade presente no documento

## Veto Condition

Não avançar para o Step 02 se:
- Documento de mapeamento ausente
- Campos de gatilho, entradas ou integrações em branco sem tag de pendência
