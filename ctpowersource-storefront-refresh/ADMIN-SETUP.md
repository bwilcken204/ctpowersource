# CTE admin dashboard

Publish the updated site files through the existing GitHub/Vercel project. Open https://www.ctpowersource.com/admin after activation.

1. In Supabase SQL Editor, apply database/commerce.sql and database/accounts.sql if not already applied, then database/admin.sql and database/order-stages.sql.

Order views: Pending orders, Accepted / Preparing shipment (existing approved status), Closed & invoiced, Declined, and All orders. Select an order stage and save to move it to that view. Closed & invoiced requires a recorded invoice number; it does not imply payment received or create an invoice in QuickBooks. Stage filtering applies before pagination.
2. Configure Supabase email sign-in and email delivery as described in COMMERCE-SETUP.md. The Magic Link template must include {{ .Token }} for numeric verification codes.
3. In Vercel Production, configure NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, SUPABASE_SERVICE_ROLE_KEY (server-only secret), STOREFRONT_ORIGIN=https://www.ctpowersource.com and ACCOUNTS_ENABLED=true. Redeploy after configuration changes. Never prefix the service role key with NEXT_PUBLIC_.
4. Open /admin and request a code for sales@ctelectricreps.com. This is the only authorized admin email. Every admin API request validates the session with Supabase and checks the verified email before using the server-side database key.
5. Test with a real order request and an ordinary customer account: only the admin should see records. Confirm saved approval status, internal notes, invoice and tracking numbers after refresh. Live authentication, database permissions, and email delivery require this deployment test.

The dashboard lists stored order requests and registered Supabase users (including users without profiles) in pages of 50. Guest contacts appear in their orders. Customers are read-only. Orders support approval, decline, and manual invoice/tracking/notes. Saving records does not send email, create QuickBooks invoices, confirm payment, or initiate fulfillment. Only the most recent administrator update is recorded; this is not a full audit history. Simultaneous order edits are last-write-wins. Saved BOM browsing and automated QuickBooks payment synchronization are not included in this initial dashboard.

Order intake still requires the existing PO_ENABLED and QB_INVOICE_REQUESTS_ENABLED setup and testing. An empty dashboard does not mean checkout is active. See COMMERCE-SETUP.md.
