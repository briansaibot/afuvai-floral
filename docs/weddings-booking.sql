-- AFUVAI wedding booking storage. Run once in Supabase > SQL Editor.
create table if not exists public.wedding_kv (
  store text not null,
  key text not null,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (store, key)
);
-- Only the server (service key) can read or write. No public access.
alter table public.wedding_kv enable row level security;
