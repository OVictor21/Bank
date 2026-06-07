-- ============================================================================
-- Extra tables for Settings / Report / Card pages. Run after schema.sql.
-- ============================================================================

-- Support tickets (Report an Issue)
create table if not exists public.support_tickets (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  issue_type  text,
  account_ref text,
  subject     text,
  description text,
  status      text default 'open',
  created_at  timestamptz default now()
);

-- Card applications
create table if not exists public.card_applications (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  card_type     text,
  full_name     text,
  phone         text,
  address       text,
  annual_income numeric(14,2),
  employment    text,
  credit_score  int,
  status        text default 'pending',
  created_at    timestamptz default now()
);

alter table public.support_tickets   enable row level security;
alter table public.card_applications enable row level security;

drop policy if exists "own tickets" on public.support_tickets;
drop policy if exists "own card apps" on public.card_applications;

create policy "own tickets" on public.support_tickets
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own card apps" on public.card_applications
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
