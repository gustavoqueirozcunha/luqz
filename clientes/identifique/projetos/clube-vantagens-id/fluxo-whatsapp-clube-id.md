# Fluxo WhatsApp API — Clube de Vantagens ID

**Cliente:** Identifique Marcas e Patentes
**Projeto:** Clube de Vantagens ID
**Tipo:** Fluxo conversacional com botões interativos (WhatsApp Business API)
**Data:** 2026-04-14

---

## MAPA DO FLUXO

```
[MSG_00] ENTRADA
    ├── [1] Acessar Clube ──────────────────────────────────────────────────┐
    ├── [2] Entender Melhor ──────────────────────────────────────────────┐ │
    └── [3] Não Quero ──────────────────────────────────────────────────┐ │ │
                                                                        │ │ │
[BRANCH_NQ] NÃO QUERO ◄─────────────────────────────────────────────────┘ │ │
    ├── [1] Sem Tempo → [OBJ_1] ──→ Entender Melhor → ──────────────────┤ │ │
    ├── [2] Não Vejo Necessidade → [OBJ_2] ──→ Entender Melhor → ───────┤ │ │
    └── [3] Não Entendi o Valor → [OBJ_3] ──→ Agora fez sentido → ─────┘ │ │
                                                                           │ │
[BRANCH_EM] ENTENDER MELHOR ◄──────────────────────────────────────────────┘ │
    ├── Entrar no Clube ──────────────────────────────────────────────────────┤
    ├── Agora Não → [EXIT_SOFT]                                               │
    └── Falar com Especialista → [HANDOFF_SDR]                                │
                                                                              │
[BRANCH_AC] ACESSAR CLUBE ◄───────────────────────────────────────────────────┘
    ├── [MSG_LINK] Envio do link do grupo
    ├── [WAIT] Aguarda "ENTREI"
    └── [QUALIFICAÇÃO]
         ├── Q1: Qual seu momento? (4 opções)
         ├── Q2: Posicionamento do produto? (3 opções)
         └── Q3: Faz monitoramento da marca? (3 opções)
              ├── [SIM] → Ver oportunidades / Falar com especialista / Agora não
              ├── [NÃO] → Quero diagnóstico / Falar com especialista / Me chame depois
              └── [NÃO SEI] → Fazer diagnóstico / Falar com especialista / Não quero
                   └── todos os terminais de interesse → [HANDOFF_SDR]
```

---

## MENSAGENS DO FLUXO

### MSG_00 — Mensagem de Entrada

> **Template:** `clube_id_lancamento`
> **Categoria:** Marketing
> **Tipo:** Texto com botões de resposta rápida

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
| ID | Label |
|----|-------|
| `btn_acessar` | Acessar Clube |
| `btn_entender` | Entender melhor |
| `btn_nao_quero` | Não quero |

---

### BRANCH_AC — Clicou em "Acessar Clube"

#### MSG_AC_01 — Envio do Link

```
Perfeito, {{nome}}.

Aqui está seu acesso ao Clube de Vantagens ID:
👉 https://chat.whatsapp.com/FdlSvVze4W74mOJ6JHID9s

Assim que entrar, me avisa com "ENTREI" que te mostro como aproveitar melhor.
```
> **Tipo:** Texto simples (sem botões — aguarda resposta livre "ENTREI")
> **Lógica:** Aguardar mensagem com keyword `ENTREI` (case-insensitive) por até 48h

---

#### MSG_AC_Q1 — Primeira Pergunta (disparada ao receber "ENTREI")

> **Template:** `clube_id_q1_momento`
> **Tipo:** Texto com botões de resposta rápida

```
Parabéns.

O Clube ID vem te mostrar que o universo de blindagem vai muito além de registros.

Para te direcionar melhor, me oriente sobre o seu momento.

Hoje você quer:
```
**Botões:**
| ID | Label |
|----|-------|
| `btn_q1_fortalecer` | Fortalecer a marca |
| `btn_q1_crescer` | Crescer e expandir |
| `btn_q1_evitar` | Evitar riscos e problemas |
| `btn_q1_oportunidades` | Oportunidades |

> **Lógica:** Qualquer resposta avança para Q2 (as 4 opções têm o mesmo próximo passo). Salvar resposta no campo `momento_declarado` do lead no Kommo.

---

#### MSG_AC_Q2 — Segunda Pergunta

> **Template:** `clube_id_q2_posicionamento`
> **Tipo:** Texto com botões de resposta rápida

```
Sobre o seu produto/serviço, você atingiu o seu patamar de posicionamento ou precisa estruturar melhor:
```
**Botões:**
| ID | Label |
|----|-------|
| `btn_q2_estruturando` | Estruturando |
| `btn_q2_validado` | Validado |
| `btn_q2_expandir` | Quero expandir |

> **Lógica:** Qualquer resposta avança para Q3. Salvar no campo `posicionamento_declarado`.

---

#### MSG_AC_Q3 — Terceira Pergunta

> **Template:** `clube_id_q3_monitoramento`
> **Tipo:** Texto com botões de resposta rápida

```
Última pergunta:

Você hoje acompanha a sua marca de forma ativa (monitoramento, risco, uso por terceiros, valorização de produtos)?
```
**Botões:**
| ID | Label |
|----|-------|
| `btn_q3_sim` | Sim |
| `btn_q3_nao` | Não |
| `btn_q3_nao_sei` | Não sei dizer |

> **Lógica:** Bifurca em 3 branches com mensagens e CTAs diferentes.

---

#### MSG_Q3_SIM — Já Monitora

```
Ótimo. Você já está à frente da maioria.

Agora o próximo nível é usar sua marca como ativo estratégico (expansão, proteção digital, aumentar valor).
```
**Botões:**
| ID | Label | Ação |
|----|-------|------|
| `btn_sim_oportunidades` | Ver oportunidades | → Link conteúdo / grupo |
| `btn_sim_especialista` | Falar com especialista | → HANDOFF_SDR |
| `btn_sim_agora_nao` | Agora não | → EXIT_SOFT |

---

#### MSG_Q3_NAO — Não Faz Monitoramento

```
Então hoje a sua marca está registrada… mas exposta.

A maioria dos empresários só descobre problema quando já perdeu espaço.

Quer ajustar isso:
```
**Botões:**
| ID | Label | Ação |
|----|-------|------|
| `btn_nao_diagnostico` | Quero diagnóstico | → HANDOFF_SDR |
| `btn_nao_especialista` | Falar com especialista | → HANDOFF_SDR |
| `btn_nao_depois` | Me chame depois | → FOLLOW_UP_7D |

---

#### MSG_Q3_NAO_SEI — Não Sabe

```
Isso já indica um ponto de atenção.

Marca registrada sem gestão vira ativo vulnerável.

Melhor caminho:
```
**Botões:**
| ID | Label | Ação |
|----|-------|------|
| `btn_nasei_diagnostico` | Fazer diagnóstico | → HANDOFF_SDR |
| `btn_nasei_especialista` | Falar com especialista | → HANDOFF_SDR |
| `btn_nasei_nao_quero` | Não quero | → EXIT_SOFT |

---

### BRANCH_EM — Clicou em "Entender Melhor"

#### MSG_EM_01

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
| ID | Label | Ação |
|----|-------|------|
| `btn_em_entrar` | Entrar no Clube | → MSG_AC_01 (mesmo fluxo do Acessar Clube) |
| `btn_em_agora_nao` | Agora não | → EXIT_SOFT |
| `btn_em_especialista` | Falar com especialista | → HANDOFF_SDR |

---

### BRANCH_NQ — Clicou em "Não Quero"

#### MSG_NQ_01 — Coleta de Objeção

```
Poxa, que pena!

Só pra eu entender — o que te fez não querer agora?
```
**Botões:**
| ID | Label |
|----|-------|
| `btn_obj_tempo` | Sem tempo |
| `btn_obj_necessidade` | Não vejo necessidade |
| `btn_obj_valor` | Não entendi o valor |

---

#### MSG_OBJ_1 — Objeção: Sem Tempo

```
Perfeito. Então vou ser direto.

O Clube não é algo para "acompanhar todo dia".

É para evitar decisões erradas que custam caro depois. Além disso, os conteúdos são relativos a todos os segmentos de gestão, liderança e financeiros, o que pode contribuir.

Em poucos minutos você já entende onde pode estar exposto.
```
**Botões:**
| ID | Label | Ação |
|----|-------|------|
| `btn_obj1_entender` | Entender melhor | → MSG_EM_01 |
| `btn_obj1_depois` | Deixo para depois | → FOLLOW_UP_7D |

---

#### MSG_OBJ_2 — Objeção: Não Vejo Necessidade

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
| ID | Label | Ação |
|----|-------|------|
| `btn_obj2_entender` | Entender melhor | → MSG_EM_01 |
| `btn_obj2_nao` | Agora não | → EXIT_SOFT |

---

#### MSG_OBJ_3 — Objeção: Não Entendi o Valor

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
| ID | Label | Ação |
|----|-------|------|
| `btn_obj3_fez_sentido` | Agora fez sentido | → MSG_AC_01 |
| `btn_obj3_nao` | Não quero | → EXIT_FINAL |
| `btn_obj3_entender` | Entender melhor | → MSG_EM_01 |

---

### TERMINAIS DO FLUXO

#### EXIT_SOFT — Saída Suave (Não Quero / Agora Não)

```
Ter marca registrada é o começo.

O que você faz depois disso é o que define o valor do seu negócio.

Nosso time está disponível para contribuir no que mais precisar.

Até breve.
```
> **Ação no Kommo:** Aplicar tag `clube-id-saida-soft` + mover para lista de reativação em 30 dias

---

#### EXIT_FINAL — Saída Definitiva

> **Sem mensagem adicional** — apenas registro no Kommo
> **Ação no Kommo:** Aplicar tag `clube-id-desinteresse` + campo `motivo_objecao` preenchido

---

#### FOLLOW_UP_7D — Agendamento de Recontato

> **Sem mensagem imediata**
> **Ação no Kommo:** Criar tarefa automática para contato em 7 dias + tag `clube-id-recontato-agendado`

---

#### HANDOFF_SDR — Transferência para Humano

> **Ação no Kommo:** Notificar SDR responsável + mover lead para etapa "Qualificado (MQL)" + tag `clube-id-quente`
> **Dado salvo:** resposta da Q3 + motivo declarado de interesse

---

## CAMPOS A PREENCHER NO KOMMO

| Campo | Tipo | Quando preencher |
|-------|------|-----------------|
| `clube_id_entrada` | Data | Ao receber botão inicial |
| `clube_id_branch` | Lista (Acessou/Entendeu/Rejeitou) | Conforme botão inicial |
| `momento_declarado` | Texto | Resposta Q1 |
| `posicionamento_declarado` | Texto | Resposta Q2 |
| `monitoramento_ativo` | Lista (Sim/Não/Não sabe) | Resposta Q3 |
| `motivo_objecao` | Texto | Resposta ao "Não Quero" |
| `clube_id_status` | Lista (Entrou/Interessado/Saiu/Recontato) | Conforme desfecho |

---

## TAGS GERADAS PELO FLUXO

| Tag | Quando aplicar |
|-----|---------------|
| `clube-id-entrou` | Enviou "ENTREI" |
| `clube-id-qualificado` | Completou Q1+Q2+Q3 |
| `clube-id-quente` | Pediu especialista ou diagnóstico |
| `clube-id-saida-soft` | Escolheu "Agora não" / "Me chame depois" |
| `clube-id-recontato-agendado` | Escolheu "Deixo para depois" |
| `clube-id-desinteresse` | Saída definitiva após objeções |

---

## NOTAS DE IMPLEMENTAÇÃO

### Kommo Salesbot
- Usar nó de "Botões interativos" para todas as mensagens com opções
- Configurar keyword listener para "ENTREI" (case-insensitive: entrei, Entrei, ENTREI)
- Usar variável `{{contact.name}}` para personalização do nome
- Configurar delay de 1–2 segundos entre mensagens sequenciais para humanizar

### WhatsApp API
- Templates de abertura de janela precisam de aprovação prévia da Meta (categoria: Marketing)
- Mensagens após resposta do lead estão dentro da janela de 24h — não precisam de template aprovado
- Botões de resposta rápida: máximo 3 botões por mensagem (exceto Q1 que tem 4 — usar lista interativa)

### n8n (se aplicável)
- Webhook receptor de eventos do WhatsApp
- Switch node para rotear por `button_reply.id` ou `list_reply.id`
- Atualizar campos do Kommo via API após cada resposta
- Criar tarefa de follow-up via Kommo API quando EXIT_SOFT ou FOLLOW_UP_7D
