# Tarefa de Otimizacao — [CLIENTE] — [FUNIL] — [PERIODO]

> **Tipo:** Tarefa recorrente de otimizacao | **Periodicidade:** [semanal / quinzenal / mensal] | **Responsavel:** Bento Trafego | **Status:** Em analise

## Objetivo

Executar a revisao recorrente do funil indicado, comparando a expectativa de custo por KPI definida no plano de midia com o custo realizado na operacao do Meta Ads, para orientar otimizacoes, cortes, escala ou remapeamento.

## Funis da planilha

O mapa completo de clientes e funis ativos fica em `pipeline/data/funis-planilha-reais.md`. Use a lista abaixo apenas como referencia historica; para criar tarefa recorrente, valide sempre no mapa completo e na planilha.

Use esta lista como ponto de partida para mapear a aba de metas e a linha correspondente no consolidado:

* **IMIGRA** — Captação de leads (Meta)
* **Leo Leao EUA** — Distribuição de conteúdo
* **Leo Leao EUA** — WhatsApp
* **Leo Leao EUA** — Formulario nativo
* **Leo Leao EUA** — Google ads | Leads
* **Leo Leao EUA** — Checkout
* **Leo Leao EUA** — LP - Vistos Temporarios
* **Leo Leao EUA** — LP - Consultoria
* **Leo Leao EUA** — Visto Estudante
* **Leo Leao EUA** — Visto Turismo
* **Leo Leao EUA** — Imersão Conexão
* **Leo Leao EUA** — Engajamento
* **Leo Leao EUA** — LP - Espanha Massa
* **Leo Leao EUA** — LP - Espanha Estudante
* **Leo Leao EUA** — LP - Espanha Cidadania
* **Leo Leao EUA** — LP - Espanha Nomade
* **Leo Leao EA** — Distribuição de conteúdo
* **Leo Leao EA** — WhatsApp

## Contexto da conta

* **Cliente:** [nome do cliente]
* **Conta de anuncio:** [nome ou ID da conta]
* **Periodo analisado:** [data inicial] ate [data final]
* **Funil analisado:** [TOFU / MOFU / BOFU / RETARGET / outro]
* **Nome exato do funil na planilha:** [copiar exatamente como aparece na aba]
* **Tag de funil na campanha:** [tag padrao]
* **Aba da planilha de metas:** [mes/ano]
* **Periodo da ultima extracao:** [periodicidade combinada]

## Premissas de otimizacao

* **Custo esperado por KPI:** R$ [valor alvo]
* **KPI principal do funil:** [CPA / CPL / CAC / outro]
* **Metrica realizada do funil:** R$ [valor realizado]
* **Gap absoluto:** R$ [diferenca]
* **Gap percentual:** [percentual]
* **Volume esperado do funil:** [quantidade prevista]
* **Volume realizado do funil:** [quantidade realizada]

## Leitura operacional

| Nivel | Nome atual | ID | Status | Objetivo | Orcamento | KPI esperado | KPI realizado | Gap |
|---|---|---|---|---|---|---|---|---|
| Campanha | [nome] | [id] | [ativo/pausado] | [objetivo] | R$ [valor] | R$ [valor] | R$ [valor] | R$ [valor] |
| Conjunto | [nome] | [id] | [ativo/pausado] | [objetivo] | R$ [valor] | R$ [valor] | R$ [valor] | R$ [valor] |
| Anuncio | [nome] | [id] | [ativo/pausado] | [objetivo] | R$ [valor] | R$ [valor] | R$ [valor] | R$ [valor] |

## Cruzamento com a planilha de metas

| Indicador | Meta da planilha | Realizado no Meta Ads | Gap | Leitura |
|---|---|---|---|---|
| Investimento | R$ [valor] | R$ [valor] | R$ [valor] | [acima / abaixo / alinhado] |
| KPI principal | R$ [valor] | R$ [valor] | R$ [valor] | [acima / abaixo / alinhado] |
| Volume do funil | [quantidade] | [quantidade] | [quantidade] | [acima / abaixo / alinhado] |
| Consolidado do mes | R$ [valor] | R$ [valor] | R$ [valor] | [acima / abaixo / alinhado] |

## Hipotese de otimizacao

* [O que esta acontecendo no funil]
* [O que explica o desvio]
* [Qual acao esta sendo considerada]

## Acoes possiveis

* [ ] Manter e acompanhar
* [ ] Ajustar orcamento
* [ ] Pausar estrutura
* [ ] Remapear nomenclatura
* [ ] Ajustar segmentacao
* [ ] Ajustar criativo
* [ ] Solicitar novo ativo ao squad de demanda

## Proposta final

### Decisao

[escrever a recomendacao final]

### Justificativa

[explicar o por que, com base em funil, KPI esperado, KPI realizado e consolidado]

### Impacto esperado

* **No funil:** [impacto]
* **No consolidado mensal:** [impacto]
* **Na verba:** [impacto]

## Confirmação necessária

* **Apenas leitura:** [sim/não]
* **Apenas proposta:** [sim/não]
* **Pode executar escrita no Meta Ads:** [sim/não]
* **Conta validada pelo usuario:** [sim/não]

## Observações

* Se a conta de anúncio, o funil ou a periodicidade estiverem ambíguos, a tarefa deve parar aqui.
* Se o KPI realizado estiver fora da expectativa, a revisão deve comparar a causa no nivel de campanha, conjunto e anuncio antes de qualquer ajuste.

## Saida esperada

Quando esta tarefa for executada, a resposta do Bento deve sair nesta ordem:

### 1. Dados analisados

* **Cliente:** [nome]
* **Funil:** [nome exato na planilha]
* **Conta de anuncio:** [ID/nome]
* **Periodo:** [data inicial] a [data final]
* **KPI esperado:** [valor]
* **KPI realizado:** [valor]
* **Gap:** [valor]
* **Meta de investimento:** [valor]
* **Investimento realizado:** [valor]

### 2. Analise

* [leitura do que os dados mostram]
* [onde a performance esta acima ou abaixo da meta]
* [qual nivel esta puxando o resultado: campanha, conjunto ou anuncio]
* [qual risco ou oportunidade foi identificado]

### 3. Recomendacao

* [acao recomendada]
* [prioridade]
* [impacto esperado]
* [o que precisa ser confirmado antes de executar]

## Documentacao no ClickUp

Quando a tarefa recorrente for acionada, o Bento deve registrar na propria tarefa:

* **O que foi analisado:** planilha, periodo, conta de anuncio, campanhas, conjuntos, anuncios e KPI principal.
* **O que foi feito:** consultas executadas, cruzamentos realizados, remapeamentos propostos ou alteracoes aplicadas.
* **Analise:** leitura objetiva do desempenho do funil.
* **Recomendacao:** acao sugerida, prioridade, impacto esperado e aprovacao necessaria.
* **Proximo passo:** manter, revisar no proximo ciclo, pedir aprovacao ou executar ajuste autorizado.

O Bento tambem deve publicar um resumo curto no canal do ClickUp definido para o cliente/funil.

Toda comunicacao no ClickUp precisa vir enriquecida com dados e KPIs. Nao publicar apenas opiniao ou recomendacao solta. No minimo, incluir KPI esperado, KPI realizado, investimento realizado, meta de investimento, resultado realizado e leitura do gap.
