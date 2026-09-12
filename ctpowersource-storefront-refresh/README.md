# CT Power Source website

This is the September 11 storefront refresh of the Phase 3 website for `ctpowersource.com`. This review copy has not been published.

## Storefront refresh

- Shared prominent search, gold navigation bar, and quote shortcut.
- Expandable category navigation on desktop and in the mobile product menu.
- Homepage category directory with direct links to product families.
- Compact catalog heading, sidebar filters, and product rows with aligned prices and actions.
- Original Supabase/Vercel API, pricing data, email quote flow, and social metadata retained.
- Categories absent from the preview dataset correctly show no results.
- Search, category navigation, product details, quote opening, and mobile layouts checked in the browser.
- Official Socomec product images added for the DIRIS A-100/A-200 families and SIRCO M reference 22013003. Images were sourced from Socomec product pages and stored locally under `assets/products`.

The preview uses the existing ten sample products; live catalog access requires the existing Vercel environment. Prices and availability shown in this preview are not freshly verified. No account, checkout, or order-processing features were added. The original August files remain in their original folder.

## Preview on your computer

Keep all files and the `api` folder together, then double-click `index.html`. The page will use a small representative product set for the local preview. The complete Supabase catalog loads after the folder is published through Vercel.

## What it includes

- Branded homepage built around **Find. Configure. Budget. Source.**
- New transparent gold-and-white CT Power Source logo and a black/gold visual system aligned with CT Electric Services
- Dedicated `products.html` storefront with search, category and availability filters, product details, and quote actions
- Manufacturer-neutral three-level product taxonomy that can expand beyond Socomec without reorganizing the storefront
- Homepage search and category cards route directly into the filtered product catalog
- Compact homepage solution navigator for cloud monitoring, power meters, transfer and switching, and application support
- Homepage Featured Manufacturer section promoting Socomec and routing visitors into its represented product areas
- Live product search and filters backed by the safe Supabase `public_product_catalog` view
- Public 2026 list pricing with project-pricing language
- Product-detail panels and availability statuses
- Featured Socomec categories
- Guided solution messaging for distributors, contractors, consulting engineers, and end users
- Quote requests prepared for `sales@ctelectricreps.com`
- Responsive behavior for desktop, tablet, and mobile

## Vercel connection

The existing Vercel environment variables are used by `/api/products.js`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

No private database key or account pricing multiplier is included in this website.

## Publish through the existing GitHub repository

Upload the contents of this folder to the root of the existing `ctpowersource` GitHub repository, replacing the temporary `index.html`. Preserve the `api` folder. Committing to `main` will trigger the existing Vercel deployment.

The local preview intentionally shows a small representative product set when `/api/products` is unavailable. On Vercel, the API route uses the saved environment variables and returns the complete published catalog.
