---
name: kommo-crm-setup
description: >
  Sets up a complete CRM squad for a LUQZ client using Kommo. Covers agent file creation,
  squad structure, Kommo API authentication, custom field provisioning, pipeline stage creation,
  and Salesbot flow documentation. Use when onboarding a new client onto the CRM layer
  or creating a new Salesbot campaign from scratch.
description_pt-BR: >
  Configura um squad completo de CRM para um cliente LUQZ usando o Kommo. Cobre criação
  de agent file, estrutura de squad, autenticação na API do Kommo, provisionamento de campos
  personalizados, criação de etapas de pipeline e documentação de fluxo do Salesbot.
  Use ao onboarding de um novo cliente na camada de CRM ou ao criar uma nova campanha de Salesbot.
type: prompt
version: "1.0.0"
categories:
  - crm
  - kommo
  - whatsapp
  - squad-setup
---

# Kommo CRM Setup — Workflow

Use this skill when creating a CRM squad for a LUQZ client on Kommo. The skill covers two phases:
**Phase 1** — Squad architecture (files, agent, references)
**Phase 2** — Kommo infrastructure (API setup, custom fields, pipeline stages, Salesbot docs)

---

## Phase 1 — Squad Architecture

### Step 1.1 — Reference existing squads before creating

Before writing anything, read at least two existing agent files and one squad.yaml to match the project's conventions exactly:

```
squads/luqz-kommo/agents/bruno-crm.agent.md   ← CRM agent reference
squads/luqz-n8n/agents/n8n-designer.agent.md  ← another functional squad example
squads/luqz-kommo/squad.yaml                   ← squad config reference
```

Extract from these reads: frontmatter fields used, section structure, writing style, skill IDs referenced.

### Step 1.2 — Create the agent file

Path: `squads/luqz-kommo/agents/{agent-id}.agent.md`

Required frontmatter fields:

```yaml
---
id: {agent-id}
name: {Display Name}
title: {Role / Specialist Description}
icon: {emoji}
squad: luqz-kommo
execution: on-demand
skills:
  - web_fetch
  - web_search
---
```

Required body sections (in order):

1. **Persona** — Role definition, identity statement, communication style (brief, direct)
2. **Principles** — 5–7 numbered rules governing the agent's behavior in this domain
3. **Operational Framework** — Process steps, decision criteria
4. **CRM Framework** — Pipeline stages table, custom fields table, tags system
5. **WhatsApp Playbook** — Anti-block rules, message templates for key scenarios
6. **Segmentation Playbook** — How to segment the lead base in Kommo filters
7. **Funnel Optimization** — Benchmarks table, diagnostic by symptom
8. **Salesbot Framework** — 2+ pre-built flow patterns with block-by-block logic
9. **Output Template** — Exact format for agent responses
10. **Anti-Patterns** — What the agent must never do
11. **Quality Criteria** — Checklist for output validation
12. **Integration** — How this agent connects to other squads (n8n, estrategia, etc.)

### Step 1.3 — Create squad.yaml

Path: `squads/luqz-kommo/squad.yaml`

```yaml
squad:
  code: luqz-kommo
  name: Squad Kommo — CRM & Conversão WhatsApp
  type: functional

agents:
  - id: {agent-id}
    name: {Display Name}
    icon: {emoji}
    title: {Role}

skills:
  - web_fetch
  - web_search

data:
  - pipeline/data/kommo-standards.md
  - pipeline/data/whatsapp-boas-praticas.md
  - pipeline/data/funil-benchmarks.md
```

### Step 1.4 — Create reference data files

Three files are mandatory under `squads/luqz-kommo/pipeline/data/`:

| File | Contents |
|------|----------|
| `kommo-standards.md` | Pipeline naming conventions, minimum custom fields standard, tag system, stage movement rules, integrations |
| `whatsapp-boas-praticas.md` | Anti-block rules, volume limits, content rules, template structure, 24h window, humanization |
| `funil-benchmarks.md` | Conversion benchmarks per stage, dispatch volume limits, follow-up counts by temperature, base cleanup criteria |

### Step 1.5 — Update CLAUDE.md

Add the squad to the squad map table in `CLAUDE.md`:

```markdown
| luqz-kommo | CRM Kommo, segmentacao de leads e disparos WhatsApp | Funcional |
```

---

## Phase 2 — Kommo Infrastructure Setup

### Step 2.1 — Get API credentials

Ask the user for:
1. **Kommo URL** — Extract subdomain from browser URL: `{subdomain}.kommo.com`
2. **Long-lived token (JWT)** — Found at: Configurações → Integrações → [Integration name] → Chaves e escopos → Token de longa duração

> The JWT starts with `eyJ`. Do NOT use the "Chave secreta" (client secret) — that's for OAuth exchange, not API calls.

Save credentials to `clientes/{client}/credenciais/kommo.md` immediately. Never expose tokens in outputs.

### Step 2.2 — Test authentication

```bash
curl -s -w "\nHTTP:%{http_code}" \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  "https://{subdomain}.kommo.com/api/v4/account"
```

Expected: HTTP 200 with account JSON. If 401, the token is wrong — re-read Step 2.1.

From the account response, capture: `id` (account_id), `name`, `subdomain`.

### Step 2.3 — Map existing pipelines and stages

```bash
curl -s -H "Authorization: Bearer {TOKEN}" \
  "https://{subdomain}.kommo.com/api/v4/leads/pipelines"
```

For each pipeline, record: `id`, `name`, `is_main`, and the `id`+`name` of each status (stage).

Decide which pipeline will receive the campaign trigger stage (usually the MARKETING or dedicated campaign pipeline).

### Step 2.4 — Check existing custom fields

```bash
curl -s -H "Authorization: Bearer {TOKEN}" \
  "https://{subdomain}.kommo.com/api/v4/contacts/custom_fields"
```

List fields where `is_predefined = false`. Before creating any new field, verify it doesn't already exist by name.

### Step 2.5 — Create custom fields via API

Create fields one at a time (batch requests with mixed types may fail):

**Text field:**
```bash
curl -s -X POST \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '[{"name":"Field Name","type":"text","sort":100}]' \
  "https://{subdomain}.kommo.com/api/v4/contacts/custom_fields"
```

**Select field (with options):**
```bash
# Use \uXXXX unicode escapes for special characters (ã, ç, õ, etc.)
BODY='[{"name":"Field Name","type":"select","sort":101,"enums":[{"value":"Op\u00e7\u00e3o 1","sort":10},{"value":"Op\u00e7\u00e3o 2","sort":20}]}]'
echo "$BODY" | curl -s -X POST \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  --data-binary @- \
  "https://{subdomain}.kommo.com/api/v4/contacts/custom_fields"
```

> **Why unicode escapes:** Bash variable interpolation can corrupt UTF-8 characters (ã, ç) before curl sends them. Pipe the body via stdin with `--data-binary @-` and use `\uXXXX` escapes to avoid 400 Bad Request errors.

**Patch (fix name/enums after creation):**
```bash
curl -s -X PATCH \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"name":"Corrected Name"}' \
  "https://{subdomain}.kommo.com/api/v4/contacts/custom_fields/{field_id}"
```

Record each created field's `id` and enum `id`s in the credentials file.

### Step 2.6 — Create campaign trigger stage in pipeline

```bash
BODY='[{"name":"Campaign Name - Disparo","sort":25,"color":"#f9deff"}]'
echo "$BODY" | curl -s -X POST \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  --data-binary @- \
  "https://{subdomain}.kommo.com/api/v4/leads/pipelines/{pipeline_id}/statuses"
```

Record the stage `id`. This is the trigger stage: moving a lead to this stage fires the Salesbot.

### Step 2.7 — Check Salesbot API availability

```bash
curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer {TOKEN}" \
  "https://{subdomain}.kommo.com/api/v4/bots"
```

- **200** — Bots endpoint exists. List current bots. POST to `/api/v4/bots` is NOT supported (returns 405) — the Salesbot visual editor has no public creation API.
- **404** — Bots feature not available on this account plan.

**Conclusion:** The Salesbot flow (blocks, conditions, branches) must be configured manually in the Kommo visual editor. The API can only list existing bots and read basic metadata.

### Step 2.8 — Update credentials file

Update `clientes/{client}/credenciais/kommo.md` with all IDs collected:

```markdown
## Campos Personalizados — Contatos ({Campaign Name})

| Campo | ID | Tipo | Enums (ID: valor) |
|-------|-----|------|-------------------|
| {Field Name} | {id} | {type} | {enum_id}:{value}, ... |

## Etapa de Disparo — {Campaign Name}

| Campo | Valor |
|-------|-------|
| Pipeline | {pipeline_name} ({pipeline_id}) |
| Etapa | {stage_name} |
| ID da etapa | {stage_id} |
```

---

## Phase 3 — Salesbot Documentation

Once the infrastructure is ready, generate two documents in `clientes/{client}/projetos/{project}/`:

### Document 1: `fluxo-whatsapp-{project}.md`

Contents:
- ASCII flow map showing all branches and terminals
- All messages with exact copy, button labels, post-click logic
- Kommo fields and tags generated at each node
- Implementation notes for Salesbot, WhatsApp API, and n8n

### Document 2: `salesbot-kommo-passo-a-passo.md`

Contents:
- Pre-requisites checklist (WhatsApp API, templates, pipeline, custom fields)
- Where to create the Salesbot in Kommo (step count, naming)
- Trigger configuration (stage-based, optional tag filter)
- Every block described in order:
  - Block type (`Enviar mensagem`, `Condição`, `Aguardar resposta`)
  - Exact message copy
  - Button/list options with block routing
  - Field update and tag actions
- Terminal blocks (exit, handoff, follow-up)
- Activation checklist
- Operational tips

> **WhatsApp API limit:** Maximum 3 quick-reply buttons per message. For 4+ options (e.g., Q1 with 4 choices), specify `Lista Interativa` type in the Salesbot block — not `Botões Interativos`.

---

## Reference IDs (Identifique — Clube de Vantagens ID)

> Concrete example from the first implementation. Use these IDs when working on the Identifique account.

**Account:** `comercialidentifiquemarcasepatentescombr.kommo.com` | Account ID: `35431039`

**Pipeline MARKETING:** `13338296`
- Etapa `Clube ID - Disparo`: `104508012`

**Custom fields (Contacts):**

| Campo | ID | Tipo |
|-------|-----|------|
| Clube ID Branch | `3877759` | select |
| Momento Declarado | `3877757` | text |
| Posicionamento Declarado | `3877761` | text |
| Monitoramento Ativo | `3877765` | select |
| Motivo Objeção | `3877763` | text |
| Clube ID Status | `3877767` | select |

---

## Checklist — Full Setup

- [ ] Agent file created following existing squad conventions
- [ ] squad.yaml created with correct agents, skills, and data paths
- [ ] Three reference data files created in `pipeline/data/`
- [ ] CLAUDE.md squad map updated
- [ ] Kommo API authenticated (HTTP 200 on `/api/v4/account`)
- [ ] Pipelines and stages mapped
- [ ] Existing custom fields audited (no duplicates)
- [ ] All required custom fields created and IDs recorded
- [ ] Campaign trigger stage created and ID recorded
- [ ] Credentials file updated with all IDs
- [ ] `fluxo-whatsapp-{project}.md` created
- [ ] `salesbot-kommo-passo-a-passo.md` created with field names matching created fields
