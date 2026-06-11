-- ============================================================================
-- Admin access. Run after schema.sql / schema_pages.sql.
-- Lets users flagged is_admin read & modify ALL users' data (for the admin console).
-- ============================================================================

alter table public.profiles add column if not exists is_admin boolean default false;
alter table public.accounts add column if not exists status text default 'Active';

-- Helper: is the current user an admin? (SECURITY DEFINER to avoid RLS recursion)
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- Additive admin policies (permissive policies OR together with the existing "own" ones).
drop policy if exists "admin profiles" on public.profiles;
drop policy if exists "admin accounts" on public.accounts;
drop policy if exists "admin transactions" on public.transactions;
drop policy if exists "admin transfers" on public.transfers;
drop policy if exists "admin kyc" on public.kyc_submissions;

create policy "admin profiles" on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin accounts" on public.accounts
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin transactions" on public.transactions
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin transfers" on public.transfers
  for all using (public.is_admin()) with check (public.is_admin());

-- kyc_submissions only exists if schema_pages/baas ran; guard with a DO block.
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema='public' and table_name='kyc_submissions') then
    execute 'create policy "admin kyc" on public.kyc_submissions for all using (public.is_admin()) with check (public.is_admin())';
  end if;
end $$;

-- ▼▼▼ PROMOTE AN ADMIN: replace the email, then this makes that user an admin. ▼▼▼
-- update public.profiles set is_admin = true
--   where id = (select id from auth.users where email = 'admin@yourbank.com');
