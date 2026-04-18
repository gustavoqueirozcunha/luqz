# Sistema Operacional Inteligente LUQZ
## Arquitetura do Segundo Cérebro com IA

> Versão: 1.0 | Abril 2026  
> Este documento NÃO substitui o CLAUDE.md. Ele o complementa.

---

## 1. DIAGNÓSTICO DO ESTADO ATUAL

### O que já funciona
- CLAUDE.md como lei central com boot sequence obrigatória
- 9 clientes com estrutura de contexto padronizada (5 arquivos hierárquicos)
- 11 squads com 24 agentes nomeados e pipelines de 8 steps
- 16 skills integradas (Canva MCP, geradores de IA, integrações)
- QA Gate com 4 dimensões obrigatórias
- Framework Opensquad para geração automática de squads
- Dashboard visual para monitoramento em tempo real

### O que está incompleto
- `/Obsidian` configurado mas vazio — cérebro autoral sem uso
- `/clientes/[x]/historico/` existe em todos os clientes mas sem padrão de formato
- `/skills/` sem categorização — 16 skills em lista plana
- `/workflows/` com apenas 1 arquivo — subutilizado
- Nenhum padrão de output reutilizável documentado
- Sem fluxo explícito de Input → Processamento → Output
- Memória entre sessões depende de contexto carregado manualmente

---

## 2. ARQUITETURA DOS TRÊS NÍVEIS

```
┌─────────────────────────────────────────────────────────┐
│  NÍVEL 1: CÉREBRO AUTORAL                               │
│  /Obsidian — Pensamentos do usuário, não da IA          │
├─────────────────────────────────────────────────────────┤
│  NÍVEL 2: SISTEMA OPERACIONAL IA                        │
│  /squads + /skills + /workflows — Execução              │
├─────────────────────────────────────────────────────────┤
│  NÍVEL 3: CONTEXTO E MEMÓRIA                            │
│  /clientes + /Produtos — Base de conhecimento           │
└─────────────────────────────────────────────────────────┘
```

### Nível 1 — Cérebro Autoral (`/Obsidian`)
**Dono:** Usuário. A IA lê mas não escreve aqui.

Onde ficam:
- Decisões estratégicas da agência
- Aprendizados pessoais sobre clientes
- Visão de produto e posicionamento LUQZ
- Notas de reuniões estratégicas
- Reflexões sobre o sistema

Estrutura proposta (ver Seção 5):
```
Obsidian/
├── 00-SISTEMA/          ← Meta do sistema: como usar, mapas
├── 01-ESTRATEGIA/       ← Visão, posicionamento, ICP da LUQZ
├── 02-CLIENTES/         ← Um arquivo de inteligência por cliente
├── 03-APRENDIZADOS/     ← O que funcionou, o que não funcionou
└── 04-INBOX/            ← Captura rápida para processar depois
```

### Nível 2 — Sistema Operacional IA (`/squads`, `/skills`, `/workflows`)
**Dono:** Sistema. Usuário configura, IA executa.

Onde ficam:
- Agentes e pipelines (squads/)
- Capacidades integradas (skills/)
- Automações recorrentes (workflows/)
- Outputs de execução (squads/[x]/output/)

### Nível 3 — Contexto e Memória (`/clientes`, `/Produtos`)
**Dono:** Compartilhado. Usuário alimenta, IA consome.

Onde ficam:
- Contexto parametrizado de cada cliente (5 arquivos hierárquicos)
- Memória acumulada por cliente (historico/)
- Logs de reuniões e decisões (logs/)
- Produções aprovadas (projetos/ativos/)
- Especificações de produtos LUQZ (Produtos/)

---

## 3. MAPA DE ONDE CADA INFORMAÇÃO VIVE

| Tipo de Informação | Onde Vive | Quem Escreve | Quem Lê |
|---|---|---|---|
| Regras inegociáveis do sistema | `CLAUDE.md` | Usuário | Todos os agentes |
| Regras do cliente | `clientes/[x]/contexto/diretrizes.md` | Usuário | Agentes ao boot |
| Oferta do cliente | `clientes/[x]/contexto/oferta.md` | Usuário | luqz-estrategia, luqz-demanda |
| Tom de voz | `clientes/[x]/contexto/tom-de-voz.md` | Usuário | luqz-demanda, clara-copy |
| Briefing de reunião | `clientes/[x]/logs/call-N-ata.md` | Usuário/IA | Todos os agentes |
| Decisões estratégicas | `Obsidian/02-CLIENTES/[x].md` | Usuário | Usuário (não IA) |
| Aprendizados por cliente | `clientes/[x]/historico/memoria-cliente.md` | IA (após aprovação) | Todos os agentes |
| Outputs de produção | `clientes/[x]/projetos/ativos/` | IA | Usuário, luqz-documentacao |
| Estratégia de tráfego | `squads/luqz-aquisicao-conversao/output/` | IA | Usuário, marcio-midia |
| Especificação de produto | `Produtos/[x]/Metodologia-[x].md` | Usuário | Agentes ao boot |
| Fluxo automatizado | `workflows/[nome].json` | Usuário/N8N | luqz-n8n |
| Padrão de execução | `docs/padrao-outputs.md` | Usuário | Todos os agentes |
| Inteligência de skills | `skills/MAPA-SKILLS.md` | Usuário | Agentes ao selecionar skill |

### Regra de ouro: sem duplicação
- Informação de **cliente** → sempre em `/clientes/[x]/`
- Informação de **produto** → sempre em `/Produtos/[x]/`
- Informação de **execução** → sempre em `/squads/[x]/output/`
- Informação **autoral do usuário** → sempre em `/Obsidian/`
- Nunca escrever a mesma coisa em dois lugares

---

## 4. FLUXO OPERACIONAL DO DIA A DIA

### Fluxo A — Demanda de Cliente (mais comum)

```
INPUT
  └── Briefing / Reunião / Demanda
        │
        ▼
CAPTURA  [clientes/[x]/logs/call-N-briefing.md]
  └── Usuário descreve o que foi pedido
        │
        ▼
BOOT SEQUENCE  (obrigatório — CLAUDE.md seção 3)
  ├── 1. Identificar produto ativo
  ├── 2. Carregar contexto do cliente (5 arquivos)
  ├── 3. Localizar fase + trilha no cronograma
  └── 4. Validar: esta entrega pertence a esta fase?
        │
        ▼
ORQUESTRAÇÃO  (luqz-estrategia / Estela)
  └── Define: o quê, por quê, como, quem executa
        │
        ▼
EXECUÇÃO  (squad adequado)
  ├── luqz-conteudo → carrosseis, posts orgânicos
  ├── luqz-aquisicao-conversao → ativos de marketing
  ├── luqz-demanda → copy, roteiros, design
  └── luqz-n8n → automações
        │
        ▼
QA GATE  (luqz-inteligencia / Vera)
  ├── Estratégia ✓  Copy ✓  Design ✓  Negócio ✓
  └── Reprovado? → Refazer internamente. Nunca entregar.
        │
        ▼
OUTPUT  [clientes/[x]/projetos/ativos/ ou squads/[x]/output/]
        │
        ▼
PUBLICAÇÃO  (luqz-documentacao / Davi)
  └── Formata → publica no ClickUp
        │
        ▼
MEMÓRIA  [clientes/[x]/historico/memoria-cliente.md]
  └── Registrar: o que foi feito, o que funcionou, aprendizado
```

### Fluxo B — Diagnóstico de Conta (semanal/mensal)

```
INPUT: Dados de performance (Meta Ads / Google Ads)
  └── [clientes/[x]/logs/diagnostico-semana-N.md]
        │
        ▼
ANÁLISE  (luqz-estrategia / Estela + marcio-midia)
  └── Carrega: historico/ + logs/ + oferta.md
        │
        ▼
OUTPUT PADRONIZADO  [docs/padrao-outputs.md → template diagnostico]
  └── 1. Situação atual  2. Gaps  3. Hipóteses  4. Ações
        │
        ▼
DECISÃO  → documentada em [clientes/[x]/historico/decisoes.md]
```

### Fluxo C — Onboarding de Novo Cliente

```
INPUT: Cliente novo confirmado
        │
        ▼
COPIAR _TEMPLATE_CLIENTE → clientes/[NOME_CLIENTE]/
        │
        ▼
PREENCHER contexto/ (5 arquivos obrigatórios)
  ├── diretrizes.md  ← primeiro e mais importante
  ├── oferta.md
  ├── persona.md
  ├── tom-de-voz.md
  └── cliente.md
        │
        ▼
CONFIGURAR design/ (sistema visual + templates)
        │
        ▼
CRIAR entrada em Obsidian/02-CLIENTES/[NOME].md
  └── Impressão inicial, decisões estratégicas, notas pessoais
        │
        ▼
INICIAR logs/onboarding.md
  └── Registro cronológico do processo de onboarding
```

---

## 5. ESTRUTURA DO CÉREBRO AUTORAL (OBSIDIAN)

O Obsidian é para o **usuário pensar**, não para a IA produzir.

### Estrutura proposta

```
Obsidian/
├── 00-SISTEMA/
│   ├── como-usar.md          ← Este manual simplificado
│   ├── mapa-do-sistema.md    ← Visão geral de tudo (atualizar mensalmente)
│   └── decisoes-estruturais.md ← Log de decisões sobre o sistema
│
├── 01-ESTRATEGIA/
│   ├── visao-luqz.md         ← Onde a agência quer chegar
│   ├── icp-luqz.md           ← Quem é o cliente ideal da LUQZ
│   ├── posicionamento.md     ← Diferencial, promessa, mensagem
│   └── prioridades-trimestre.md ← O que está em foco agora
│
├── 02-CLIENTES/
│   ├── _INDEX.md             ← Lista de todos os clientes + status rápido
│   ├── [CLIENTE-1].md        ← Inteligência autoral sobre este cliente
│   ├── [CLIENTE-2].md
│   └── ...
│
├── 03-APRENDIZADOS/
│   ├── o-que-funciona.md     ← Padrões de sucesso identificados
│   ├── o-que-nao-funciona.md ← Erros, antipadrões, lições aprendidas
│   └── hipoteses-ativas.md   ← O que estou testando agora
│
└── 04-INBOX/
    └── [capture rápido — processar semanalmente]
```

### Padrão de nota de cliente em Obsidian (não confundir com `/clientes/`)

```markdown
# [Nome do Cliente] — Inteligência Autoral

## Impressão pessoal
[O que você sente sobre este cliente, sua situação real]

## O que os dados não mostram
[Contexto humano, conversas off-record, dinâmicas implícitas]

## Hipóteses estratégicas
[O que você acredita que vai funcionar para este cliente]

## Decisões tomadas e por quê
[Registro das suas decisões, não da IA]

## Próximo movimento
[O que você quer testar ou avaliar]
```

---

## 6. SISTEMA DE MEMÓRIA POR CLIENTE

Cada cliente tem três camadas de memória:

### Camada 1 — Contexto estático (`contexto/`)
Atualizado raramente. Muda só quando o negócio muda.
- diretrizes, oferta, persona, tom-de-voz, cliente.md

### Camada 2 — Registro operacional (`logs/`)
Atualizado a cada interação.
- `call-N-ata.md` → transcrição/resumo de cada reunião
- `call-N-roteiro.md` → roteiro preparatório
- `diagnostico-semana-N.md` → análise de performance
- `briefing-N.md` → demandas recebidas

### Camada 3 — Memória acumulada (`historico/`)
Atualizado após execuções significativas. Usa formato padronizado.
- `memoria-cliente.md` → arquivo principal de memória (ver template)
- `decisoes.md` → log de decisões estratégicas tomadas

### Como a IA acessa a memória

No boot sequence, após carregar `contexto/`, a IA DEVE:
1. Verificar se existe `historico/memoria-cliente.md`
2. Se existir, carregar ANTES de executar qualquer produção
3. Usar os aprendizados registrados para parametrizar a entrega

Isso evita repetir erros, reaprender o que já foi descoberto, e gerar conteúdo inconsistente com histórico anterior.

---

## 7. ORGANIZAÇÃO DAS SKILLS

### Mapa por categoria

```
skills/
├── MAPA-SKILLS.md              ← Índice centralizado (ver arquivo separado)
│
├── [DESIGN]
│   ├── canva/                  ← MCP Canva (prioritário para entregas visuais)
│   ├── template-designer/      ← Templates HTML customizados
│   ├── image-ai-generator/     ← Geração rápida para iteração
│   ├── nano-banana-2/          ← Imagens 4K sujeito consistente (produção)
│   ├── image-creator/          ← Criação de imagens
│   └── image-fetcher/          ← Busca e download de referências
│
├── [INTEGRAÇÕES]
│   ├── instagram-publisher/    ← Publicação automatizada Instagram
│   ├── kommo-crm-setup/        ← Setup e integração CRM Kommo
│   ├── clickup-torre-uploader/ ← Upload para ClickUp (via luqz-documentacao)
│   └── resend/                 ← Envio de emails
│
├── [DADOS]
│   └── apify/                  ← Scraping estruturado de dados
│
└── [GERAÇÃO DO SISTEMA]
    ├── opensquad-agent-creator/ ← Criar novos agentes automaticamente
    └── opensquad-skill-creator/ ← Criar novas skills automaticamente
```

### Regra de seleção de skill

```
Precisa de visual?
  → Tem MCP Canva disponível? → USE canva/
  → É para produção final (4K)? → USE nano-banana-2/
  → É para iteração rápida? → USE image-ai-generator/

Precisa publicar?
  → Instagram? → USE instagram-publisher/
  → ClickUp? → SEMPRE via luqz-documentacao → USE clickup-torre-uploader/
  → Email? → USE resend/

Precisa de dados externos?
  → USE apify/

Precisa criar novo agente/skill?
  → USE opensquad-agent-creator/ ou opensquad-skill-creator/
```

---

## 8. SQUADS E O CÉREBRO

### Como cada squad usa o cérebro

| Squad | Lê | Escreve |
|---|---|---|
| luqz-estrategia | contexto/ + historico/ + Produtos/ | estrategia em squads/output/ |
| luqz-demanda | contexto/ + tom-de-voz.md + design/ | projetos/ativos/ |
| luqz-inteligencia | tudo (para validar) | veredicto em estado interno |
| luqz-conteudo | contexto/ + historico/ + design/templates/ | projetos/conteudo/ |
| luqz-aquisicao-conversao | contexto/ + historico/ + Produtos/ | squads/output/ |
| luqz-kommo | contexto/ + logs/ | automações CRM |
| luqz-gestor-projetos | tudo (visão macro) | relatórios no ClickUp |
| luqz-n8n | workflows/ | fluxos automatizados |
| luqz-documentacao | qualquer output aprovado | ClickUp formatado |

### Regra de compartilhamento entre squads

Squads NÃO se comunicam diretamente. A comunicação acontece via:
1. **Arquivos de output** → squad A produz → salva em path conhecido → squad B lê
2. **State.json** → estado do pipeline (já implementado)
3. **historico/memoria-cliente.md** → memória compartilhada do cliente

---

## 9. PADRÃO DE OUTPUTS

Ver arquivo completo: `docs/padrao-outputs.md`

### Tipos de output e onde vivem

| Tipo | Template | Destino Final |
|---|---|---|
| Estratégia de tráfego | `output-estrategia-trafego.md` | squads/luqz-aquisicao-conversao/output/ |
| Diagnóstico de conta | `output-diagnostico.md` | clientes/[x]/logs/ |
| Planejamento de campanha | `output-campanha.md` | clientes/[x]/projetos/ativos/ |
| Análise de desempenho | `output-analise-desempenho.md` | clientes/[x]/logs/ |
| Carrossel | `output-carrossel.md` | clientes/[x]/projetos/conteudo/ |
| Copy de anúncio | `output-copy-anuncio.md` | clientes/[x]/projetos/ativos/ |
| Roteiro de vídeo | `output-roteiro.md` | clientes/[x]/projetos/conteudo/ |

---

## 10. MELHORIAS ESTRUTURAIS (SEM QUEBRAR O SISTEMA)

### Prioridade Alta — Implementar agora

1. **Criar `clientes/_TEMPLATE_CLIENTE/historico/memoria-cliente.md`**
   - Template padrão para memória acumulada
   - Copiar para todos os clientes ativos que não têm

2. **Criar `skills/MAPA-SKILLS.md`**
   - Índice categorizado das 16 skills
   - Tabela de decisão rápida (quando usar cada uma)

3. **Estruturar `/Obsidian` com as 5 pastas propostas**
   - Criar arquivos-semente em cada pasta
   - NÃO migrar conteúdo de `/clientes/` para cá

4. **Criar `docs/padrao-outputs.md`**
   - Templates reutilizáveis para 7 tipos de output
   - Referenciado no CLAUDE.md

### Prioridade Média — Próximas semanas

5. **Padronizar `/clientes/[x]/logs/`** para todos os clientes ativos
   - Garantir que toda reunião gera um `call-N-ata.md`

6. **Adicionar ao boot sequence** a verificação de `historico/memoria-cliente.md`
   - Atualizar CLAUDE.md seção 3 (Boot Sequence) com este passo

7. **Criar `workflows/diagnostico-semanal.json`**
   - Automação N8N para análise de performance recorrente

### Prioridade Baixa — Evolução futura

8. **Criar `docs/inteligencia-entre-clientes.md`**
   - Padrões que funcionam em múltiplos clientes
   - Alimentado manualmente após aprendizados validados

9. **Implementar `squads/[x]/_memory/` em todos os squads**
   - Atualmente existe em alguns — padronizar em todos

---

## 11. CHECKLIST DE ATIVAÇÃO

Para ativar o Segundo Cérebro, execute nesta ordem:

- [ ] Criar arquivos do `/Obsidian` (5 pastas + arquivos-semente)
- [ ] Criar `clientes/_TEMPLATE_CLIENTE/historico/memoria-cliente.md`
- [ ] Copiar `memoria-cliente.md` para todos os clientes ativos
- [ ] Criar `skills/MAPA-SKILLS.md`
- [ ] Criar `docs/padrao-outputs.md` com os 7 templates
- [ ] Preencher `Obsidian/02-CLIENTES/_INDEX.md` com os clientes atuais
- [ ] Preencher `Obsidian/01-ESTRATEGIA/visao-luqz.md`
- [ ] Revisar CLAUDE.md seção 3 para incluir verificação de `historico/`

---

> Sistema Operacional Inteligente LUQZ — v1.0  
> Documento vivo: atualizar quando a estrutura mudar.
