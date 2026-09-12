module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!projectUrl || !publishableKey) {
    return response.status(500).json({ error: "Catalog connection is not configured" });
  }

  const fields = [
    "id", "manufacturer", "sku", "slug", "short_description", "long_description",
    "product_type", "price_unit", "selling_unit", "list_price", "currency", "weight_lb",
    "certification", "purchasable", "enrichment_status", "supply_mode",
    "availability_status", "lead_time_1", "lead_time_10", "lead_time_25",
    "lead_time_unit", "availability_as_of",
  ].join(",");

  const products = [];
  const pageSize = 1000;

  try {
    for (let offset = 0; offset < 5000; offset += pageSize) {
      const endpoint = new URL("/rest/v1/public_product_catalog", projectUrl);
      endpoint.searchParams.set("select", fields);
      endpoint.searchParams.set("order", "product_type.asc.nullslast,short_description.asc");
      endpoint.searchParams.set("limit", String(pageSize));
      endpoint.searchParams.set("offset", String(offset));

      const result = await fetch(endpoint, {
        headers: { apikey: publishableKey },
      });

      if (!result.ok) {
        const detail = await result.text();
        throw new Error(`Supabase returned ${result.status}: ${detail.slice(0, 300)}`);
      }

      const page = await result.json();
      products.push(...page);
      if (page.length < pageSize) break;
    }

    // Product media and documents are maintained separately so catalog rows stay lean.
    // Treat assets as optional until the public read policy is enabled in Supabase.
    const assetsEndpoint = new URL("/rest/v1/product_assets", projectUrl);
    assetsEndpoint.searchParams.set("select", "manufacturer,sku,asset_type,title,url,alt_text,is_primary,is_public,verified");
    assetsEndpoint.searchParams.set("is_public", "eq.true");
    assetsEndpoint.searchParams.set("order", "is_primary.desc,created_at.asc");
    assetsEndpoint.searchParams.set("limit", "10000");
    const assetsResult = await fetch(assetsEndpoint, { headers: { apikey: publishableKey } });
    if (assetsResult.ok) {
      const assets = await assetsResult.json();
      const bySku = new Map();
      for (const asset of assets) {
        const key = `${String(asset.manufacturer).toLowerCase()}::${String(asset.sku)}`;
        if (!bySku.has(key)) bySku.set(key, []);
        bySku.get(key).push(asset);
      }
      for (const product of products) {
        product.assets = bySku.get(`${String(product.manufacturer).toLowerCase()}::${String(product.sku)}`) || [];
      }
    } else {
      console.warn("Product assets unavailable; continuing without media", await assetsResult.text());
    }

    response.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
    return response.status(200).json({ products, count: products.length });
  } catch (error) {
    console.error("Catalog fetch failed", error);
    return response.status(502).json({ error: "The product catalog is temporarily unavailable" });
  }
};
