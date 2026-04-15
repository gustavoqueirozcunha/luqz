# AUDITORIA TÉCNICA DA INFRAESTRUTURA DE AGENTES E AUTOMAÇÕES
## LUQZ Performance — Documento para Análise, Escala e Evolução

**Data de Geração:** 2026-04-09
**Versão:** 1.0
**Responsável pela Auditoria:** Claude Sonnet 4.6 (via Claude Code)
**Escopo:** Repositório OpenSquad + Repositório LUQZ

---

> **NOTA DE LEITURA:** Este documento foi gerado com base em análise completa dos dois diretórios de trabalho ativos. Serve como base para onboarding de novos agentes, auditoria de arquitetura e planejamento de evolução do sistema.

---

## 1. VISÃO GERAL DA INFRAESTRUTURA

### 1.1 Objetivo Principal

A infraestrutura tem como objetivo central **automatizar e padronizar a operação completa de uma assessoria B2B de alto ticket (LUQZ Performance)**, desde a criação de conteúdo e geração de demanda até a execução de estratégia comercial, utilizando agentes de IA orquestrados como força de trabalho digital.

A estrutura é composta por **dois repositórios complementares** que operam em camadas:

| Repositório | Camada | Função |
|---|---|---|
| **OpenSquad Renato Asse** | Motor de execução | Framework de orquestração de agentes (squads, pipelines, skills) |
| **Repositório LUQZ** | Camada de contexto e operação | Metodologia, clientes, produtos, protocolos de execução |

### 1.2 Problemas que a Estrutura Resolve Hoje

1. **Produção de conteúdo escalável:** Geração de carrosseis, copies, roteiros de vídeo, posts sem depender exclusivamente de equipe humana.
2. **Padronização de entrega:** Toda saída passa por QA Gate com 4 dimensões obrigatórias antes de chegar ao cliente.
3. **Contextualização automática:** Agentes operam com contexto profundo do cliente (persona, oferta, tom de voz, diretrizes) carregado antes de qualquer execução.
4. **Rastreabilidade operacional:** Cada execução gera state.json, logs em memories.md e runs.md — há histórico estruturado.
5. **Investigação de mercado:** Agentes Sherlock realizam análise de perfis de concorrentes e referências (Instagram, LinkedIn, Twitter/X, YouTube) de forma automatizada.
6. **Publicação direta:** Instagram Publisher publica carrosseis via Graph API sem intervenção humana após aprovação.

### 1.3 Áreas do Negócio Impactadas

| Área | Impacto |
|---|---|
| **Marketing / Demanda** | Planejamento de mídia, copy, roteiros, carrosseis, posts — automatizados via Squad Demanda |
| **Estratégia** | Briefing, arquitetura de receita, ICP — padronizados via Squad Estratégia e SYSTEM.md |
| **Comercial** | Processo mapeado (CRM Kommo), playbooks documentados |
| **Conteúdo** | Pipeline integrado luqz-conteudo e luqz-aquisicao-conversao |
| **Operações** | Protocolos de ativação, QA Gate, Protocolo de Boot automatizados |
| **Inteligência / QA** | Vera Veredicto revisa toda entrega antes de fechar o pipeline |

---

## 2. ESTRUTURA DE AGENTES

### 2.1 Agentes de Sistema (Nível Core — OpenSquad)

---

#### AGENTE: Arquiteto (`_opensquad/core/architect.agent.yaml`)

| Campo | Detalhe |
|---|---|
| **Nome** | Arquiteto 🧠 |
| **Tipo** | Estratégico / Infraestrutura |
| **Função Principal** | Criar, editar, listar e deletar squads dentro do OpenSquad |
| **Input** | Descrição de necessidade do usuário via linguagem natural |
| **Output** | Arquivo `squad.yaml`, agentes `.agent.md`, pipeline steps, arquivos de contexto do squad |
| **Ferramentas** | Write tool, Read tool, Bash (validação de caminhos) |
| **Dependências** | Discovery Prompt → Investigation (Sherlock) → Design Prompt → Build Prompt |
| **Princípios** | YAGNI, uma responsabilidade por agente, checkpoints obrigatórios, simplicidade máxima |

**Workflows Definidos:**
- `create-squad` → 4 fases: Discovery, Investigation, Design, Build
- `edit-squad` → Modificação cirúrgica de squad existente
- `list-squads` → Listagem formatada com status
- `delete-squad` → Confirmação dupla e exclusão segura

---

#### AGENTE: Runner Pipeline (`_opensquad/core/runner.pipeline.md`)

| Campo | Detalhe |
|---|---|
| **Nome** | Runner |
| **Tipo** | Execução / Orquestração |
| **Função Principal** | Executar pipelines de squads passo a passo, mantendo estado e garantindo qualidade |
| **Input** | `squad.yaml`, `squad-party.csv`, contexto da empresa, memória do squad |
| **Output** | Arquivos de cada passo, `state.json` atualizado, `memories.md`, `runs.md` |
| **Ferramentas** | Read, Write, Bash, todos os skills instalados |
| **Dependências** | Todos os agentes do squad em execução |

**Fases de Execução:**
1. Inicialização (leitura de squad.yaml e contextos)
2. Validação de skills
3. Criação de state.json (dashboard)
4. Loop de execução por passo (com retry automático)
5. Validação de saída de cada passo
6. User checkpoints obrigatórios
7. Handoff entre agentes (atualização de state.json)
8. Cleanup pós-conclusão (arquivamento, memória, relatórios)

**Regras Críticas:**
- Output Path Transformation: injeção de `run_id` e `version folder` automática
- Veto Conditions: bloqueia avanço se qualidade insuficiente
- Dashboard obrigatório antes e depois de cada passo

---

#### AGENTE: Discovery (`_opensquad/core/prompts/discovery.prompt.md`)

| Campo | Detalhe |
|---|---|
| **Nome** | Discovery Wizard |
| **Tipo** | Estratégico / Diagnóstico |
| **Função Principal** | Entender a necessidade do usuário para arquitetar o squad correto |
| **Input** | Descrição inicial do usuário (linguagem natural) |
| **Output** | Brief de squad: domínio detectado, skills necessários, contexto de referências |
| **Ferramentas** | Perguntas estruturadas (max 8) |
| **Dependências** | Alimenta Design Prompt; aciona Sherlock se perfis de referência identificados |

---

#### AGENTE: Design (`_opensquad/core/prompts/design.prompt.md`)

| Campo | Detalhe |
|---|---|
| **Nome** | Squad Architecture Designer |
| **Tipo** | Estratégico / Arquitetura |
| **Função Principal** | Desenhar a arquitetura do squad com agentes, artefatos, skills e pipeline |
| **Input** | Brief do Discovery + dados do Sherlock (se investigação rodou) |
| **Output** | Diagrama de squad com agentes, responsabilidades, artefatos e skills |
| **Ferramentas** | Consulta a boas práticas (`_opensquad/core/best-practices/`) |
| **Dependências** | Discovery → Design → Build |

---

#### AGENTE: Sherlock (4 variantes)

| Campo | Detalhe |
|---|---|
| **Nomes** | Sherlock Instagram / LinkedIn / Twitter / YouTube |
| **Tipo** | Pesquisa / Inteligência |
| **Função Principal** | Investigar perfis de referência ou concorrentes em redes sociais |
| **Input** | URL ou identificador de perfil + instruções compartilhadas (`sherlock-shared.md`) |
| **Output** | Relatório estruturado de análise de perfil (conteúdo, frequência, tom, formatos) |
| **Ferramentas** | Apify MCP (scraping), WebFetch |
| **Dependências** | Alimenta o Design Prompt com dados reais de referência |

---

### 2.2 Agentes Funcionais (Nível Negócio — Squads LUQZ)

---

#### AGENTE: Estela Estratégia 🧠

| Campo | Detalhe |
|---|---|
| **Squad** | luqz-estrategia / luqz-conteudo / luqz-aquisicao-conversao |
| **Tipo** | Estratégico |
| **Função Principal** | Definir arquitetura de performance, briefing editorial, estratégia de canal |
| **Input** | Contexto do cliente, objetivos de negócio, KPIs, fase atual do produto AP360 |
| **Output** | Estratégia de performance, briefing editorial, plano de canais, roadmap de conteúdo |
| **Ferramentas** | web_search, web_fetch |
| **Dependências** | Alimenta Márcio Mídia, Clara Copy, Rafael Roteiro |

---

#### AGENTE: Márcio Mídia 📋

| Campo | Detalhe |
|---|---|
| **Squad** | luqz-demanda / luqz-aquisicao-conversao |
| **Tipo** | Execução / Mídia |
| **Função Principal** | Planejar a distribuição paga e orgânica dos ativos produzidos |
| **Input** | Estratégia (Estela), ICP, oferta, canais disponíveis |
| **Output** | Plano de mídia estruturado com canais, formatos, frequência, budget |
| **Ferramentas** | web_search, web_fetch |
| **Dependências** | Recebe de Estela; alimenta Clara Copy e Rafael Roteiro com briefing de formato |

---

#### AGENTE: Clara Copy ✍️

| Campo | Detalhe |
|---|---|
| **Squad** | luqz-demanda / luqz-conteudo / luqz-aquisicao-conversao |
| **Tipo** | Criativo / Execução |
| **Função Principal** | Produzir copy de conversão para carrosseis, landing pages, anúncios, emails |
| **Input** | Briefing estratégico (Estela + Márcio), persona, oferta, tom de voz, diretrizes |
| **Output** | Copy estruturada por formato (carrossel, LP, anúncio, email) com hierarquia clara |
| **Ferramentas** | Boas práticas de copywriting |
| **Dependências** | Recebe briefing de Estela/Márcio; entrega para Designer Canva e Vera Veredicto |

**Princípios Clara Copy (7):**
1. Leitor sempre primeiro
2. Clareza antes de criatividade
3. Uma página, uma ação
4. Prova antes de promessa
5. Hierarquia visual de texto
6. Tom alinhado ao ICP
7. CTA específico, nunca genérico

**Voice Rules:**
- USAR: "você", verbos de ação, números, linguagem do ICP
- NUNCA USAR: "solução completa", "inovador", "revolucionário", "clique aqui" isolado
- Frases: max 20 palavras (landing page), max 12 palavras (slides de carrossel)

---

#### AGENTE: Rafael Roteiro 🎬

| Campo | Detalhe |
|---|---|
| **Squad** | luqz-demanda / luqz-conteudo / luqz-aquisicao-conversao |
| **Tipo** | Criativo / Execução |
| **Função Principal** | Produzir roteiros de vídeo (Reels, YouTube Shorts, stories em vídeo) |
| **Input** | Briefing de conteúdo, persona, objetivo do vídeo, canal de distribuição |
| **Output** | Roteiro completo com hook, desenvolvimento, CTA, indicações de câmera/corte |
| **Ferramentas** | Boas práticas de roteiro (youtube-script.md, instagram-reels.md) |
| **Dependências** | Recebe de Estela/Márcio; entrega para Vera Veredicto |

---

#### AGENTE: Designer Canva 🖼️

| Campo | Detalhe |
|---|---|
| **Squad** | luqz-demanda / luqz-conteudo |
| **Tipo** | Execução / Design |
| **Função Principal** | Criar layouts visuais de carrosseis, posts, apresentações via Canva MCP |
| **Input** | Copy de Clara Copy, especificações de design, identidade visual do cliente |
| **Output** | Design criado/editado no Canva, exportado em PNG/PDF |
| **Ferramentas** | Canva MCP (`mcp.canva.com/mcp`), image-fetcher, template-designer |
| **Dependências** | Recebe de Clara Copy; entrega para Vera Veredicto |

**Regras de Design (SYSTEM.md):**
- Obrigatório usar Canva Connect MCP — NUNCA apenas descrever
- Obrigatório escolher template ou criar do zero
- Estética: Minimalista, alto contraste, SaaS Dark Mode, referência Apple/Stripe/Linear
- Se MCP não disponível → PARAR e reportar erro (nunca improvisar)

---

#### AGENTE: Vera Veredicto ✅

| Campo | Detalhe |
|---|---|
| **Squad** | luqz-inteligencia / luqz-conteudo / luqz-aquisicao-conversao |
| **Tipo** | QA / Inteligência |
| **Função Principal** | Revisar e validar toda entrega antes de fechar o pipeline |
| **Input** | Todos os artefatos produzidos no pipeline |
| **Output** | Relatório de QA com aprovação ou lista de correções obrigatórias |
| **Ferramentas** | qa-gate.md, critérios de qualidade por cliente |
| **Dependências** | Última agente em todos os pipelines; bloqueia publicação se reprovado |

**QA Gate — 4 Dimensões:**
1. Estratégia — alinhado com produto/fase/trilha?
2. Copy — específico/premium ou genérico/comum?
3. Design — premium ou template amador?
4. Negócio — gera demanda qualificada? sustenta ticket High-Ticket?

---

## 3. FLUXOS E AUTOMAÇÕES

### 3.1 Fluxo Principal: Pipeline de Aquisição e Conversão (`luqz-aquisicao-conversao`)

```
[INPUT]
  └─ Briefing do cliente + contexto completo carregado

PASSO 1 → step-01-briefing-cliente
  Agente: Estela Estratégia
  Output: Briefing estruturado validado

PASSO 2 → step-02-estrategia-performance
  Agente: Estela Estratégia
  Output: Estratégia de performance (canais, funil, metas)

PASSO 3 → step-03-aprovacao-estrategia  [CHECKPOINT MANUAL]
  Output: Aprovação ou ajuste da estratégia pelo usuário

PASSO 4 → step-04-plano-midia
  Agente: Márcio Mídia
  Output: Plano de mídia com formatos e canais

PASSO 5 → step-05-copy-ativos
  Agente: Clara Copy
  Output: Copy de carrosseis, anúncios, landing pages

PASSO 6 → step-06-roteiros-video
  Agente: Rafael Roteiro
  Output: Roteiros completos

PASSO 7 → step-07-aprovacao-ativos  [CHECKPOINT MANUAL]
  Output: Aprovação dos ativos pelo usuário

PASSO 8 → step-08-revisao-final
  Agente: Vera Veredicto
  Output: QA aprovado ou lista de correções

[OUTPUT FINAL]
  └─ Ativos prontos para publicação/entrega ao cliente
```

**Pontos de Entrada:** Briefing do cliente (manual), contexto carregado do `/clientes/[cliente]/contexto/`
**Pontos de Saída:** Arquivos de copy, roteiros, designs (Canva), relatório QA
**Gargalos Identificados:** 2 checkpoints manuais obrigatórios (passos 3 e 7) — por design, mas adicionam latência

---

### 3.2 Fluxo de Criação de Squad (Meta-Fluxo)

```
/opensquad create <descrição>
  │
  ├─ Fase 1: Discovery
  │    └─ Wizard faz até 8 perguntas para entender necessidade
  │
  ├─ Fase 2: Investigation (opcional, se referências identificadas)
  │    └─ Sherlock analisa perfis nas redes sociais
  │
  ├─ Fase 3: Design
  │    └─ Arquiteto desenha agentes, artefatos, skills, pipeline
  │    └─ Consulta boas práticas relevantes
  │
  └─ Fase 4: Build
       └─ Geração automática de squad.yaml, agents/, pipeline/, data/
```

---

### 3.3 Fluxo de Publicação Instagram

```
[INPUT]
  └─ Imagens JPEG em squads/{squad}/output/images/
  └─ Caption em arquivo de draft

STEP 1 → Listar imagens, confirmar ordem com usuário [CHECKPOINT]
STEP 2 → Extrair caption do draft
STEP 3 → Dry-run do script (--dry-run flag)
STEP 4 → Aprovação do usuário [CHECKPOINT]
STEP 5 → Publicação via Graph API
         node --env-file=.env publish.js --images "{images}" --caption "{caption}"
STEP 6 → Salvar URL do post + Post ID

[OUTPUT]
  └─ Post publicado + registro do ID e URL
```

**Ferramentas:** Node.js, Instagram Graph API, ImgBB (hosting temporário de imagens)
**Variáveis de Ambiente:** `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`, `IMGBB_API_KEY`
**Limitações Hard-coded:** Apenas JPEG, 2-10 imagens, max 2200 chars, 25 posts/24h, exige Business Account

---

### 3.4 Fluxo de Boot de Projeto (Repositório LUQZ)

```
Comando: "Ativar protocolo padrão LUQZ. Cliente: X. Produto: Y."
  │
  ├─ 1. Carregar SYSTEM.md (lei central)
  ├─ 2. Carregar /Produtos/[produto]/ (metodologia AP360)
  ├─ 3. Carregar /clientes/[cliente]/contexto/ (5 arquivos)
  │      Hierarquia: diretrizes > oferta > persona > tom-de-voz > cliente
  ├─ 4. Identificar fase/semana/trilha atual
  ├─ 5. Validar prontidão (pendências? bloqueios?)
  ├─ 6. Gerar Relatório de Estado (template padrão)
  └─ 7. AGUARDAR APROVAÇÃO → só então executar

[REGRA ABSOLUTA: Camada 2 (execução) NUNCA acontece antes da Camada 1 (orquestração)]
```

---

### 3.5 Integração com N8N

**Endpoint Detectado:** `http://editor.luqz.com.br/api/v1/workflows/endVw2rhUyrmhcDj/executions`
**Token:** JWT armazenado em `.claude/settings.json`
**Status:** Configurado no sistema mas sem fluxos documentados dentro dos repositórios analisados. Ponto de atenção.

---

## 4. ESTRUTURA DE PROMPTS

### 4.1 Organização Atual

Os prompts estão organizados em **3 camadas hierárquicas:**

**Camada 1 — Core (Sistema OpenSquad)**
```
_opensquad/core/prompts/
  ├── discovery.prompt.md       → Wizard de criação de squads
  ├── design.prompt.md          → Arquitetura de squad
  ├── build.prompt.md           → Geração de arquivos
  ├── sherlock-instagram.md     → Investigador Instagram
  ├── sherlock-linkedin.md      → Investigador LinkedIn
  ├── sherlock-twitter.md       → Investigador Twitter/X
  ├── sherlock-youtube.md       → Investigador YouTube
  └── sherlock-shared.md        → Instruções base compartilhadas
```

**Camada 2 — Agentes de Squad (por squad)**
```
squads/[squad-name]/agents/
  └── [agente].agent.md         → Persona + regras + framework operacional
```

Exemplo documentado:
```
squads/luqz-aquisicao-conversao/agents/
  └── clara-copy.agent.md       → 7 princípios + framework 7 passos + voice guidance + output examples
```

**Camada 3 — Dados de Pipeline (contexto por squad)**
```
squads/[squad-name]/pipeline/data/
  ├── research-brief.md
  ├── domain-framework.md
  ├── quality-criteria.md
  ├── output-examples.md
  ├── anti-patterns.md
  └── tone-of-voice.md
```

**Camada 4 — Contexto de Cliente (Repositório LUQZ)**
```
clientes/[cliente]/contexto/
  ├── cliente.md           → Contexto geral do negócio
  ├── oferta.md            → Estrutura de ofertas
  ├── persona.md           → Mapa de personas
  ├── tom-de-voz.md        → Registro e vocabulário
  ├── diretrizes.md        → Restrições inegociáveis (MÁXIMA PRIORIDADE)
  └── qa-gate.md           → Checklist de qualidade
```

### 4.2 Padronização

**Existe padronização? SIM, parcialmente:**
- Agentes possuem estrutura comum: ID, nome, ícone, tipo, persona, princípios, framework operacional, critérios de decisão, voice guidance, output examples
- Skills possuem formato padrão (SKILL.md com seções: tipo, descrição, categorias, workflow, requisitos, limitações)
- Contextos de cliente seguem template fixo com 5 arquivos obrigatórios
- **Lacuna:** Não há schema/validação automática do formato dos agentes — depende de convenção manual

### 4.3 Armazenamento

| Tipo | Localização |
|---|---|
| Prompts de sistema | `_opensquad/core/prompts/` |
| Prompts de agentes | `squads/[squad]/agents/[agente].agent.md` |
| Contexto de cliente | `clientes/[cliente]/contexto/` |
| Boas práticas | `_opensquad/core/best-practices/` |
| Regras de sistema | `.agent/rules/opensquad.md` |
| Lei central | `Repositório LUQZ/SYSTEM.md` |

### 4.4 Versionamento

**Status atual:** Versionamento implícito via:
- `.opensquad-version` (versão do framework)
- Output paths com `run_id` e `version folder` injetados automaticamente
- `runs.md` por squad (histórico de execuções)
- **Lacuna:** Não há versionamento explícito de prompts individuais (sem git tag ou changelog por agente)

### 4.5 Acionamento

| Modo | Como é acionado |
|---|---|
| Via CLI OpenSquad | `/opensquad`, `/opensquad create`, `/opensquad run` |
| Via protocolo de boot LUQZ | `"Ativar protocolo padrão LUQZ. Cliente: X. Produto: Y."` |
| Via runner automático | Estado do squad.yaml + pipeline steps |
| Via skill específico | `node [skill_path]/scripts/publish.js ...` |

---

## 5. STACK TECNOLÓGICA

### 5.1 IDE e Ambiente de Desenvolvimento

| Ferramenta | Uso |
|---|---|
| **Claude Code (CLI)** | Ambiente principal de operação dos agentes — IDE + executor |
| **VSCode** | IDE de suporte (detectado via extensão Claude Code) |
| **Node.js** | Runtime para scripts de publicação e dashboard |
| **Vite + React + TypeScript** | Dashboard visual de monitoramento de squads |
| **Playwright** | Automação de browser (configurado, uso nos scripts de eval) |

### 5.2 Ferramentas de Automação

| Ferramenta | Uso | Status |
|---|---|---|
| **N8N** (editor.luqz.com.br) | Automações externas / webhooks | Configurado, fluxos não documentados aqui |
| **OpenSquad Framework** | Orquestração de agentes multi-squad | Ativo |
| **Instagram Graph API** | Publicação de carrosseis | Ativo (via instagram-publisher skill) |

### 5.3 CRM e Comercial

| Ferramenta | Uso |
|---|---|
| **Kommo** | CRM principal da LUQZ e clientes |
| **ClickUp** | Gestão de projetos |
| **WhatsApp Business API** | Relacionamento e automações de follow-up |

### 5.4 APIs e MCP Servers Conectados

| API / MCP | Skill | Função |
|---|---|---|
| **Canva MCP** (`mcp.canva.com/mcp`) | canva | Criar, editar, exportar designs |
| **Apify MCP** | apify | Web scraping e investigação de perfis (Sherlock) |
| **Resend** | resend | Envio de emails automatizados |
| **Instagram Graph API** | instagram-publisher | Publicar carrosseis |
| **ImgBB API** | instagram-publisher | Hosting temporário de imagens |
| **Claude API (Anthropic)** | — | Modelo base de todos os agentes |

### 5.5 Plataformas de Anúncios

| Plataforma | Status |
|---|---|
| **Meta Ads** | Documentado no contexto do cliente LUQZ-Performance |
| **Google Ads** | Documentado no contexto do cliente LUQZ-Performance |

### 5.6 Banco de Dados

| Tipo | Uso |
|---|---|
| **Sistema de arquivos (Markdown/YAML)** | Memória persistente de squads, contexto de clientes, state.json |
| **Sem banco relacional detectado** | Toda persistência é via arquivos estruturados |
| **Zustand (React)** | State management do dashboard em memória |

### 5.7 Skills Instalados (13 Total)

| # | Skill | Tipo | Função |
|---|---|---|---|
| 1 | apify | MCP | Web scraping / Sherlock |
| 2 | blotato | Script | Processamento de imagens |
| 3 | canva | MCP | Design automatizado |
| 4 | image-ai-generator | Script | Geração de imagens via IA |
| 5 | image-creator | Script | Criação de imagens |
| 6 | image-fetcher | Script | Busca de imagens stock |
| 7 | instagram-publisher | Node.js | Publicação Instagram |
| 8 | opensquad-agent-creator | Especial | Criar novos agentes |
| 9 | opensquad-skill-creator | Especial | Criar novos skills (com evals) |
| 10 | resend | MCP/Script | Envio de emails |
| 11 | template-designer | Script | Designer de templates |
| 12-13 | (2 não detalhados no inventário) | — | — |

---

## 6. PADRÕES E PROCESSOS

### 6.1 Padrão de Criação de Agentes

**Existe padrão definido: SIM**

Todo agente segue a estrutura:
```yaml
# [agente].agent.md
---
id: squads/[squad]/agents/[nome]
name: [Nome Completo]
icon: [emoji]
type: [tipo]
---

## Persona
[Quem é esse agente, como pensa, como age]

## Princípios
[Lista numerada de valores operacionais]

## Framework Operacional
[Passo a passo de como executa seu trabalho]

## Critérios de Decisão
[Quando usar X vs Y]

## Voice Guidance
[Sempre usar / Nunca usar / Tom]

## Output Examples
[Exemplos concretos de saída esperada]
```

**Processo de criação** via `opensquad-skill-creator`:
1. Capturar intent
2. Interview e pesquisa de edge cases
3. Escrever SKILL.md
4. Escrever prompts de teste
5. Executar evals automatizados
6. Iterar com feedback
7. Expandir test set

### 6.2 Padrão de Entrega

**Existe padrão de entrega: SIM**

Toda entrega obrigatoriamente:
1. Passa pelo QA Gate (4 dimensões: Estratégia, Copy, Design, Negócio)
2. Usa context-first: diretrizes > oferta > persona > tom-de-voz > cliente
3. Segue volume controlado: fatiamento por arquivo, max 3-5 peças por execução
4. Gera registro em `runs.md` e `memories.md`
5. Salva state.json com histórico de execução

### 6.3 Playbook e Metodologia

**SYSTEM.md** funciona como constituição operacional:
- Define lei central (6 regras absolutas + tolerância zero para violações)
- Define sequência obrigatória de boot (7 passos)
- Define hierarquia de contexto (5 níveis)
- Define modo dual de operação (Orquestração → Execução, nesta ordem)

**Protocolo AP360** (produto core):
- 6 meses / 24 semanas / 15 encontros
- 4 pilares: Conteúdo + Audiência + Demanda + Comercial
- Modalidade "Feito Com Você" nas trilhas + "Feito Para Você" na gestão
- Setup Caixa Rápido na Semana 4 (quick-win monetário)

**Boas Práticas** (`_opensquad/core/best-practices/`):
- 23 documentos cobrindo todos os formatos e canais
- Consultados automaticamente pelo Design Prompt ao arquitetar squads

---

## 7. LIMITAÇÕES ATUAIS

### 7.1 O que hoje não funciona bem

| # | Limitação | Impacto |
|---|---|---|
| 1 | **Identidade visual do cliente LUQZ incompleta** — cores e tipografia marcadas como `[PENDÊNCIA]` no `diretrizes.md` | Designer Canva não tem parâmetros visuais para executar com precisão |
| 2 | **N8N sem documentação interna** — endpoint e token existem, mas nenhum fluxo está documentado no repositório | Impossível auditar o que está rodando em automação externa |
| 3 | **Apenas 1 cliente real documentado** — estrutura de clientes existe para N clientes mas só LUQZ-Performance está ativo | Sistema sub-utilizado para escala multi-cliente |
| 4 | **Sem validação automática de formato de agentes** — o schema de agentes é mantido por convenção, não por validação | Risco de inconsistências ao criar novos agentes |
| 5 | **Dashboard em React não integrado ao fluxo de agentes** — existe código mas não há evidência de deploy ou uso ativo | Visualização em tempo real inacessível |

### 7.2 Onde há retrabalho

| Área | Retrabalho |
|---|---|
| Checkpoints manuais (passos 3 e 7 do pipeline) | Cada aprovação exige interação humana — não há rota de auto-aprovação com critérios objetivos |
| Boot de contexto | O protocolo de ativação (7 passos) é repetido integralmente a cada sessão — sem caching de sessão |
| Identidade visual | Design Canva pode produzir outputs que precisam ser refeitos por falta de referência visual formalizada |
| Especificações de design | Arquivo `especificacoes_design_carrosseis.md` existe separado das diretrizes — duplicação de contexto |

### 7.3 Onde depende de intervenção manual

| Etapa | Grau de Manualidade |
|---|---|
| Aprovação de estratégia (passo 3) | 100% manual |
| Aprovação de ativos (passo 7) | 100% manual |
| Confirmação de ordem das imagens (instagram-publisher) | 100% manual |
| Ativação do protocolo de boot LUQZ | Manual (comando de texto) |
| Atualização de cores/tipografia no diretrizes.md | Pendente — manual quando feito |
| Definição de fase/semana atual no contexto do cliente | Atualização manual obrigatória |

### 7.4 O que ainda não está escalável

| Item | Por que não escala |
|---|---|
| **Multi-cliente** | Estrutura existe mas operação real está em 1 cliente. Onboarding de novo cliente requer criação manual de 5 arquivos de contexto |
| **Paralelismo de squads** | Regra Antigravity Environment proíbe subagentes paralelos — squads rodam sequencialmente |
| **Automação de publicação multi-canal** | Instagram Publisher existe; LinkedIn, Twitter, YouTube não têm skill de publicação equivalente |
| **Relatórios de performance consolidados** | Inteligência/Squad 5 é estruturado mas não tem automação de coleta de dados (Meta Ads, Google Ads, CRM) |
| **Feedback loop comercial → demanda** | Não há automação que leve objeções do CRM Kommo de volta para ajustar copy/roteiros |

---

## 8. OPORTUNIDADES DE MELHORIA

### 8.1 Curto Prazo (Quick Wins)

| Oportunidade | Ação | Impacto |
|---|---|---|
| **Completar identidade visual LUQZ** | Preencher `[PENDÊNCIA]` de cores e tipografia no `diretrizes.md` | Elimina erro de Design Canva + aumenta consistência das entregas |
| **Documentar fluxos N8N** | Exportar e versionar os workflows N8N no repositório | Visibilidade total da automação externa |
| **Criar template de QA auto-aprovação** | Definir critérios objetivos que permitam Vera Veredicto fechar o pipeline sem checkpoint manual quando score > X | Reduz latência do pipeline |
| **Unificar especificações de design** | Mover `especificacoes_design_carrosseis.md` para dentro das diretrizes do cliente | Elimina duplicação de contexto |

### 8.2 Médio Prazo (Estruturais)

| Oportunidade | Ação | Impacto |
|---|---|---|
| **Skill de publicação LinkedIn** | Criar `linkedin-publisher` com autenticação OAuth + Graph API | Pipeline de distribuição multi-canal sem intervenção |
| **Onboarding automatizado de cliente** | Script que gera os 5 arquivos de contexto via perguntas estruturadas (similar ao Discovery Wizard) | Escalar de 1 para N clientes em horas, não dias |
| **Integração N8N → CRM Kommo → Squad Inteligência** | Webhook que traz dados de pipeline do Kommo para o Squad Inteligência | Fechar o loop comercial → ajuste de copy e estratégia |
| **Cache de contexto de sessão** | Salvar estado de boot em arquivo de sessão para não repetir os 7 passos a cada conversa | Reduz 3-5 minutos de overhead por sessão |
| **Validação de schema de agentes** | Script de lint que valida estrutura de cada `.agent.md` contra schema definido | Previne inconsistências em squads novos |

### 8.3 Longo Prazo (Escala e Produto)

| Oportunidade | Ação | Impacto |
|---|---|---|
| **Deploy do Dashboard React** | Build + deploy do `dashboard/` como app web ou Electron | Visibilidade em tempo real da operação dos squads |
| **Skill de coleta de métricas (Meta Ads / Google Ads)** | Integração com APIs de ads para alimentar Squad Inteligência automaticamente | Relatórios de performance sem coleta manual |
| **Feedback loop automático** | Agente que monitora taxas de conversão e propõe ajustes de copy via análise de A/B | Otimização contínua sem dependência humana |
| **Multi-tenant real** | Separar instâncias de OpenSquad por cliente com contextos isolados | Operar 10+ clientes simultâneos sem contaminação de contexto |
| **Versionamento de prompts** | Integrar git tags semânticos nos arquivos `.agent.md` para rastrear evolução de personas | Auditoria de qual versão do agente produziu qual resultado |
| **Squad de Outbound estruturado** | Agente que usa contexto de ICP + CRM para gerar sequências personalizadas de prospecção | Automação do topo do funil comercial |

### 8.4 O que está mal estruturado hoje

| Item | Problema | Solução Sugerida |
|---|---|---|
| Contexto N8N | Opaco — tokens e endpoints sem documentação de fluxo | Versionar workflows N8N no repositório |
| Identidade visual | `[PENDÊNCIA]` em produção | Definir e formalizar antes de nova rodada de design |
| Paralelismo proibido | Antigravity Environment limita throughput | Avaliar quando e se o paralelismo pode ser liberado com isolamento de contexto |
| Publicação multi-canal | Apenas Instagram tem skill real | Criar skills LinkedIn, YouTube |
| Memória entre sessões | Boot recomeça do zero a cada sessão | Implementar session state file |

---

## APÊNDICE A — MAPA DE DEPENDÊNCIAS ENTRE COMPONENTES

```
SYSTEM.md (lei)
    │
    └─ PROTOCOLO_ATIVACAO.md (boot)
         │
         └─ /clientes/[cliente]/contexto/ (contexto)
              │
              └─ Squad Runner
                   │
                   ├─ Estela Estratégia
                   │    └─ [estrategia] → Márcio Mídia
                   │                        └─ [plano mídia] → Clara Copy + Rafael Roteiro
                   │                                                  └─ [copy + roteiro] → Designer Canva
                   │                                                                           └─ [design] → Vera Veredicto
                   │                                                                                           └─ [QA] → OUTPUT
                   │
                   └─ state.json (dashboard de execução)
                        ├─ memories.md
                        └─ runs.md
```

---

## APÊNDICE B — GLOSSÁRIO TÉCNICO DO SISTEMA

| Termo | Definição |
|---|---|
| **Squad** | Conjunto de agentes colaborativos com objetivo compartilhado |
| **Pipeline** | Sequência ordenada de passos com handoffs entre agentes |
| **Skill** | Capacidade instalável que adiciona ferramentas a squads |
| **MCP** | Model Context Protocol — protocolo de integração de ferramentas externas ao Claude |
| **state.json** | Dashboard de execução em tempo real de um pipeline |
| **runs.md** | Log histórico de execuções de um squad |
| **memories.md** | Memória persistente de aprendizados de um squad |
| **QA Gate** | Barreira de qualidade 4D obrigatória antes de toda entrega |
| **Antigravity Environment** | Modo sem subagentes paralelos — execução sequencial garantida |
| **AP360** | Arquitetura de Performance 360 — produto core LUQZ (6 meses, 4 pilares) |
| **ICP** | Ideal Customer Profile |
| **MQL/SQL** | Marketing/Sales Qualified Lead |
| **Handoff** | Passagem estruturada de contexto e artefatos entre agentes |

---

## APÊNDICE C — CHECKLIST DE AUDITORIA

### Estado Atual dos Sistemas

| Componente | Status | Prioridade de Ação |
|---|---|---|
| SYSTEM.md / Lei Central | ✅ Completo | Manutenção |
| Protocolo de Ativação | ✅ Completo | Manutenção |
| Squad luqz-estrategia | ✅ Ativo | Manutenção |
| Squad luqz-demanda | ✅ Ativo | Manutenção |
| Squad luqz-conteudo | ✅ Ativo | Manutenção |
| Squad luqz-aquisicao-conversao | ✅ Ativo | Manutenção |
| Squad luqz-inteligencia | ✅ Ativo | Manutenção |
| Squad luqz-aquisicao | ⚠️ Em desenvolvimento | Concluir |
| Identidade visual LUQZ | ❌ Incompleta | URGENTE |
| N8N fluxos documentados | ❌ Não documentado | Alta |
| Dashboard React deployado | ❌ Não deployado | Média |
| Multi-cliente | ⚠️ Estrutura pronta, uso real = 1 | Média |
| LinkedIn Publisher | ❌ Não existe | Alta |
| Feedback loop CRM → Copy | ❌ Não existe | Alta |
| Versionamento de prompts | ⚠️ Implícito | Média |
| Validação de schema de agentes | ❌ Não existe | Média |

---

*Documento gerado em 2026-04-09 via análise automatizada por Claude Sonnet 4.6 (claude-sonnet-4-6). Para atualizar, re-executar análise completa dos repositórios.*
