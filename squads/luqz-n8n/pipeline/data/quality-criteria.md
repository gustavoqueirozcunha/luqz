# Critérios de Qualidade — Squad N8N

**Versão:** 1.0
**Última atualização:** 2026-04-09

> Critérios que qualquer output do Squad N8N deve satisfazer antes de ser considerado entregue.

---

## Critérios Universais (valem para todos os agentes)

- [ ] Output segue template padrão do agente sem seções omitidas
- [ ] Nenhum campo em branco sem justificativa ou tag `[PENDÊNCIA: motivo]`
- [ ] Datas absolutas em todos os registros (nunca relativas)
- [ ] Linguagem técnica direta — sem prosa corporativa ou vaga
- [ ] Nenhum agente ultrapassa seu escopo (Mapper não avalia, Auditor não propõe solução, Designer não documenta operação, Docs não cria blueprint)

---

## Critérios por Agente

### N8N Mapper
- [ ] Um documento por workflow
- [ ] Gatilho documentado com tipo, configuração e quem dispara
- [ ] Todos os nós de processamento listados em ordem de execução
- [ ] Todas as integrações com sistema, tipo de operação e autenticação
- [ ] Branches documentadas com condição explícita

### N8N Auditor
- [ ] Resumo executivo com contagem por prioridade presente
- [ ] Todo problema com: tipo, prioridade, localização, descrição, impacto, evidência
- [ ] Seção "pontos sem problema" presente (transparência)
- [ ] Seção "limitações da auditoria" presente se houver restrições

### N8N Designer
- [ ] Todo problema de Alta prioridade com solução proposta
- [ ] Cada mudança com critério de validação mensurável
- [ ] Referência ao problema do Auditor em cada mudança
- [ ] Diagrama antes/depois para mudanças estruturais
- [ ] Decisões de negócio listadas separadamente para o usuário

### N8N Docs
- [ ] Estado atual e versão proposta claramente marcados ([ATUAL] / [PROPOSTO])
- [ ] Seção operacional com "o que fazer quando falha" (tabela)
- [ ] Passo a passo de execução manual testável por operador
- [ ] Histórico de mudanças com data e versão
- [ ] Índice de fluxos atualizado

---

## Critério de Qualidade do Ciclo Completo

Um ciclo está completo quando:
1. Documento de mapeamento aprovado pelo Mapper
2. Relatório de auditoria aprovado pelo Auditor
3. Blueprint aprovado pelo Designer
4. Usuário aprovou o blueprint no Step 04
5. Documentação final gerada pelo Docs
6. Índice de fluxos atualizado

**Nível de qualidade mínimo para entrega:** todos os itens acima concluídos + nenhum problema de Alta prioridade sem solução no blueprint.
