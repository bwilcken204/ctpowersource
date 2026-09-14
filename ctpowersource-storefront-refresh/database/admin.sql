-- Apply after commerce.sql and accounts.sql. No new public access is granted.
alter table public.ct_po_requests
 add column if not exists invoice_number text not null default '',
 add column if not exists tracking_number text not null default '',
 add column if not exists internal_notes text not null default '',
 add column if not exists admin_updated_at timestamptz,
 add column if not exists admin_updated_by uuid references auth.users(id) on delete set null;
grant select on public.ct_customer_profiles to service_role;
