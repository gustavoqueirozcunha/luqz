# Naming Conventions - Squad Tráfego

## Objetivo

Padronizar o nome de campanhas, conjuntos e anuncios para que o Bento consiga:

- identificar o funil correto
- comparar a execucao do Meta Ads com a planilha mensal
- consolidar metricas por funil
- propor remapeamento de nomenclatura sem perder rastreabilidade

## Regra central

Toda estrutura precisa carregar a tag do funil no nome.

Formato base:

`CLIENTE | FNL-[FUNIL] | OBJ-[OBJETIVO] | [PERIODO]`

## Estrutura por nivel

### Campanha

Formato:

`CLIENTE | FNL-[FUNIL] | OBJ-[OBJETIVO] | [PERIODO]`

Exemplos:

- `LEVITA | FNL-TOFU | OBJ-LEADS | 2026-05`
- `LEVITA | FNL-BOFU | OBJ-VENDAS | 2026-05`

### Conjunto

Formato:

`CLIENTE | FNL-[FUNIL] | AUD-[AUDIENCIA] | POS-[POSICIONAMENTO] | [PERIODO]`

Exemplos:

- `LEVITA | FNL-TOFU | AUD-INTERESSES | POS-FEED-STORIES | 2026-05`
- `LEVITA | FNL-RETARGET | AUD-VISITANTES-30D | POS-FEED | 2026-05`

### Anuncio

Formato:

`CLIENTE | FNL-[FUNIL] | ANG-[ANGULO] | CRI-[CRIATIVO] | V[VERSAO]`

Exemplos:

- `LEVITA | FNL-TOFU | ANG-DOR | CRI-CARROSSEL | V1`
- `LEVITA | FNL-BOFU | ANG-OFERTA | CRI-VIDEO | V2`

## Regras de leitura

1. `FNL-[FUNIL]` e obrigatorio em todos os niveis.
2. `OBJ-[OBJETIVO]` aparece na campanha.
3. O mesmo cliente pode ter varios funis ativos ao mesmo tempo.
4. Se o nome atual nao permitir leitura imediata do funil, o Bento deve propor remapeamento.
5. O remapeamento precisa preservar o identificador do funil antes de mexer em qualquer outro campo.

## Tabela de remapeamento

Quando houver padrao ruim, o Bento deve registrar:

| Entidade | Nome atual | Nome sugerido | Funil | Motivo | Acao |
|---|---|---|---|---|---|
| Campanha | [nome atual] | [nome novo] | [funil] | [por que mudar] | [renomear/manter] |
| Conjunto | [nome atual] | [nome novo] | [funil] | [por que mudar] | [renomear/manter] |
| Anuncio | [nome atual] | [nome novo] | [funil] | [por que mudar] | [renomear/manter] |

## Ordem de execucao

1. Inventariar campanhas.
2. Inventariar conjuntos.
3. Inventariar anuncios.
4. Classificar cada item por funil.
5. Comparar com a planilha de metas.
6. Sugerir ou aplicar o remapeamento.
7. Recalcular o consolidado por funil.

