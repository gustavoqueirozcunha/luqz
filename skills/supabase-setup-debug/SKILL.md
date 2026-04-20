---
name: supabase-setup-debug
description: Configura Supabase corretamente (schema, auth, RLS) e resolve os erros mais comuns de integração. Use ao conectar qualquer aplicação ao Supabase ou ao depurar erros de auth, schema ou permissão.
type: prompt
version: 1.0.0
categories:
  - backend
  - database
  - debug
---

# Supabase Setup & Debug

## When to use

Use esta skill ao configurar Supabase pela primeira vez ou ao depurar erros de conexão, autenticação, RLS ou schema. Cobre os erros mais comuns encontrados em integrações reais.

## Instructions

### Criar usuário de autenticação

**Nunca use SQL direto com `crypt()` para criar usuários de auth.** Use sempre a Admin API:

```http
POST https://<project>.supabase.co/auth/v1/admin/users
Authorization: Bearer <SERVICE_ROLE_KEY>
apikey: <SERVICE_ROLE_KEY>
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "senha123",
  "email_confirm": true
}
```

Para deletar um usuário corrompido antes de recriar:
```sql
delete from auth.identities where user_id = '<uuid>';
delete from auth.users where id = '<uuid>';
```

### Diagnosticar erros de schema

| Erro | Diagnóstico | Fix |
|------|-------------|-----|
| `relation "public.x" does not exist` | Nome errado ou cache desatualizado | Verificar nome real + `notify pgrst, 'reload schema'` |
| `column "x" does not exist` | Dashboard exibe PT-BR, coluna real é diferente | `select column_name from information_schema.columns where table_name = 'y'` |
| `Table not found` | Supabase dashboard traduz nomes para PT-BR | `select table_name from information_schema.tables where table_schema = 'public'` |

Recarregar schema cache:
```sql
notify pgrst, 'reload schema';
```

### RLS (Row Level Security)

Para service layer que usa `SUPABASE_SERVICE_KEY`, a service key bypassa RLS automaticamente — não é necessário desativar RLS.

Se estiver usando `anon key` e recebendo zero resultados silenciosos:
```sql
-- Verificar políticas existentes
select * from pg_policies where tablename = 'x';

-- Desativar RLS para desenvolvimento (service layer)
alter table x disable row level security;
```

### Validar credenciais

O cliente Supabase deve sempre usar `SUPABASE_SERVICE_KEY` (não `SUPABASE_ANON_KEY`) para operações server-side:

```js
import { createClient } from '@supabase/supabase-js'
export const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY  // service_role, não anon
)
```

## Important rules

- `signInWithPassword()` funciona apenas com usuários criados via Supabase Auth — não via INSERT manual na tabela `auth.users`
- Erros do PostgREST são verbosos: ler a mensagem completa antes de agir
- Dashboard Supabase pode exibir nomes em PT-BR que não correspondem aos nomes reais das colunas/tabelas
- Após qualquer alteração de schema (DDL), executar `notify pgrst, 'reload schema'`
