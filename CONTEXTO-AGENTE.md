# Contexto Operacional — LUQZ Cockpit
> Documento para handoff entre agentes. Gerado em 21/04/2026.

---

## Stack

| Camada | Tecnologia | URL |
|--------|-----------|-----|
| Frontend | React + Vite + TypeScript | https://cockpit.luqz.com.br |
| Backend | Fastify + Node 20 | https://api.luqz.com.br |
| Auth + DB | Supabase | ppnfxvfkhcyzsmagsuys.supabase.co |
| Automações | n8n | https://editor.luqz.com.br |
| Infra | EasyPanel (projeto: n8nnovo) | VPS com Docker Swarm + Traefik |

---

## Estrutura de pastas

```
luqz/
├── luqz-api/          # Backend Fastify
│   ├── routes/        # auth.js, dashboard.js, internal.js, performance.js, clients.js
│   ├── services/      # supabase.js, intelligence.js, normalizer.js, n8n.js
│   └── middleware/    # auth.js (JWT + tenant)
├── luqz-cockpit/      # Frontend React
│   ├── src/
│   │   ├── app/pages/ # Dashboard, Operacao, Alertas, Documentos, DetalheCliente, PainelCliente
│   │   ├── hooks/     # usePerformance.ts
│   │   ├── services/  # api.ts, performanceService.ts
│   │   └── types/     # cockpit.ts
│   ├── .env           # VITE_API_URL=https://api.luqz.com.br
│   └── Dockerfile     # multi-stage: node build + nginx serve
└── deploy/
    └── env-producao.example
```

---

## Deploy

### Backend (luqz-api)
- EasyPanel → n8nnovo → luqz-api
- Tipo: **Nixpacks** (auto-detecta Node)
- Porta: **3005**
- Deploy: upload de `luqz-api/` como `.tar.gz` (sem node_modules)
- Comando: `cd luqz && tar --exclude="luqz-api/node_modules" -czf api.tar.gz luqz-api`

### Frontend (cockpit)
- EasyPanel → n8nnovo → cockpit
- Tipo: **Dockerfile** (multi-stage Vite build + nginx)
- Porta: **80**
- Deploy: upload de `luqz-cockpit/` como `.tar.gz` (sem node_modules, sem dist)
- Comando: `cd luqz && tar --exclude="luqz-cockpit/node_modules" --exclude="luqz-cockpit/dist" -czf cockpit.tar.gz luqz-cockpit`
- **CRÍTICO**: o `.env` com `VITE_API_URL` deve estar no tar para o Vite ler em build time

---

## Variáveis de ambiente (EasyPanel → luqz-api → Ambiente)

```
PORT=3005
SUPABASE_URL=https://ppnfxvfkhcyzsmagsuys.supabase.co
SUPABASE_SERVICE_KEY=<service_key_real>
SUPABASE_ANON_KEY=<anon_key_real>
JWT_SECRET=luqz-secret-2026
INTERNAL_SECRET=luqz-internal-magic-2026
N8N_SECRET=n8n-auth-secret-2026
N8N_WEBHOOK_URL=https://editor.luqz.com.br/webhook/cockpit/performance
N8N_CACHE_TTL_MS=120000
```

---

## Fluxo de dados

```
Login:
  Frontend → POST /auth/login (authClient com ANON_KEY) → JWT

Dashboard:
  Frontend → GET /client/dashboard (JWT) → luqz-api → n8n webhook → normalizer → intelligence → response

Documentos:
  Frontend → GET /client/documents (JWT) → luqz-api → Supabase (tabela: documents)
```

---

## Estado atual (21/04/2026 ~08h)

### ✅ Resolvido
- Login funcionando (Supabase Auth com anon key)
- Build do cockpit com Dockerfile multi-stage
- URL da API correta (VITE_API_URL no .env)
- Proteção contra `kpis undefined` em todos os componentes
- Tipos opcionais no cockpit.ts
- Filtro de dados inválidos no usePerformance

### ⚠️ Pendente / Em progresso
1. **Dashboard sem dados** — `performanceService.ts` foi corrigido para chamar `/client/dashboard` em vez do n8n direto. Aguarda rebuild + redeploy do cockpit com o tar mais recente.
2. **Documentos 403** — `/client/documents` retorna 403. Investigar: o middleware de auth está rejeitando ou a rota não existe corretamente. Ver `luqz-api/routes/clients.js` ou arquivo de documentos.

---

## Arquivos críticos para revisar

| Arquivo | Por quê |
|---------|---------|
| `luqz-cockpit/src/services/performanceService.ts` | Recém alterado: agora chama `/client/dashboard` via `api()` |
| `luqz-api/routes/dashboard.js` | Endpoint que o frontend deve consumir |
| `luqz-api/middleware/auth.js` | Validação JWT + resolução de companyId |
| `luqz-api/routes/clients.js` | Investigar 403 em /client/documents |

---

## Padrões estabelecidos

- Acesso a dados da API: sempre `objeto?.propriedade ?? fallback`
- Tipos externos: campos opcionais com `?` no cockpit.ts
- Filtro de dados inválidos: feito no hook (`usePerformance`), não nos componentes
- `calculateKPIStatus` recebe objeto `{value, target, direction}`, não argumentos posicionais
- Supabase: `db` (service key) para queries, `authClient` (anon key) para auth
