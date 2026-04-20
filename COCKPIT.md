# LUQZ Cockpit SaaS

Dashboard de performance de marketing com autenticação JWT e banco próprio.

## Stack

- **Frontend:** React + Vite + TypeScript (`dashboard/`)
- **Backend:** Node.js + Fastify + Supabase PostgreSQL (`luqz-api/`)
- **Auth:** Supabase Auth + JWT
- **Banco:** PostgreSQL via Supabase

## Estrutura

```
/
  dashboard/     → frontend React/Vite
  luqz-api/      → backend Fastify (5 endpoints)
  scripts/       → schema SQL + migração Sheets
  docs/          → documentação
```

## Rodando o backend

```bash
cd luqz-api
cp .env.example .env   # preencher variáveis
npm install
npm run dev            # inicia na porta 3001
```

Variáveis obrigatórias no `.env`:
```
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
JWT_SECRET=
```

## Rodando o frontend

```bash
cd dashboard
cp .env.example .env.local   # preencher VITE_API_URL
npm install
npm run dev                  # inicia em localhost:5173
```

Variável obrigatória no `.env.local`:
```
VITE_API_URL=http://localhost:3001
```

## Setup inicial do banco

1. Criar projeto no [Supabase](https://supabase.com)
2. Rodar `scripts/schema.sql` no SQL Editor
3. Criar usuário em Authentication → Add User
4. Rodar migração: `npx ts-node scripts/migrate-sheets.ts`

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/login` | Email + senha → JWT |
| GET | `/api/auth/me` | Valida token |
| GET | `/api/clients` | Lista clientes |
| GET | `/api/clients/:id` | Detalhe do cliente |
| GET | `/api/clients/:id/performance` | Série histórica |
