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

  const hiddenSkus = new Set([
    "27990121",
    "27990021",
    "39542060",
    "39543041",
    "27948021",
    "39543120",
    "39544120",
    "22993309",
    "22993409",
    "21111003",
    "21111005",
    "21111203",
    "21111205",
    "21134000",
    "21134200",
    "22990011",
    "22990001",
    "21111276",
    "27990122",
    "27990022",
    "19PVM100",
    "22001000",
    "22001001",
    "22001002",
    "22001003",
    "22001004",
    "22001010",
    "22011003",
    "22011006",
    "22005005",
    "22005009",
    "22005011",
    "22009005",
    "22009009",
    "22009011",
    "21135001",
    "21135003",
    "27983120",
    "27983060",
    "27984060",
    "27984061",
    "27988041",
    "27988021",
    "27983021",
    "27983041",
    "27984041",
    "27984021",
    "22941011",
    "26943014",
    "22943016",
    "26944014",
    "21111256",
    "84090063",
    "84090041",
    "84091600",
    "84996220",
    "84996221",
    "84996120",
    "84996130",
    "84090016",
    "84090040",
    "84993222",
    "84993722",
    "84993232",
    "84994213",
    "84994214",
    "84994314",
    "39990720",
    "27943021",
    "21155011",
    "21155005",
    "21155007",
    "21155009",
    "39990701",
    "39542020",
    "39542040",
    "38982040",
    "38982020",
    "38982080",
    "38982120",
    "39543020",
    "39543040",
    "39543060",
    "37999020",
    "37983020",
    "38983120",
    "38983080",
    "38983040",
    "38983020",
    "39544020",
    "39544040",
    "39544060",
    "38984120",
    "38984080",
    "38984020",
    "39546020",
    "39546060",
    "38993120",
    "38993380",
    "3999U042",
    "37298040",
    "37298060",
    "37298020",
    "37298080",
    "37999010",
    "39990710",
    "48250204", "48250092", "48250082", "48250402", "194S0000",
    "48250093", "48250083", "48250203", "48250089", "48250400",
    "48250094", "48250097", "48250088", "48250080", "48250090",
    "48250401", "48250502", "48250405", "48250403",
  ]);

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

    const visibleProducts = products.filter((product) => !hiddenSkus.has(String(product.sku)));

    // Product media and documents are maintained separately so catalog rows stay lean.
    // Treat assets as optional until the public read policy is enabled in Supabase.
    // Read through the public view so the storefront uses the same anonymous-read
    // surface as the catalog view. The view exposes only public asset fields.
    const assetsEndpoint = new URL("/rest/v1/public_product_assets", projectUrl);
    assetsEndpoint.searchParams.set("select", "manufacturer,sku,asset_type,title,url,alt_text");
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
      for (const product of visibleProducts) {
        product.assets = bySku.get(`${String(product.manufacturer).toLowerCase()}::${String(product.sku)}`) || [];
      }
    } else {
      console.warn("Product assets unavailable; continuing without media", await assetsResult.text());
    }

    response.setHeader("Cache-Control", "no-store, max-age=0");
    response.setHeader("CDN-Cache-Control", "no-store");
    response.setHeader("Vercel-CDN-Cache-Control", "no-store");
    return response.status(200).json({ products: visibleProducts, count: visibleProducts.length });
  } catch (error) {
    console.error("Catalog fetch failed", error);
    return response.status(502).json({ error: "The product catalog is temporarily unavailable" });
  }
};
