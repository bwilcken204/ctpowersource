-- Run once in the existing Supabase project's SQL editor. No browser access to orders.
create table if not exists public.ct_po_requests (
 id uuid primary key,
 created_at timestamptz not null default now(),
 request_hash text not null,
 status text not null default 'pending_approval' check(status in ('pending_approval','approved','declined')),
 customer jsonb not null,
 items jsonb not null,
 subtotal_cents bigint not null check(subtotal_cents>0),
 currency text not null check(currency='USD')
);
alter table public.ct_po_requests enable row level security;
revoke all on public.ct_po_requests from anon, authenticated;
grant all on public.ct_po_requests to service_role;
create table if not exists public.ct_request_quotas (
 bucket text not null, day date not null, used integer not null,
 primary key(bucket,day)
);
alter table public.ct_request_quotas enable row level security;
revoke all on public.ct_request_quotas from anon, authenticated;
create or replace function public.ct_take_quota(bucket_name text,daily_limit integer)
returns boolean language plpgsql security definer set search_path=public as $$
declare current_used integer;
begin
 if daily_limit<1 or daily_limit>1000 then return false; end if;
 insert into ct_request_quotas(bucket,day,used) values(bucket_name,current_date,1)
 on conflict(bucket,day) do update set used=ct_request_quotas.used+1
 where ct_request_quotas.used<daily_limit returning used into current_used;
 return current_used is not null;
end; $$;
revoke all on function public.ct_take_quota(text,integer) from public,anon,authenticated;
grant execute on function public.ct_take_quota(text,integer) to service_role;
