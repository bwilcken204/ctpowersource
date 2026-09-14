-- Apply after admin.sql. Existing approved orders remain accepted orders.
begin;
alter table public.ct_po_requests drop constraint if exists ct_po_requests_status_check;
alter table public.ct_po_requests add constraint ct_po_requests_status_check
 check (status in ('pending_approval','approved','closed_invoiced','declined'));
commit;
