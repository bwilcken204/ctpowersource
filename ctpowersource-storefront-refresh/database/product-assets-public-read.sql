-- Allow the storefront's public Supabase key to read only assets marked public.
-- Run this once in Supabase SQL Editor.
alter table public.product_assets enable row level security;

drop policy if exists "Public can read public product assets" on public.product_assets;
create policy "Public can read public product assets"
on public.product_assets
for select
to anon, authenticated
using (is_public = true);
