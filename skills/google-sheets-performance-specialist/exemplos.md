# Exemplos — google-sheets-performance-specialist

Casos reais de uso, com input do usuário e output completo no formato das **5 seções obrigatórias**.
Ler antes de responder quando o caso for parecido com um destes.

---

## Exemplo 1 — Corrigir `#DIV/0!` em CPL

### Input do usuário

> "Minha fórmula de CPL está dando `#DIV/0!` em meses que a campanha ficou parada.
> A coluna D é investimento, a coluna E é leads. Fórmula atual: `=D2/E2`."

### Output

**1. Diagnóstico**
O `#DIV/0!` aparece nos meses em que `E` (leads) vale 0 — matematicamente, "investimento dividido por zero" não existe, e o Sheets propaga o erro. Em relatórios executivos isso contamina somas posteriores (um `#DIV/0!` derruba a média anual inteira).

**2. Fórmula corrigida**

```
=SEERRO(D2/E2; 0)
```

**3. Explicação simples**
`SEERRO` captura qualquer erro da operação interna e devolve um valor seguro no lugar. O `0` é escolhido porque, quando não há leads, o CPL "operacional" é zero para fins de agregação — a ausência de lead já fica visível na coluna de leads, não precisa virar erro aqui também.

**4. Possíveis erros futuros**
- Se `D2` vier como texto (ex: `"R$ 1.200"`), a divisão continua falhando — usar `VALOR(D2)` ou garantir formato numérico.
- Se o usuário quiser **distinguir** "CPL zerado porque campanha parou" de "CPL zerado porque investimento foi 0", o retorno `0` apaga essa distinção. Nesse caso, alternativa: `=SE(E2=0; "—"; D2/E2)`.
- Somar coluna de CPLs em média simples dá errado — use média ponderada: `=SOMA(D:D)/SOMA(E:E)`.

**5. Sugestão opcional de melhoria**
Se a planilha tem muitas linhas de meses, aplicar via `ARRAYFORMULA` no topo da coluna de CPL, deixando ela auto-preenchida conforme novos meses entram:
```
=ARRAYFORMULA(SE(LIN(D2:D)=1; "CPL"; SEERRO(D2:D/E2:E; 0)))
```
Isso evita arrastar fórmula a cada mês novo.

---

## Exemplo 2 — Montar funil Meta Ads com taxas de conversão entre etapas

### Input do usuário

> "Preciso montar o funil da campanha:
> B2 = Impressões, C2 = Cliques, D2 = Leads, E2 = MQLs, F2 = SQLs, G2 = Vendas.
> Quero em G3 a taxa Clique→Lead, H3 Lead→MQL, I3 MQL→SQL, J3 SQL→Venda."

### Output

**1. Diagnóstico**
Funil padrão Meta Ads. Cada taxa é etapa atual dividida pela etapa imediatamente anterior. Risco central: qualquer etapa com volume zero (ex: ninguém avançou de MQL para SQL em uma semana) gera `#DIV/0!` em cadeia.

**2. Fórmula corrigida**

Em `G3` (Clique→Lead):
```
=SEERRO(D2/C2; 0)
```

Em `H3` (Lead→MQL):
```
=SEERRO(E2/D2; 0)
```

Em `I3` (MQL→SQL):
```
=SEERRO(F2/E2; 0)
```

Em `J3` (SQL→Venda):
```
=SEERRO(G2/F2; 0)
```

Formatar todas como **porcentagem** (Ctrl+Shift+5) — não multiplicar por 100 na fórmula.

**3. Explicação simples**
Cada taxa lê "de quem estava na etapa anterior, quanto avançou para esta?". Manter cada fórmula separada (em vez de uma fórmula agregada) facilita o diagnóstico quando a conversão cai: você sabe exatamente em qual etapa o funil vazou.

**4. Possíveis erros futuros**
- Se um período tiver 0 cliques mas leads > 0 (dado inconsistente — lead de origem não paga misturado), a taxa Clique→Lead será mascarada pelo `SEERRO`. Investigar origem dos leads antes de consolidar.
- Formatar como % e multiplicar por 100 na fórmula ao mesmo tempo → valor aparece como `1250%`. Escolher um dos dois.
- Se os dados vierem de export do Meta com vírgula como separador decimal em texto (ex: `"1,250"`), tratar com `VALOR(SUBSTITUIR(...; "."; ""))` antes.

**5. Sugestão opcional de melhoria**
Para um funil mais robusto que aceite mais etapas no futuro, modelar em formato longo (coluna "etapa" + coluna "volume") e usar `QUERY` para calcular taxas. Não vale a pena para 5 etapas fixas, mas compensa se amanhã entrar "Visitante → Lead Magnet → Lead → ...".

---

## Exemplo 3 — Pacing (ritmo de meta) para cockpit

### Input do usuário

> "No cockpit mensal, preciso de uma célula que mostre **quanto de meta já deveria estar feita hoje** se o ritmo fosse linear. Meta do mês está em `B2` (valor: 100000)."

### Output

**1. Diagnóstico**
Pacing linear: "no dia X de Y do mês, deveria-se ter realizado X/Y da meta". Útil no cockpit como régua contra o realizado — se o realizado está acima, campanha está adiantada; abaixo, atrasada. Risco: usar `DIA()` sozinho esquece que fevereiro tem 28, não 30.

**2. Fórmula corrigida**

```
=SEERRO( (DIA(HOJE()) / DIA(FIMMÊS(HOJE();0))) * B2; 0)
```

**3. Explicação simples**
`DIA(HOJE())` devolve o dia atual (1–31). `DIA(FIMMÊS(HOJE();0))` devolve o último dia do mês corrente (28–31). A razão entre eles é "fração do mês já percorrida". Multiplicando pela meta, temos o valor que deveria estar realizado agora num ritmo 100% linear.

**4. Possíveis erros futuros**
- Ritmo linear não é realista quando há sazonalidade (ex: e-commerce com Black Friday concentrando 40% no dia 29). Para esses casos, calcular pacing ponderado por dia da semana/evento.
- No dia 1 do mês a fórmula retorna ~3% da meta — ok, mas pode assustar o leitor. Adicionar rótulo no cockpit ("ritmo linear esperado").
- Se a campanha não começou no dia 1, pacing do mês inteiro distorce. Use a variante por intervalo: `(HOJE()-DataInicio)/(DataFim-DataInicio) * Meta`.

**5. Sugestão opcional de melhoria**
Ao lado da célula de pacing, adicionar um **indicador visual de gap**:
```
=SEERRO( Realizado - PacingEsperado; 0)
```
Formatar com **formatação condicional**: vermelho quando negativo, verde quando positivo. Isso transforma o pacing em semáforo executivo, muito mais útil no dia-a-dia do gestor do que um número solto.

---

## Exemplo 4 — Projeção linear de fechamento

### Input do usuário

> "Quero projetar onde vou fechar o mês em vendas se mantiver o ritmo atual.
> Vendas realizadas até hoje estão em `C5` (valor: 42 vendas, estamos no dia 14)."

### Output

**1. Diagnóstico**
Projeção linear inverte a lógica do pacing: em vez de perguntar "quanto deveria?", pergunta "se o ritmo atual continuar, onde chego?". Útil para disparar ajustes antecipados de verba e mensagem. Risco: em mês com rampa (ex: campanha que sobe ao longo do mês), a projeção subestima; em mês com pico no começo, superestima.

**2. Fórmula corrigida**

```
=SEERRO( C5 / (DIA(HOJE()) / DIA(FIMMÊS(HOJE();0))); 0)
```

**3. Explicação simples**
Divide o realizado pela fração do mês já decorrida. Se no dia 14 de um mês de 30 dias você fez 42 vendas, a fração é 14/30 ≈ 0,467. Dividindo 42 por 0,467 dá ~90 — ou seja, no mesmo ritmo, fecharia o mês com 90 vendas.

**4. Possíveis erros futuros**
- No dia 1, a fração é 1/30 ≈ 0,033 — uma única venda nesse dia projetaria 30 vendas no mês (alto ruído). Tratar com `SE(DIA(HOJE())<5; "dados insuficientes"; fórmula)` para evitar projeção de pouco sinal.
- `HOJE()` recalcula a cada abertura da planilha. Para histórico/auditoria, congelar a data da projeção em célula separada.
- Se a campanha tem ciclo de vendas longo (leads que fecham semanas depois), projeção linear sobre vendas não reflete a verdade — projetar leads ou MQLs é mais estável.

**5. Sugestão opcional de melhoria**
Criar **três colunas de projeção** no cockpit — conservadora (realizado × 1,0), realista (× ritmo atual), otimista (× 1,2). Isso dá ao gestor uma faixa em vez de um ponto único, e conversa melhor com a realidade de campanhas que têm sazonalidade dentro do mês.

---

## Exemplo 5 — Consolidar Meta + Google + Orgânico em tabela única via QUERY

### Input do usuário

> "Tenho três abas: `meta_raw`, `google_raw`, `organico_raw`. Cada uma com colunas `Data | Canal | Investimento | Leads | Vendas | Receita`. Quero uma aba `consolidado` que mostre, por mês, o total de cada métrica somado entre os três canais, uma linha por canal. Usei `SOMASES` e virou uma bagunça."

### Output

**1. Diagnóstico**
Três abas no mesmo formato pedem uma consolidação via empilhamento + `QUERY`. `SOMASES` escala mal porque exige uma célula por combinação (canal × mês × métrica). `QUERY` resolve em uma fórmula só, lendo os três intervalos juntos.

**2. Fórmula corrigida**

Na célula `A1` da aba `consolidado`:

```
=QUERY(
  {meta_raw!A2:F; google_raw!A2:F; organico_raw!A2:F};
  "SELECT Col2, TEXT(Col1,'yyyy-MM'), SUM(Col3), SUM(Col4), SUM(Col5), SUM(Col6)
   WHERE Col1 IS NOT NULL
   GROUP BY Col2, TEXT(Col1,'yyyy-MM')
   LABEL Col2 'Canal', TEXT(Col1,'yyyy-MM') 'Mês', SUM(Col3) 'Investimento', SUM(Col4) 'Leads', SUM(Col5) 'Vendas', SUM(Col6) 'Receita'";
  0
)
```

**3. Explicação simples**
As chaves `{ ; }` empilham os três intervalos em uma pilha virtual (equivale a um `UNION ALL` de SQL). O `QUERY` trata essa pilha como uma tabela única e agrupa por canal + mês. `Col1`, `Col2`... referenciam as colunas pela posição, não pelo nome — porque o empilhamento não carrega cabeçalhos. `TEXT(Col1,'yyyy-MM')` normaliza a data para agrupamento mensal.

**4. Possíveis erros futuros**
- Se uma das três abas mudar a ordem das colunas (ex: alguém inverter `Leads` e `Vendas` em `google_raw`), o `QUERY` soma colunas erradas sem reclamar. Padronizar schema e documentar.
- Intervalo `A2:F` é aberto — se uma aba crescer além de alguma versão, ok. Mas se houver dados em `G`, `QUERY` ignora silenciosamente.
- Datas armazenadas como **texto** quebram o `TEXT()` — garantir que a coluna `Data` seja tipo data em todas as abas. `DATA.VALOR()` converte se necessário.
- Linhas em branco no meio do intervalo viram `NULL` e o `WHERE Col1 IS NOT NULL` filtra — mas se o usuário quiser preservar linhas com data vazia para outro fim, ajustar o filtro.

**5. Sugestão opcional de melhoria**
Se novos canais forem entrar (TikTok, Kwai, LinkedIn), trocar a pilha manual `{meta; google; organico}` por um padrão de aba única `dados_raw` onde cada linha já carrega o canal, e eliminar a consolidação. Isso é refactor — só vale se o pipeline de ingestão puder ser ajustado. Se não puder, o `QUERY` empilhado resolve bem até ~8 canais.

---

## Exemplo 6 — PROCV retornando `#N/A` mesmo com a chave existindo

### Input do usuário

> "Tô usando `=PROCV(A2; lista_clientes!A:E; 3; FALSO)` e dá `#N/A` em clientes que eu SEI que estão na lista. Conferi e o nome está igual."

### Output

**1. Diagnóstico**
`#N/A` com chave "aparentemente idêntica" quase sempre é um dos três culpados clássicos: (1) espaço em branco invisível no começo/fim, (2) diferença de tipo (número armazenado como texto vs número), ou (3) caracteres invisíveis vindos de copy-paste de sistemas externos. O PROCV compara byte-a-byte — "João" com espaço no fim é diferente de "João" sem.

**2. Fórmula corrigida**

Versão defensiva:

```
=SEERRO(PROCV(ARRUMAR(A2); ARRAYFORMULA(ARRUMAR(lista_clientes!A:E)); 3; FALSO); "—")
```

**3. Explicação simples**
`ARRUMAR` remove espaços extras do começo, fim e entre palavras (colapsa múltiplos espaços em um só). Aplicar tanto na chave quanto na tabela-fonte garante que "João " = "João" = "  João". O `ARRAYFORMULA` em volta força o `ARRUMAR` a atuar sobre o intervalo inteiro, não só a primeira célula. `SEERRO(...; "—")` cobre casos legítimos de não-encontrado.

**4. Possíveis erros futuros**
- Se o problema for **tipo** (número 1234 vs texto "1234"), `ARRUMAR` não resolve. Testar com `=ÉTEXTO(A2)` e, se for o caso, usar `VALOR(A2)` ou `TEXTO(A2; "0")` dependendo de qual lado está errado.
- Caracteres Unicode invisíveis (NBSP — `char(160)`) escapam do `ARRUMAR`. Usar `SUBSTITUIR(A2; CARACT(160); "")` antes.
- PROCV é case-insensitive no Sheets; se em algum momento migrar para `MATCH` com comparação exata, a lógica muda.

**5. Sugestão opcional de melhoria**
Substituir por `XLOOKUP`, que tem 4º argumento nativo para "não-encontrado" (dispensa `SEERRO`) e lê a coluna de busca independentemente da posição:
```
=XLOOKUP(ARRUMAR(A2); ARRAYFORMULA(ARRUMAR(lista_clientes!A:A)); lista_clientes!C:C; "—")
```
Mais legível e mais robusto quando alguém insere uma coluna nova no meio da tabela-fonte.

---

> exemplos.md · v1.0.0 · complementa `SKILL.md` da google-sheets-performance-specialist
