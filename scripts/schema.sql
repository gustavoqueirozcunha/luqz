-- Rodar no SQL Editor do Supabase

create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  funnel_type text,
  meta_cpa decimal,
  status text default 'verde',
  created_at timestamptz default now()
);

create table performance_records (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  date date not null,
  leads int default 0,
  investment decimal default 0,
  unique(client_id, date)
);
