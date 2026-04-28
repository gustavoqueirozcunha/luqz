# Mapa de Skills — Sistema LUQZ

> Índice centralizado. Antes de usar uma skill, consultar aqui.  
> Regra: skill não listada aqui = skill não existe para o sistema.

---

## DECISÃO RÁPIDA

```
Preciso criar visual?
  ├── MCP disponível + entrega final → canva
  ├── Imagem 4K / sujeito consistente → nano-banana-2
  └── Iteração rápida / exploração → image-ai-generator

Preciso publicar?
  ├── Instagram → instagram-publisher
  ├── ClickUp → clickup-torre-uploader (via luqz-documentacao)
  └── Email → resend

Preciso de dados da web?
  └── apify

Preciso construir backend ou SaaS?
  ├── Criar API do zero → fastify-api-builder
  ├── Debug Supabase (auth, RLS, schema) → supabase-setup-debug
  ├── Planejar MVP SaaS → saas-mvp-planner
  └── Conectar frontend à API → frontend-api-connector

Preciso fazer deploy ou resolver build antigo em produção?
  └── Easypanel / Docker Swarm / Traefik → easypanel-deploy-fix

Preciso suportar, diagnosticar ou replicar o sistema BDR de prospecção no n8n?
  └── Apify + Jina + GPT + Evolution API + Google Sheets → n8n-bdr-prospeccao

Preciso corrigir fórmula, calcular métrica ou montar dashboard em Google Sheets?
  └── CPL / ROAS / pacing / funil / #DIV/0 / #REF → google-sheets-performance-specialist

Preciso criar novo agente ou skill?
  ├── Novo agente → opensquad-agent-creator
  └── Nova skill → opensquad-skill-creator
```

---

## CATÁLOGO POR CATEGORIA

### DESIGN

| Skill | Arquivo | Quando usar | Tipo |
|-------|---------|-------------|------|
| `canva` | `skills/canva/SKILL.md` | Entrega visual final, templates de cliente, carrosseis, stories | MCP |
| `template-designer` | `skills/template-designer/SKILL.md` | Templates HTML customizados, landing pages, peças em código | AI |
| `image-ai-generator` | `skills/image-ai-generator/SKILL.md` | Geração rápida para iteração, exploração visual, moodboard | AI |
| `nano-banana-2` | `skills/nano-banana-2/SKILL.md` | Imagens 4K produção, consistência de sujeito, fundo transparente | Gemini |
| `image-creator` | `skills/image-creator/SKILL.md` | Criação de imagens genéricas | AI |
| `image-fetcher` | `skills/image-fetcher/SKILL.md` | Buscar e baixar referências visuais da web | Utility |

**Hierarquia de uso (design):**
1. `canva` — primeiro para entregas visuais (MCP disponível?)
2. `nano-banana-2` — quando qualidade máxima ou consistência de sujeito
3. `image-ai-generator` — quando velocidade importa mais que qualidade
4. `template-designer` — quando precisa de HTML/código

---

### INTEGRAÇÕES

| Skill | Arquivo | Quando usar | Tipo |
|-------|---------|-------------|------|
| `instagram-publisher` | `skills/instagram-publisher/SKILL.md` | Publicar posts/reels/stories aprovados no Instagram do cliente | Integration |
| `kommo-crm-setup` | `skills/kommo-crm-setup/SKILL.md` | Setup inicial, configuração de funis, automações no Kommo | Integration |
| `clickup-torre-uploader` | `skills/clickup-torre-uploader/SKILL.md` | Upload de documentos formatados no ClickUp | Integration |
| `resend` | `skills/resend/SKILL.md` | Disparo de emails (relatórios, notificações, comunicados) | Email |

**Regra crítica:** Publicação no ClickUp SEMPRE passa pelo `luqz-documentacao` antes de usar `clickup-torre-uploader`. Nunca acionar diretamente.

---

### BACKEND & SAAS

| Skill | Arquivo | Quando usar | Tipo |
|-------|---------|-------------|------|
| `fastify-api-builder` | `skills/fastify-api-builder/SKILL.md` | Criar API REST Node.js com Fastify 5 + Supabase + JWT do zero | Prompt |
| `supabase-setup-debug` | `skills/supabase-setup-debug/SKILL.md` | Configurar Supabase (schema, auth, RLS) e depurar erros de integração | Prompt |
| `saas-mvp-planner` | `skills/saas-mvp-planner/SKILL.md` | Evoluir sistema legado (planilhas/webhooks) para SaaS com auth e API | Prompt |
| `frontend-api-connector` | `skills/frontend-api-connector/SKILL.md` | Conectar React/Vite a API REST com JWT — auth hook, route guard, cliente HTTP | Prompt |

---

### AUTOMAÇÃO & N8N

| Skill | Arquivo | Quando usar | Tipo |
|-------|---------|-------------|------|
| `n8n-bdr-prospeccao` | `skills/n8n-bdr-prospeccao/SKILL.md` | Suporte, diagnóstico e replicação do sistema BDR B2B (Apify + Jina AI + GPT-4o-mini + Evolution API + Google Sheets) | Prompt |

---

### DEVOPS & INFRAESTRUTURA

| Skill | Arquivo | Quando usar | Tipo |
|-------|---------|-------------|------|
| `easypanel-deploy-fix` | `skills/easypanel-deploy-fix/SKILL.md` | Deploy de frontend em Easypanel (Docker Swarm + Traefik + Nixpacks); site mostra build antigo | Prompt |

---

### DADOS

| Skill | Arquivo | Quando usar | Tipo |
|-------|---------|-------------|------|
| `apify` | `skills/apify/SKILL.md` | Scraping de dados de concorrentes, referências, benchmarks | Scraping |
| `blotato` | `skills/blotato/SKILL.md` | [verificar uso específico no SKILL.md] | Utility |
| `google-sheets-performance-specialist` | `skills/google-sheets-performance-specialist/SKILL.md` | Corrigir fórmulas (#REF, #DIV/0, #VALUE), calcular CPL/ROAS/pacing, montar funil e dashboards em Google Sheets | Prompt |

---

### GERAÇÃO DO SISTEMA

| Skill | Arquivo | Quando usar | Tipo |
|-------|---------|-------------|------|
| `opensquad-agent-creator` | `skills/opensquad-agent-creator/SKILL.md` | Criar novo agente seguindo padrão .agent.md | Generator |
| `opensquad-skill-creator` | `skills/opensquad-skill-creator/SKILL.md` | Criar nova skill com documentação YAML completa | Generator |

---

## PADRÃO DE CRIAÇÃO DE NOVA SKILL

Toda skill nova segue esta estrutura obrigatória:

```
skills/[nome-kebab-case]/
├── SKILL.md          ← documentação principal
└── [outros arquivos se necessário]
```

Frontmatter obrigatório em `SKILL.md`:
```yaml
---
name: [nome-da-skill]
description: [Descrição em inglês]
description_pt-BR: [Descrição em português]
type: [mcp|api|generator|integration|utility]
version: "1.0.0"
categories: [lista de tags]
---
```

Seções obrigatórias no corpo:
- `## When to use` — casos de uso específicos
- `## Instructions` — como usar passo a passo
- `## Requirements` — dependências e pré-requisitos

Usar `opensquad-skill-creator` para gerar automaticamente.

---

## SKILLS INDISPONÍVEIS / MCP NÃO CONECTADO

Se uma skill MCP não estiver disponível na sessão:
1. Reportar ao usuário: "Skill [nome] requer MCP [servidor] — não conectado"
2. NÃO improvisar. NÃO simular.
3. Aguardar instrução do usuário.

Skills que requerem MCP ativo: `canva`  
Skills que requerem credenciais configuradas: `instagram-publisher`, `kommo-crm-setup`, `clickup-torre-uploader`, `resend`

---

> skills/MAPA-SKILLS.md — v1.0 | Sistema LUQZ | Abril 2026
