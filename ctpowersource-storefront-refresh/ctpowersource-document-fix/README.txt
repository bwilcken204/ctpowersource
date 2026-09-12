CT Power Source document display update

The live product-detail.js checked on September 12 still contained three fixed placeholder document cards. The live /api/products response for 48250600 contained no assets property.

This package updates only two files. It does not include the admin dashboard.

1. Extract this ZIP.
2. In GitHub, open bwilcken204/ctpowersource and the existing ctpowersource-storefront-refresh folder.
3. Replace product-detail.js with the supplied product-detail.js.
4. Open that folder's api subfolder and replace products.js with the supplied api/products.js.
5. Commit the changes and wait for Vercel to finish deploying the new commit.
6. Open https://www.ctpowersource.com/product?sku=48250600 and hard-refresh.

Do not create a second nested ctpowersource-storefront-refresh folder. Do not delete the existing website folder. There is no need to reimport the CSV.

The API update reads public assets from public_product_assets and attaches them to the matching manufacturer/SKU. The product page displays document links and the primary asset image.

If the page still shows 'Available from CTE on request', check /api/products for SKU 48250600 and an assets array. Empty or missing assets can indicate Supabase read permissions; check Vercel logs for 'Product assets unavailable'. No database permissions were changed by this update. Do not disable RLS to troubleshoot.

Tests use mocked Supabase responses and the actual imported CSV values. Production publication and database access must be verified after deployment. The 12 unverified URLs in the CSV still need browser checks.
