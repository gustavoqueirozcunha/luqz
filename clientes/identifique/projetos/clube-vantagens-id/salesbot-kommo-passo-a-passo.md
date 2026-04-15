# Configuração Salesbot Kommo — Clube de Vantagens ID

**Cliente:** Identifique Marcas e Patentes
**Canal:** WhatsApp Business API (conectado ao Kommo)
**Ferramenta:** Kommo Salesbot
**Data:** 2026-04-14

---

## PRÉ-REQUISITOS

Antes de montar o bot, confirmar:
- [ ] WhatsApp Business API conectado ao Kommo (não WhatsApp pessoal)
- [ ] Templates aprovados na Meta para mensagens de abertura
- [ ] Pipeline criado com as etapas do funil Identifique
- [ ] Campos personalizados criados no Kommo (lista abaixo)

### Campos Personalizados a criar antes de começar

Ir em **Configurações → Campos personalizados → Contatos** e criar:

| Nome do Campo | Tipo |
|--------------|------|
| Clube ID Branch | Lista (Acessou / Entendeu / Rejeitou) |
| Momento Declarado | Texto |
| Posicionamento Declarado | Texto |
| Monitoramento Ativo | Lista (Sim / Não / Não sabe) |
| Motivo Objeção | Texto |
| Clube ID Status | Lista (Entrou / Interessado / Saiu / Recontato) |

---

## ONDE CRIAR O SALESBOT

1. Ir em **Configurações → Salesbot**
2. Clicar em **"+ Novo bot"**
3. Nomear: `Clube de Vantagens ID`
4. Definir o gatilho de início (ver seção abaixo)

---

## GATILHO DE INÍCIO

**Opção recomendada:** Disparar manualmente por segmento de leads ou via campanha.

**Configuração do gatilho:**
- **Tipo:** "Lead entra na etapa" — selecionar a etapa de disparo da campanha Clube ID
- **Filtro adicional (opcional):** Tag = `clube-id-campanha` (para restringir só aos leads desta lista)

> **Dica:** Criar uma etapa temporária chamada "Clube ID — Disparo" no pipeline. Mover leads para essa etapa para ativar o bot.

---

## ESTRUTURA DO SALESBOT — BLOCO A BLOCO

### BLOCO 1 — Mensagem de Entrada (MSG_00)

**Tipo de bloco:** `Enviar mensagem` → tipo `Botões interativos`

**Texto da mensagem:**
```
Novidade chegando...

O Clube de Vantagens ID já está disponível.

Ele foi criado para empresários que querem ir além do básico: não apenas registrar, mas proteger, estruturar e valorizar seus ativos de propriedade industrial.

No Clube, você terá acesso a:
• oportunidades estratégicas
• conteúdos aplicados ao crescimento do negócio
• benefícios exclusivos dentro do ecossistema Identifique

Você já pode acessar e começar a aproveitar:
```

**Botões:**
- Botão 1: `Acessar Clube`
- Botão 2: `Entender melhor`
- Botão 3: `Não quero`

**Após enviar:** Conectar ao bloco de condição BLOCO 2.

---

### BLOCO 2 — Condição: qual botão foi clicado?

**Tipo de bloco:** `Condição`

**Lógica:**
```
SE resposta = "Acessar Clube" → ir para BLOCO 3A
SE resposta = "Entender melhor" → ir para BLOCO 3B
SE resposta = "Não quero" → ir para BLOCO 3C
```

> No Kommo Salesbot, a condição de botão é verificada pelo campo **"Última resposta do contato"** ou pelo evento de clique no botão interativo.

---

## RAMO A — ACESSAR CLUBE

### BLOCO 3A — Enviar Link

**Tipo de bloco:** `Enviar mensagem` → tipo `Texto`

```
Perfeito, {{contact.name}}.

Aqui está seu acesso ao Clube de Vantagens ID:
👉 https://chat.whatsapp.com/FdlSvVze4W74mOJ6JHID9s

Assim que entrar, me avisa com "ENTREI" que te mostro como aproveitar melhor.
```

**Ação adicional:** Conectar ao BLOCO 4A — Aguardar resposta.

---

### BLOCO 4A — Aguardar Keyword "ENTREI"

**Tipo de bloco:** `Aguardar resposta`

**Configuração:**
- Aguardar por: `48 horas`
- Se não responder em 48h: mover para `EXIT_SOFT` (BLOCO EXIT_1)

**Bloco de condição após resposta:**
```
SE mensagem contém "ENTREI" (case-insensitive) → ir para BLOCO 5A (Q1)
SE mensagem NÃO contém "ENTREI" → aguardar novamente (ou escalar para SDR)
```

**Ação adicional ao detectar "ENTREI":**
- Atualizar campo: `Clube ID Status` = `Entrou`
- Aplicar tag: `clube-id-entrou`

---

### BLOCO 5A — Pergunta Q1: Momento

**Tipo de bloco:** `Enviar mensagem` → tipo `Lista interativa` (4 opções)

> Usar Lista Interativa porque o WhatsApp Business API suporta máximo 3 botões em botões rápidos — para 4 opções, usar Lista.

**Texto:**
```
Parabéns.

O Clube ID vem te mostrar que o universo de blindagem vai muito além de registros.

Para te direcionar melhor, me oriente sobre o seu momento.

Hoje você quer:
```

**Opções da lista:**
1. Fortalecer a marca
2. Crescer e expandir
3. Evitar riscos e problemas
4. Oportunidades

**Ação após qualquer resposta:**
- Salvar resposta em: `Momento Declarado`
- Ir para: BLOCO 6A (Q2)

---

### BLOCO 6A — Pergunta Q2: Posicionamento

**Tipo de bloco:** `Enviar mensagem` → tipo `Botões interativos`

```
Sobre o seu produto/serviço, você atingiu o seu patamar de posicionamento ou precisa estruturar melhor:
```

**Botões:**
- Botão 1: `Estruturando`
- Botão 2: `Validado`
- Botão 3: `Quero expandir`

**Ação após qualquer resposta:**
- Salvar resposta em: `Posicionamento Declarado`
- Ir para: BLOCO 7A (Q3)

---

### BLOCO 7A — Pergunta Q3: Monitoramento

**Tipo de bloco:** `Enviar mensagem` → tipo `Botões interativos`

```
Última pergunta:

Você hoje acompanha a sua marca de forma ativa (monitoramento, risco, uso por terceiros, valorização de produtos)?
```

**Botões:**
- Botão 1: `Sim`
- Botão 2: `Não`
- Botão 3: `Não sei dizer`

**Após resposta:** Condição BLOCO 8A.

---

### BLOCO 8A — Condição Q3

```
SE resposta = "Sim" → BLOCO 9A_SIM
SE resposta = "Não" → BLOCO 9A_NAO
SE resposta = "Não sei dizer" → BLOCO 9A_NAO_SEI
```

**Ação:** Salvar resposta em `Monitoramento Ativo`.

---

### BLOCO 9A_SIM — Já Monitora

**Tipo:** `Enviar mensagem` → `Botões interativos`

```
Ótimo. Você já está à frente da maioria.

Agora o próximo nível é usar sua marca como ativo estratégico (expansão, proteção digital, aumentar valor).
```

**Botões:**
- Botão 1: `Ver oportunidades`
- Botão 2: `Falar com especialista`
- Botão 3: `Agora não`

**Condição pós-clique:**
```
SE "Ver oportunidades" → Atualizar Clube ID Status = "Interessado" + tag clube-id-quente + HANDOFF_SDR
SE "Falar com especialista" → HANDOFF_SDR
SE "Agora não" → EXIT_SOFT (BLOCO EXIT_1)
```

---

### BLOCO 9A_NAO — Não Faz Monitoramento

**Tipo:** `Enviar mensagem` → `Botões interativos`

```
Então hoje a sua marca está registrada… mas exposta.

A maioria dos empresários só descobre problema quando já perdeu espaço.

Quer ajustar isso:
```

**Botões:**
- Botão 1: `Quero diagnóstico`
- Botão 2: `Falar com especialista`
- Botão 3: `Me chame depois`

**Condição pós-clique:**
```
SE "Quero diagnóstico" → HANDOFF_SDR
SE "Falar com especialista" → HANDOFF_SDR
SE "Me chame depois" → FOLLOW_UP_7D (BLOCO FOLLOWUP)
```

---

### BLOCO 9A_NAO_SEI — Não Sabe

**Tipo:** `Enviar mensagem` → `Botões interativos`

```
Isso já indica um ponto de atenção.

Marca registrada sem gestão vira ativo vulnerável.

Melhor caminho:
```

**Botões:**
- Botão 1: `Fazer diagnóstico`
- Botão 2: `Falar com especialista`
- Botão 3: `Não quero`

**Condição pós-clique:**
```
SE "Fazer diagnóstico" → HANDOFF_SDR
SE "Falar com especialista" → HANDOFF_SDR
SE "Não quero" → EXIT_SOFT (BLOCO EXIT_1)
```

---

## RAMO B — ENTENDER MELHOR

### BLOCO 3B — Explicação do Clube

**Tipo:** `Enviar mensagem` → `Botões interativos`

```
Ótimo. O Clube de Vantagens ID não foi criado para ensinar o básico sobre registros — isso você já sabe.

Ele foi criado para o que vem depois.

A maioria dos empresários para no registro e é, exatamente, aí que começam os riscos e as oportunidades que quase ninguém enxerga.

Dentro do Clube, você vai ter acesso a conteúdos e direcionamentos práticos para:
• proteger seus ativos de forma contínua;
• evitar conflitos e perdas silenciosas;
• usar sua marca como ativo de crescimento;
• entender como se posicionar melhor no digital e no mercado.

Ou seja, não é só informação.
É visão estratégica aplicada ao seu negócio.

Faz sentido?
```

**Botões:**
- Botão 1: `Entrar no Clube`
- Botão 2: `Agora não`
- Botão 3: `Falar com especialista`

**Ação:**
```
SE "Entrar no Clube" → Atualizar campo Clube ID Branch = "Acessou" → ir para BLOCO 3A
SE "Agora não" → EXIT_SOFT (BLOCO EXIT_1)
SE "Falar com especialista" → HANDOFF_SDR
```

---

## RAMO C — NÃO QUERO

### BLOCO 3C — Coleta de Objeção

**Tipo:** `Enviar mensagem` → `Botões interativos`

```
Poxa, que pena!

Só pra eu entender — o que te fez não querer agora?
```

**Botões:**
- Botão 1: `Sem tempo`
- Botão 2: `Não vejo necessidade`
- Botão 3: `Não entendi o valor`

**Após resposta:** Condição BLOCO 4C.

---

### BLOCO 4C — Condição de Objeção

```
SE "Sem tempo" → BLOCO 5C_OBJ1
SE "Não vejo necessidade" → BLOCO 5C_OBJ2
SE "Não entendi o valor" → BLOCO 5C_OBJ3
```

**Ação:** Salvar resposta em `Motivo Objeção`.

---

### BLOCO 5C_OBJ1 — Sem Tempo

**Tipo:** `Enviar mensagem` → `Botões interativos`

```
Perfeito. Então vou ser direto.

O Clube não é algo para "acompanhar todo dia".

É para evitar decisões erradas que custam caro depois. Além disso, os conteúdos são relativos a todos os segmentos de gestão, liderança e financeiros, o que pode contribuir.

Em poucos minutos você já entende onde pode estar exposto.
```

**Botões:**
- Botão 1: `Entender melhor`
- Botão 2: `Deixo para depois`

**Condição:**
```
SE "Entender melhor" → BLOCO 3B
SE "Deixo para depois" → FOLLOW_UP_7D
```

---

### BLOCO 5C_OBJ2 — Não Vejo Necessidade

**Tipo:** `Enviar mensagem` → `Botões interativos`

```
Justo. A maioria dos empresários só vê necessidade quando já tem problema.

E normalmente envolve:
• uso indevido da marca
• bloqueio
• perda de espaço no mercado

Ou seja, deixar dinheiro na mesa.

O Clube foi criado exatamente para antecipar isso, inclusive em diversas outras frentes de gestão empresarial que não só PI.
```

**Botões:**
- Botão 1: `Entender melhor`
- Botão 2: `Agora não`

**Condição:**
```
SE "Entender melhor" → BLOCO 3B
SE "Agora não" → EXIT_SOFT
```

---

### BLOCO 5C_OBJ3 — Não Entendi o Valor

**Tipo:** `Enviar mensagem` → `Botões interativos`

```
Então deixa eu simplificar.

O Clube existe para três coisas:
• evitar perdas
• identificar riscos antes do problema
• mostrar oportunidades de crescimento e expansão

Não é sobre informação.
É sobre evitar prejuízo e gerar valor.
```

**Botões:**
- Botão 1: `Agora fez sentido`
- Botão 2: `Não quero`
- Botão 3: `Entender melhor`

**Condição:**
```
SE "Agora fez sentido" → BLOCO 3A (enviar link direto)
SE "Não quero" → EXIT_FINAL
SE "Entender melhor" → BLOCO 3B
```

---

## BLOCOS TERMINAIS

### BLOCO EXIT_1 — Saída Suave

**Tipo:** `Enviar mensagem` → `Texto`

```
Ter marca registrada é o começo.

O que você faz depois disso é o que define o valor do seu negócio.

Nosso time está disponível para contribuir no que mais precisar.

Até breve.
```

**Ações automáticas:**
- Atualizar campo: `Clube ID Status` = `Saiu`
- Aplicar tag: `clube-id-saida-soft`
- Criar tarefa: "Reativar em 30 dias — Clube ID" com data = hoje + 30

---

### BLOCO EXIT_FINAL — Saída Definitiva

> Sem mensagem.

**Ações automáticas:**
- Atualizar campo: `Clube ID Status` = `Saiu`
- Aplicar tag: `clube-id-desinteresse`
- Mover etapa: `Frio` ou `Perdido — Sem Interesse` (conforme pipeline)

---

### BLOCO FOLLOWUP — Recontato em 7 dias

> Sem mensagem imediata.

**Ações automáticas:**
- Aplicar tag: `clube-id-recontato-agendado`
- Criar tarefa: "Follow-up Clube ID — retomar em 7 dias" com data = hoje + 7
- Responsável da tarefa: SDR designado

---

### BLOCO HANDOFF_SDR — Transferência para Humano

> Sem mensagem automática (SDR assume a conversa).

**Ações automáticas:**
- Atualizar campo: `Clube ID Status` = `Interessado`
- Aplicar tag: `clube-id-quente`
- Mover etapa no pipeline: `Qualificado (MQL)` ou `Agendamento`
- Notificar SDR responsável (via atribuição de responsável no Kommo)
- Criar tarefa: "Lead quente Clube ID — contato imediato" com prazo = 1 hora

---

## CHECKLIST FINAL — ANTES DE ATIVAR

- [ ] Todos os campos personalizados criados no Kommo
- [ ] Templates de botão aprovados na Meta (para abertura de janela — MSG_00)
- [ ] Lista interativa testada no WhatsApp (para Q1 com 4 opções)
- [ ] Teste completo do fluxo com número de homologação
- [ ] SDR notificado e treinado sobre o que chega em HANDOFF_SDR
- [ ] Pipeline com etapa de disparo configurada
- [ ] Segmento de leads para disparo criado e revisado

---

## DICAS DE OPERAÇÃO

1. **Não ativar o bot em leads sem contexto** — usar apenas na lista segmentada da campanha Clube ID
2. **Monitorar as primeiras 50 disparos** antes de escalar
3. **Verificar taxa de bloqueio** após 24h do primeiro lote
4. **Revisar respostas livres** (leads que digitam em vez de clicar) — Salesbot pode não capturar corretamente sem keyword listener configurado
5. **Acompanhar conversão por ramo** (A/B/C) para identificar qual entrada converte mais
