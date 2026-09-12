# Checkout and product assistant activation

The cart runs now. Live PO submission and AI are disabled until the existing Vercel/Supabase backend is configured. The credit-card choice requests a QuickBooks invoice after CTE review. It does not charge a card or automatically create an invoice. Do not advertise live checkout yet.

## PO approval

1. Run `database/commerce.sql` in the existing Supabase project. Orders are private to the service role; no anonymous read/write policies are created.
2. Add the values from `.env.example` to Vercel environment settings. Keep the service-role key and OpenAI key server-only. Set `STOREFRONT_ORIGIN` to the exact HTTPS origin without a trailing slash.
3. Deploy using the existing Vercel project, then enable `PO_ENABLED=true`. Verify a test PO, its stored totals and status in Supabase, and a retry without duplicate insertion.
4. CTE reviews `ct_po_requests` in the Supabase dashboard, sorted by `created_at`. The initial status is `pending_approval`. No automatic email or fulfillment is configured. Assign someone to monitor this queue before launch.

The server fetches current Socomec USD catalog prices and calculates list × 0.30 ÷ 0.80, rounding each unit to cents before multiplying quantity. Customer-provided prices are ignored. Shipping/tax remain unquoted, never assumed zero. Duplicate retries reuse the same request ID and reject changed payloads. PO and QuickBooks invoice requests are accepted when their respective flags are enabled, with no payment capture. Global daily quota: 100 new requests; abuse can exhaust it, so add host WAF/bot protection before a broad public launch.

## QuickBooks Online and credit cards

CTE already accepts credit cards through QuickBooks Online. The checkout offers PO approval or a request for a payable QuickBooks invoice after CTE confirms shipping, tax and availability. Set QB_INVOICE_REQUESTS_ENABLED=true only when staff monitor the order queue and can prepare those invoices manually. The request stores payment_method as po or qb_invoice. QuickBooks invoice requests do not require a PO number.

No QuickBooks OAuth connection, automatic invoice creation/sending, payment webhook or reconciliation has been implemented. Connecting the existing QuickBooks company requires Intuit app setup and account authorization; this is a remaining activation task. Do not advertise immediate card checkout. Staff may use the existing QuickBooks workflow to send invoices and confirm payments in the meantime. Do not fulfill based on an invoice request alone.

## Customer accounts and saved BOMs

Apply database/accounts.sql after commerce.sql. Enable the Supabase Email provider and configure production SMTP. Change the Magic Link email template to include {{ .Token }} so customers receive a numeric sign-in code. Set the storefront URL and configure provider email/code rate limits and host abuse protection before opening registration. Set ACCOUNTS_ENABLED=true after a successful staging test.

Sign-in creates a verified account through an email code. Session access tokens remain in a Secure, HttpOnly, SameSite=Lax cookie, limited to one hour; customers sign in again after expiry. No password or payment credential is stored in the profile or browser storage. The profile and BOM APIs forward the customer's token, never the service-role key, to tables protected by owner-specific RLS. Staff review and PO storage retain server-only access. Guest checkout does not require a session; a customer can explicitly choose guest checkout even if signed in.

Profiles store name, company, phone and shipping address. BOMs store named product/quantity/note lists without frozen prices. Customers can create, edit, duplicate, save a cart and add a reviewed non-AI BOM to the cart. AI drafts can be saved but remain marked for CTE review and cannot directly enter the cart; staff review/approval UI is not yet implemented. Blank or unavailable references block cart addition. Prices refresh from the catalog. BOM edits are last-write-wins; there is no multi-user company sharing or order-history page.

Before enabling, test email delivery, code expiry, sign-out, cross-account access with two real users, profile prefilling, saved BOM persistence across devices, unavailable references, quantity limits and guest checkout. Mocked handler tests passed; live Supabase migrations, email delivery, RLS enforcement and QuickBooks connectivity have not been tested without account access.

## AI assistant

Set `OPENAI_API_KEY`, choose a PDF-capable structured-output model in `OPENAI_MODEL`, then enable `AI_ENABLED=true` after testing. The implementation uses OpenAI's Responses API and sends the entered question and optional PDF only when the visitor selects Analyze. PDFs are limited to 2 MB; pasted text to 18,000 characters. Requests use `store:false`; this is not a promise of zero provider retention. No uploaded specification is persisted in the order database.

The assistant extracts up to 30 requirements, retrieves up to eight keyword candidates per requirement (100 total), then drafts a catalog-grounded list. Every returned SKU is checked against supplied candidates. It is a draft for CTE review, not a compliance or compatibility certification. Keyword retrieval can miss products. Empty/unverified results are retained for follow-up. No AI output directly creates an order.

Set the Vercel assistant function timeout to at least 150 seconds on a supported plan (two AI calls can take up to 55 seconds each plus catalog queries). Daily global quota is 30 analyses, enforced atomically in Supabase before any paid call. Also set an OpenAI project budget and host abuse protection. Quotas fail closed if their database function is unavailable.

Before enabling, test known Socomec references, PQ meter, an unsupported MCB, conflicting electrical ratings, missing sensor details, malicious instructions in a specification, refusal and unavailable-service responses. Live model accuracy, PDF processing, database permissions and payment behavior have not been validated with production credentials.

Official references: [Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [PDF inputs](https://developers.openai.com/api/docs/guides/file-inputs), [Stripe Checkout](https://docs.stripe.com/payments/checkout).
