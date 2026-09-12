-- Apply after commerce.sql. Customers can access only their own profile and BOMs.
create table if not exists public.ct_customer_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 name text not null default '' check(length(name)<=150),
 company text not null default '' check(length(company)<=150),
 phone text not null default '' check(length(phone)<=50),
 address text not null default '' check(length(address)<=1000)
);
create table if not exists public.ct_customer_boms (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 name text not null check(length(name) between 1 and 120),
 notes text not null default '' check(length(notes)<=2000),
 items jsonb not null check(jsonb_typeof(items)='array' and jsonb_array_length(items) between 1 and 100 and octet_length(items::text)<140000),
 review_required boolean not null default true,
 updated_at timestamptz not null default now()
);
create index if not exists ct_boms_owner on public.ct_customer_boms(user_id,updated_at desc);
alter table public.ct_customer_profiles enable row level security;
alter table public.ct_customer_boms enable row level security;
revoke all on public.ct_customer_profiles,public.ct_customer_boms from anon,authenticated;
grant select,insert,update on public.ct_customer_profiles,public.ct_customer_boms to authenticated;
drop policy if exists profile_owner on public.ct_customer_profiles;
create policy profile_owner on public.ct_customer_profiles for all to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id);
drop policy if exists bom_owner on public.ct_customer_boms;
create policy bom_owner on public.ct_customer_boms for all to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id);
alter table public.ct_po_requests add column if not exists payment_method text not null default 'po' check(payment_method in ('po','qb_invoice'));
alter table public.ct_po_requests add column if not exists user_id uuid references auth.users(id) on delete set null;
-- Approval and QuickBooks invoice preparation remain a CTE staff workflow.
