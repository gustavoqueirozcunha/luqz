-- ═══════════════════════════════════════════════════════════════════════════
-- LUQZ Cockpit — Fase 2: Multi-Tenant Foundation
-- Rodar no SQL Editor do Supabase (em ordem)
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Empresas
create table if not exists companies (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text unique not null,
  created_at timestamptz default now()
);

-- 2. Perfis de usuário (1:1 com auth.users)
create table if not exists profiles (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade not null,
  full_name  text,
  avatar_url text,
  created_at timestamptz default now(),
  unique(user_id)
);

-- 3. Memberships (N:N entre users e companies)
create table if not exists memberships (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade not null,
  company_id uuid references companies(id) on delete cascade not null,
  role       text not null default 'viewer',   -- 'owner' | 'admin' | 'manager' | 'viewer'
  is_default boolean default false,            -- empresa ativa quando há múltiplas
  created_at timestamptz default now(),
  unique(user_id, company_id)
);

-- 4. Adicionar company_id nas tabelas existentes. 
-- ATENÇÃO: se já houver dados, o "not null" irá falhar. Você deve primeiro
-- rodar os 'alter table add column', depois popular com um company_id default, e por fim
-- rodar 'alter table ... alter column company_id set not null'. Aqui a versão final exigida:
alter table clients
  add column if not exists company_id uuid not null references companies(id);

alter table performance_records
  add column if not exists company_id uuid not null references companies(id);

-- 5. Índices para queries filtradas por tenant
create index if not exists idx_clients_company
  on clients(company_id);

create index if not exists idx_perf_company
  on performance_records(company_id);

create index if not exists idx_memberships_user
  on memberships(user_id);

create index if not exists idx_memberships_company
  on memberships(company_id);

-- 6. RLS (Row Level Security) — preparação futura
-- Não ativar agora pois o backend usa SERVICE_KEY (bypassa RLS).
-- Quando migrar para anon key no frontend, ativar:
--
-- alter table clients enable row level security;
-- create policy "tenant_isolation" on clients
--   using (company_id in (
--     select company_id from memberships where user_id = auth.uid()
--   ));

-- ═══════════════════════════════════════════════════════════════════════════
-- Seed inicial: criar empresa LUQZ e vincular dados existentes
-- Ajustar o user_id para o UUID real do admin no Supabase Auth
-- ═══════════════════════════════════════════════════════════════════════════

-- insert into companies (name, slug) values ('LUQZ', 'luqz');
--
-- insert into profiles (user_id, full_name)
--   values ('<UUID_DO_ADMIN>', 'Gustavo');
--
-- insert into memberships (user_id, company_id, role, is_default)
--   values (
--     '<UUID_DO_ADMIN>',
--     (select id from companies where slug = 'luqz'),
--     'owner',
--     true
--   );
--
-- update clients set company_id = (select id from companies where slug = 'luqz');
