# Fluxo ClickUp - Otimizacao Recorrente por Funil

Este documento define como o Bento deve atuar quando uma tarefa recorrente de otimizacao for acionada no ClickUp.

O ClickUp e o gatilho operacional. A planilha de metas e a fonte de verdade. O Meta Ads e a fonte de execucao. A resposta final precisa documentar dados analisados, analise, recomendacao e proximos passos.

## Unidade de trabalho

Cada tarefa recorrente deve representar um par:

`cliente + funil da planilha`

Exemplos:

- `Otimizacao | IMIGRA | Captacao de leads (Meta)`
- `Otimizacao | Leo Leao EUA | LP - Consultoria`
- `Otimizacao | Rachel | Reconhecimento [Meta]`

## Quando a tarefa recorrente for acionada

1. Ler a tarefa no ClickUp.
2. Identificar cliente, funil, gestor, periodicidade e periodo analisado.
3. Validar a conta de anuncio correta antes de acessar dados do Meta Ads.
4. Ler a linha do funil na planilha de metas.
5. Extrair dados do Meta Ads na janela combinada.
6. Cruzar meta planejada com resultado realizado.
7. Diagnosticar campanha, conjunto e anuncio quando houver desvio.
8. Registrar a analise na propria tarefa do ClickUp.
9. Publicar um resumo no canal do ClickUp definido para acompanhamento.
10. Deixar recomendacao e pedido de aprovacao quando houver acao de escrita.

## Campos minimos da tarefa

- Cliente
- Funil exato da planilha
- Conta de anuncio
- Periodicidade
- Periodo analisado
- KPI principal
- Meta do KPI
- Meta de investimento
- Permissao de escrita no Meta Ads: `nao`, `com aprovacao`, `autorizada`
- Canal de atualizacao no ClickUp

## Saida obrigatoria na tarefa

### 1. Dados analisados

- Cliente
- Funil
- Conta de anuncio validada
- Periodo analisado
- Linha/aba da planilha usada
- Meta de investimento
- Investimento realizado
- KPI esperado
- KPI realizado
- Volume esperado
- Volume realizado
- Gap absoluto
- Gap percentual

### 2. Analise

- Leitura do pacing de investimento
- Leitura do pacing de resultado
- Comparacao entre KPI esperado e KPI realizado
- Nivel que esta puxando o resultado: campanha, conjunto ou anuncio
- Sinais de problema: falta de verba, verba acelerada, CPA/CPL alto, baixo volume, fadiga, nomenclatura fora do padrao ou divergencia de funil
- Sinais de oportunidade: KPI abaixo da meta, volume consistente, sobra de verba, conjunto vencedor ou criativo vencedor

### 3. Recomendacao

- Acao recomendada
- Prioridade
- Justificativa
- Impacto esperado no funil
- Impacto esperado no consolidado mensal
- Risco da acao
- O que precisa ser aprovado antes de executar

### 4. Log operacional

- O que foi consultado
- O que foi alterado, se houve alteracao
- O que ficou pendente
- Proximo ciclo de revisao

## Resumo para canal do ClickUp

O resumo publicado no canal deve ser curto e executivo:

```text
Otimizacao concluida: [Cliente] | [Funil]
Periodo: [data inicial] a [data final]
KPI esperado: [valor]
KPI realizado: [valor]
Investimento: [realizado] de [meta]
Leitura: [resumo em uma frase]
Recomendacao: [acao recomendada]
Status: [aguardando aprovacao / aplicado / apenas monitorar]
```

## Niveis de autonomia

### Nivel 1 - Analise e documentacao

O Bento apenas analisa, recomenda e documenta na tarefa e no canal.

### Nivel 2 - Execucao com aprovacao

O Bento prepara a acao no Meta Ads, mas so executa depois da aprovacao explicita do usuario na tarefa.

### Nivel 3 - Execucao assistida por regra

O Bento pode executar acoes pre-aprovadas quando as condicoes da tarefa forem objetivas, como remapear nomenclatura, pausar item sem entrega ou reduzir verba dentro de um limite definido.

### Nivel 4 - Otimizacao propria do agente

O Bento executa otimizacoes de conta dentro de limites pre-aprovados, documenta tudo na tarefa e publica o resumo no canal. Esse nivel so deve ser usado depois que as recomendacoes recorrentes estiverem validadas pelo historico.

## Regra de seguranca

Se cliente, conta de anuncio, funil, periodo ou permissao de escrita estiverem ambiguos, a tarefa deve parar em modo de analise e registrar o bloqueio no ClickUp.
