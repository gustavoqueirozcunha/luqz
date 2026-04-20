---
name: saas-mvp-planner
description: Transforma sistema legado (planilhas, webhooks, URL tokens) em arquitetura SaaS com auth real, banco estruturado e API REST. Use ao evoluir MVP frágil para produto com multi-tenant e autenticação.
type: prompt
version: 1.0.0
categories:
  - saas
  - architecture
  - planning
---

# SaaS MVP Planner

## When to use

Use esta skill ao evoluir um sistema frágil (Google Sheets + webhooks + URLs públicas) para um produto SaaS com autenticação real, banco de dados estruturado e API própria. Cobre mapeamento do atual, design do MVP e ordem de execução.

## Instructions

### Fase 1 — Mapear o sistema atual

Antes de propor qualquer arquitetura, responder:
- Onde estão os dados hoje? (planilha, webhook, arquivo)
- Como é feito o acesso? (URL pública, token na query string, sem auth)
- Quais são os pontos de falha? (dado hardcoded, sem multi-tenant, sem histórico)

### Fase 2 — Definir schema mínimo (3 tabelas)

```sql
users       → autenticação (gerenciado pelo Supabase Auth)
clients     → tenant (cada cliente da agência)
records     → dados de performance/métricas
```

Não adicionar tabelas até o MVP estar funcionando.

### Fase 3 — Definir endpoints (máximo 5)

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/auth/login` | POST | Autenticação, retorna JWT |
| `/clients` | GET | Lista clientes (autenticado) |
| `/performance/:clientId` | GET | Métricas por cliente e período |
| `/health` | GET | Health check |

Qualquer endpoint além desses é escopo futuro.

### Fase 4 — Ordem de execução obrigatória

```
1. Auth funcional → testar login com curl/Postman
2. GET /clients funcionando → testar com token
3. GET /performance funcionando → testar com token
4. Migrar dados (script separado, não dentro da API)
5. Conectar frontend (último — API deve estar testada)
```

**Frontend nunca vem antes da API testada.**

### Fase 5 — Script de migração (separado da API)

A migração de dados do sistema legado para o novo banco é um script autônomo, nunca parte da API ou dos routes. Executar uma única vez, verificar resultado, descartar.

## Important rules

- MVP = 3 tabelas, 5 endpoints. Qualquer coisa além é backlog.
- Resolver auth antes de qualquer lógica de dados — sem auth funcional, nada avança
- Migração de dados é script separado e descartável
- Não construir frontend antes de ter API testada end-to-end
- Multi-tenant desde o início: toda query filtra por `client_id`

## Examples

**Input:** Dashboard de performance em Google Sheets com webhook n8n e token na URL

**Output MVP:**
- Supabase: tabelas `clients` + `performance_records`
- API: Fastify com `/auth/login`, `/clients`, `/performance/:clientId`
- Migração: script TypeScript/Node que lê webhook e insere no Supabase
- Frontend: React conectado à API com JWT
