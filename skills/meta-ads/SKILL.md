---
name: meta-ads
description: Direct connection to Meta Ads Manager via MCP for campaign analysis, creation, and optimization
description_pt-BR: Conexão direta ao Gerenciador de Anúncios do Meta via MCP para análise, criação e otimização de campanhas
type: mcp
version: "1.0.0"
categories: [marketing, ads, mcp, traffic]
---

# Meta Ads MCP Skill

Esta skill descreve como os agentes LUQZ devem se comunicar com o MCP do Meta Ads para gerenciar tráfego pago. O MCP fornece as ferramentas literais (tools) expostas pelo servidor local de Meta Ads.

## When to Use

- O cliente solicita análise de ROAS, CPA, ou Pacing de investimento.
- Necessidade de pausar anúncios ou conjuntos de anúncios que não estão perfomando (desligamento de campanhas).
- Criação de novas campanhas de Meta Ads a partir de planos de mídia aprovados.
- Leitura de públicos ou configuração de tracking.

## Instructions

1. **Autenticação e Contexto**: O servidor MCP já deve estar autenticado pelo usuário na máquina hospedeira. Não tente logar via web automation.
2. **Identificação do Client/Ad Account**: Sempre inicie o processo listando as contas (`list_ad_accounts`) para encontrar a conta correta usando o nome ou Business Manager ID do cliente LUQZ atual.
3. **Leitura de Dados Base**:
   - Para entender o "como eu controlo o plano de mídia hoje", o agente Gestor de Tráfego (Bento) deve pedir o acesso ou a leitura da planilha mestra de metas se necessário.
4. **Tomada de Decisão (Ações)**:
   - Nunca pause ou aumente orçamento (scale) sem antes verificar as regras de CPA teto ou a diretriz estrita no contexto do cliente.
   - Utilize a ferramenta `get_campaign_insights` para ter certeza de gastos e conversões dos últimos 7 a 30 dias antes de agir.

## Requirements

- Quando o servidor MCP `meta-ads-mcp` estiver configurado e ativo no ambiente de execução do agente, usar suas ferramentas como fonte primária.
- Se o `meta-ads-mcp` não estiver disponível, interromper a execução e reportar a limitação em vez de inventar dados ou simular ações.
- O contexto do cliente (em `clientes/[cliente]/contexto/oferta.md`) deve possuir os KPIs de ROAS e CPA teto definidos para que as decisões de tráfego sejam precisas.
