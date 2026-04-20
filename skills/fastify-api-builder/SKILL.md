---
name: fastify-api-builder
description: Constrói APIs REST com Fastify v5 + Supabase + JWT do zero até endpoints funcionando. Use quando precisar criar ou expandir um backend Node.js com autenticação e banco relacional.
type: prompt
version: 1.0.0
categories:
  - backend
  - api
  - saas
---

# Fastify API Builder

## When to use

Use esta skill ao criar ou depurar um backend Node.js com Fastify v5, Supabase e autenticação JWT. Cobre desde a estrutura inicial de arquivos até todos os endpoints funcionando e testados.

## Instructions

### Estrutura de arquivos obrigatória

```
luqz-api/
├── server.js
├── package.json
├── .env / .env.example
├── routes/
│   ├── auth.js
│   ├── clients.js
│   └── [recurso].js
├── middleware/
│   └── auth.js
└── services/
    └── supabase.js
```

### Passo a passo de criação

1. **`package.json`** — declarar `"type": "module"` e verificar compatibilidade de versões:
   - Fastify 5 exige `@fastify/cors ^10` e `@fastify/jwt ^9`
   - Script dev: `"dev": "node --watch server.js"` (sem nodemon)

2. **`services/supabase.js`** — cliente com `SUPABASE_SERVICE_KEY` (bypassa RLS automaticamente):
   ```js
   import { createClient } from '@supabase/supabase-js'
   export const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
   ```

3. **`middleware/auth.js`** — preHandler que verifica JWT:
   ```js
   export async function requireAuth(request, reply) {
     await request.jwtVerify()
   }
   ```

4. **`routes/auth.js`** — POST `/auth/login` usando `db.auth.signInWithPassword()`, retorna JWT assinado pelo servidor (não o token do Supabase):
   ```js
   const token = app.jwt.sign({ userId: data.user.id, email: data.user.email }, { expiresIn: '7d' })
   ```

5. **`routes/[recurso].js`** — cada recurso em arquivo separado com `preHandler: requireAuth`

6. **`server.js`** — registrar plugins na ordem: `cors` → `jwt` → routes

### Testando endpoints

```powershell
# Login
$res = Invoke-RestMethod -Uri http://localhost:3001/auth/login -Method POST -ContentType "application/json" -Body '{"email":"x","password":"x"}'
$token = $res.token

# Endpoint protegido
Invoke-RestMethod -Uri http://localhost:3001/clients -Headers @{Authorization="Bearer $token"}
```

## Error handling

| Erro | Causa | Fix |
|------|-------|-----|
| Plugin version mismatch | `@fastify/cors ^9` com Fastify 5 | Atualizar para `^10` |
| Port in use | Processo anterior travado | `npx kill-port 3001` |
| `relation not found` | Nome de tabela errado ou cache | Verificar nome real + `notify pgrst, 'reload schema'` |
| Column not found | Dashboard mostra PT-BR, coluna real é diferente | `select column_name from information_schema.columns where table_name = 'x'` |
| 401 em todo endpoint | JWT secret diferente entre login e verificação | Garantir mesmo `JWT_SECRET` no `.env` |

## Important rules

- Sempre usar `SUPABASE_SERVICE_KEY`, nunca `anon key`, no service layer
- Fastify 5 é breaking change — plugins antigos falham silenciosamente
- Supabase dashboard pode exibir nomes de tabelas/colunas traduzidos para PT-BR — sempre validar nome real
- `signInWithPassword()` só funciona com usuários criados via Supabase Auth Admin API, nunca via SQL direto com `crypt()`
