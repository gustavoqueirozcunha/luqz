---
name: meta-ads
description: Direct connection to Meta Ads Manager via MCP for campaign analysis, validation, and optimization
description_pt-BR: Conexao direta ao Gerenciador de Anuncios do Meta via MCP para analise, validacao e otimizacao de campanhas
type: mcp
version: "1.0.0"
categories: [marketing, ads, mcp, traffic]
---

# Meta Ads MCP Skill

Esta skill orienta como os agentes LUQZ devem se conectar ao Meta Ads com seguranca operacional, validar a conta de anuncio correta, extrair dados com a periodicidade combinada e cruzar os resultados com o plano de midia e a planilha de metas antes de qualquer ajuste.

## When to Use

- Uma tarefa recorrente de otimizacao do ClickUp foi acionada para um cliente/funil.
- E preciso validar se a conta de anuncio correta foi selecionada antes de executar qualquer ajuste.
- Ha necessidade de extrair relatorios com periodicidade definida para comparacao com a planilha de metas.
- O usuario quer propor, revisar ou aplicar otimizacoes em campanhas, conjuntos ou anuncios.
- Ha necessidade de remapear nomenclaturas, consolidar metricas por funil ou comparar plano versus execucao.

## Instructions

1. **Autenticacao e contexto**: o servidor MCP ja deve estar autenticado pelo usuario na maquina hospedeira. Nao tente logar via web automation nem simular acesso.
2. **Validacao de conta**:
   - Sempre comece listando as contas com `list_ad_accounts`.
   - Confirme a conta do cliente por nome, Business Manager ID, dominio da operacao ou outro identificador confiavel.
   - Se houver duvida, pare e peca validacao. Nunca continue com conta presumida.
3. **Validacao de escopo**:
   - Antes de ler ou alterar qualquer coisa, confirme se o pedido e de leitura, analise, remapeamento ou alteracao direta.
   - Se o pedido envolver escrita, confirme exatamente qual nivel pode mudar: campanha, conjunto, anuncio ou apenas proposta.
4. **Leitura da planilha de metas**:
   - A planilha de metas e a referencia de verdade para comparar execucao versus planejamento.
   - A leitura deve seguir a estrutura combinada com o usuario: abas por mes, linhas por funil e colunas por dia.
   - Cada funil precisa ser tratado como unidade de consolidacao.
   - O nome exato da linha do funil na planilha deve ser usado como referencia primaria para a tarefa recorrente.
5. **Inventario do gerenciador**:
   - Registre campanhas, conjuntos e anuncios com nomes originais, IDs, status, objetivo, orcamento, datas e tag de funil.
   - Preserve o estado atual antes de propor qualquer remapeamento.
6. **Periodicidade de extracao**:
   - Use a periodicidade combinada com o usuario para extrair relatorios.
   - Se a periodicidade nao tiver sido definida, peca antes de agir.
   - Para validacao de tendencia, use a janela mais recente combinada e, quando necessario, janelas auxiliares de 3, 7 e 14 dias.
   - A extracao precisa ser coerente com a frequencia da tarefa recorrente criada para aquele funil na planilha.
7. **Comparacao e consolidacao**:
   - Compare o consolidado da planilha com o consolidado do Meta Ads por funil.
   - Compare tambem por campanha, conjunto e anuncio quando houver necessidade de diagnostico fino.
   - Identifique divergencias entre meta planejada e execucao real antes de sugerir otimizacao.
8. **Remapeamento de nomenclatura**:
   - Se houver nomes fora do padrao, primeiro produza um plano de remapeamento.
   - O plano deve conter `nome_atual`, `nome_sugerido`, `entidade`, `funil`, `motivo`, `impacto` e `acao`.
   - So aplique a mudanca se o MCP suportar escrita e se houver autorizacao explicita para executar.
9. **Tomada de decisao**:
   - Nunca aumente orcamento, pause campanha ou remodele estrutura sem validar funil, conta, metas e contexto.
   - Qualquer acao precisa justificar o impacto no consolidado do cliente.
   - Se a conta, o funil ou a meta estiverem ambiguos, interrompa e peca confirmacao.

## Requirements

- O servidor MCP `meta-ads-mcp` precisa estar configurado e ativo no ambiente de execucao do agente.
- O usuario precisa informar ou validar a conta de anuncio correta antes de qualquer acao.
- O contexto do cliente em `clientes/[cliente]/contexto/oferta.md` deve possuir os KPIs de ROAS, CPA teto, objetivo e estrutura de funil.
- A planilha de metas precisa estar acessivel para cruzamento com a execucao do gerenciador.
- Se alguma dessas pecas estiver faltando, parar e reportar a limitacao em vez de simular a decisao.

## Output Expectations

Quando usada para analise ou ajuste, esta skill deve retornar, nesta ordem:

1. dados analisados
2. analise
3. recomendacao
4. confirmacao necessaria antes de qualquer escrita, quando aplicavel

### Dados analisados

- conta de anuncio validada
- periodo extraido
- funis encontrados
- consolidado por funil
- divergencias entre planilha e Meta Ads

### Analise

- leitura do que os dados mostram
- onde a performance esta acima ou abaixo da meta
- qual nivel esta puxando o resultado: campanha, conjunto ou anuncio
- qual risco ou oportunidade foi identificado

### Recomendacao

- proposta de acao ou remapeamento
- prioridade
- impacto esperado
- o que precisa ser confirmado antes de executar

## Registro operacional em ClickUp

Quando a analise nascer de uma tarefa recorrente do ClickUp, a skill deve orientar o agente a registrar a saida completa na propria tarefa e publicar um resumo no canal definido para o cliente ou funil.

O registro na tarefa precisa conter:

- o que foi analisado
- o que foi feito
- dados analisados
- analise
- recomendacao
- pendencias
- aprovacao necessaria antes de qualquer escrita no Meta Ads
- status da recomendacao: `monitorar`, `aguardando aprovacao`, `aplicado` ou `bloqueado`

Se houver escrita no Meta Ads, documente antes e depois da alteracao, incluindo entidade alterada, ID, valor anterior, valor novo, motivo e horario da execucao.
