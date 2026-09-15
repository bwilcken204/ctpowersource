const sampleProducts = [
  {sku:"48250600",short_description:"DIRIS A-100 RJ12 SENSORS RS485",long_description:"Power quality meter with RJ12 sensor inputs and Modbus RTU communication over RS485.",product_type:"MONITORING & ANALYSIS",list_price:2550.38,currency:"USD",availability_status:"In stock",supply_mode:"MTS",weight_lb:.97,certification:"UL/CSA"},
  {sku:"48250601",short_description:"DIRIS A-100 333MV CT RS485",long_description:"Power quality meter for 333 mV current transformers with Modbus RTU communication over RS485.",product_type:"MONITORING & ANALYSIS",list_price:2550.38,currency:"USD",availability_status:"In stock",supply_mode:"MTS",weight_lb:.88,certification:"UL/CSA"},
  {sku:"48250604",short_description:"DIRIS A-200 RJ12 SENSORS ETHER",long_description:"Power quality and event analysis meter with RJ12 sensor inputs, RS485, and dual Ethernet communication.",product_type:"MONITORING & ANALYSIS",list_price:4857.86,currency:"USD",availability_status:"Contact for availability",supply_mode:"MTS",weight_lb:.97,certification:"UL/CSA"},
  {sku:"48250605",short_description:"DIRIS A-200 333MV CT ETHERNET",long_description:"Power quality and event analysis meter for 333 mV current transformers with RS485 and dual Ethernet.",product_type:"MONITORING & ANALYSIS",list_price:4857.86,currency:"USD",availability_status:"In stock",supply_mode:"MTS",weight_lb:1.32,certification:"UL/CSA"},
  {sku:"14001020",short_description:"SHAFT TYPE S-10X10-200MM",long_description:"Shaft for external handle S type 200mm 10x10",product_type:"COMMON ACCESSORIES",list_price:60.61,currency:"USD",availability_status:"Contact for availability",supply_mode:"MTS",weight_lb:.35,certification:"UL/CSA"},
  {sku:"14001050",short_description:"SHAFT TYPE S-10X10-500MM",long_description:"Shaft for external handle S type 500mm 10x10",product_type:"COMMON ACCESSORIES",list_price:81.38,currency:"USD",availability_status:"In stock",supply_mode:"MTS",weight_lb:.86,certification:"UL/CSA"},
  {sku:"22013003",short_description:"SIRCO M3 3X30A",long_description:"AC load break switch for compact industrial isolation applications",product_type:"AC LOAD BREAK SWITCH",list_price:248.50,currency:"USD",availability_status:"Incoming",supply_mode:"MTO",weight_lb:1.4,certification:"UL/CSA"},
  {sku:"48290000",short_description:"DIRIS B-30 MODBUS RS485 POWER METER",long_description:"Power meter with RS485 Modbus communications",product_type:"MEASUREMENT",list_price:1190,currency:"USD",availability_status:"Contact for availability",supply_mode:"MTO",weight_lb:.8,certification:"UL/CSA"},
  {sku:"38613008",short_description:"ATYS S 3X80A 120VAC",long_description:"Motorised changeover switch for source transfer applications",product_type:"MOTORISED CHANGEOVER SWITCH",list_price:2840,currency:"USD",availability_status:"In stock",supply_mode:"MTS",weight_lb:7.2,certification:"UL/CSA"},
  {sku:"36113004",short_description:"FUSERBLOC 3X40A",long_description:"Fuse combination switch for protection and isolation",product_type:"FUSE COMBINATION SWITCH",list_price:625,currency:"USD",availability_status:"Contact for availability",supply_mode:"MTO",weight_lb:2.1,certification:"UL/CSA"}
];

const productTaxonomy=[
  {title:"Power Monitoring & Metering",code:"PM",groups:[
    {title:"Single-point metering & power quality",description:"Panel-mounted meters for monitoring, analysis, and event capture.",leaves:[{title:"Metering",category:"Metering",brand:"Socomec"},{title:"Build a power-quality solution",href:"./solutions.html",brand:"CT Power Source"}]},
    {title:"Multi-point metering systems",description:"Scalable systems for branch circuits and distributed loads.",leaves:[{title:"DIRIS Digiware systems",query:"DIGIWARE",brand:"Socomec"},{title:"Multi-circuit meters",query:"MCM",brand:"Socomec"}]},
    {title:"Enclosed metering solutions",description:"Factory-enclosed assemblies for faster installation.",leaves:[{title:"Enclosed power meters",query:"DIGIBOX",brand:"Socomec"},{title:"Metering enclosures and accessories",category:"MEASUREMENT SYSTEM",brand:"Socomec"}]},
    {title:"Current Transformers",description:"Solid-core, split-core, flexible, and specialty current sensing.",leaves:[{title:"Split-core current sensors",query:"SPLIT CORE",brand:"Socomec"},{title:"Solid-core current sensors",query:"SOLID CORE",brand:"Socomec"},{title:"Rogowski and flexible sensors",query:"ROGOWSKI",brand:"Socomec"}]},
    {title:"Gateways, software & interfaces",description:"Connect, collect, visualize, and export electrical data.",leaves:[{title:"Communication gateways",query:"GATEWAY",brand:"Socomec"},{title:"Software and interfaces",category:"SOFTWARES & INTERFACES",brand:"Socomec"}]},
    {title:"Insulation monitoring",description:"Monitor insulation health and locate developing faults.",leaves:[{title:"Insulation monitoring devices",category:"INSULATION MONITORING",brand:"Socomec"}]}
  ]},
  {title:"Power Protection, Switching & Transfer",code:"PS",groups:[
    {title:"Non-fusible disconnect switches",description:"Safe isolation and load switching for AC and DC systems.",leaves:[{title:"AC disconnect switches",category:"AC LOAD BREAK SWITCH",brand:"Socomec"},{title:"DC, PV and ESS disconnects",category:"DC_PV LOAD BREAK SWITCH",brand:"Socomec"}]},
    {title:"Fuse protection",description:"Fusible switching, fuse bases, and coordinated protection.",leaves:[{title:"Fusible disconnect switches",category:"FUSE COMBINATION SWITCH",brand:"Socomec"},{title:"Fuses and fuse bases",category:"FUSES & FUSE BASES",brand:"Socomec"}]},
    {title:"Transfer switches",description:"Manual, motorized, and automatic source transfer.",leaves:[{title:"Manual transfer switch",category:"MANUAL CHANGEOVER SWITCH",brand:"Socomec"},{title:"ATS",category:"MOTORISED CHANGEOVER SWITCH",brand:"Socomec"},{title:"ATS controllers",category:"CONTROLLER",brand:"Socomec"}]},
    {title:"Enclosed switching",description:"Factory-enclosed switching and transfer assemblies.",leaves:[{title:"Enclosed switches",category:"ENCLOSED SWITCH",brand:"Socomec"}]},
    {title:"Mounting, cabling & accessories",description:"Handles, shafts, terminals, busbars, and installation components.",leaves:[{title:"Mounting and cabling accessories",category:"MOUNTING & CABLING ACCESSORIES",brand:"Socomec"},{title:"Common accessories",category:"COMMON ACCESSORIES",brand:"Socomec"}]}
  ]},
  {title:"Energy Storage & Resilience",code:"ES",groups:[
    {title:"ESS switching & protection",description:"DC isolation and fuse protection for storage applications.",leaves:[{title:"ESS disconnect switches",query:"ESS",brand:"Socomec"},{title:"Battery-system fuse protection",query:"BESS",brand:"Socomec"}]},
    {title:"Energy storage systems",description:"Packaged storage and resilient-power solutions.",leaves:[{title:"Request an energy-storage solution",href:"./solutions.html",brand:"CT Power Source"}]}
  ]},
  {title:"Connectivity, Software & Cloud",code:"CL",groups:[
    {title:"Cloud monitoring systems",description:"Dashboards, alarms, reports, and multi-site electrical intelligence.",leaves:[{title:"Configure a cloud solution",href:"./solutions.html",brand:"CT Power Source"}]},
    {title:"Gateways & data collection",description:"Local and remote connectivity for meters and sensors.",leaves:[{title:"Data loggers and gateways",query:"DATALOG",brand:"Socomec"},{title:"Software and communication interfaces",category:"SOFTWARES & INTERFACES",brand:"Socomec"}]},
    {title:"Remote connectivity",description:"Cellular and local-network connection paths.",leaves:[{title:"Build a connected monitoring system",href:"./solutions.html",brand:"CT Power Source"}]}
  ]}
];

function storefrontCategory(category){
  const aliases={"MOTORISED CHANGEOVER SWITCH":"ATS","MOTORIZED CHANGEOVER SWITCH":"ATS","MANUAL CHANGEOVER SWITCH":"Manual transfer switch","MONITORING & ANALYSIS":"Metering","MEASUREMENT":"Metering","TRANSFORMERS":"Current Transformers"};
  return aliases[String(category||'').toUpperCase()]||category;
}
function classifyStorefrontProduct(product){
  const text=[product.short_description,product.long_description].join(' ');
  const isMeter=/\b(meter|meters|multifunction meter)\b/i.test(product.short_description||'');
  const isCT=!isMeter&&/\b(solid[ -]?core|split[ -]?core|rogowski|rope sensor)\b/i.test(text);
  return {...product,product_type:isCT?'Current Transformers':storefrontCategory(product.product_type)};
}
const state={products:[],filtered:[],visible:12,usingPreview:false};
const hiddenSkus=new Set(["27990121","27990021","39542060","39543041","27948021","39543120","39544120","22993309","22993409","21111003","21111005","21111203","21111205","21134000","21134200","22990011","22990001","21111276","27990122","27990022","19PVM100","22001000","22001001","22001002","22001003","22001004","22001010","22011003","22011006","22005005","22005009","22005011","22009005","22009009","22009011","21135001","21135003","27983120","27983060","27984060","27984061","27988041","27988021","27983021","27983041","27984041","27984021","22941011","26943014","22943016","26944014","21111256","84090063","84090041","84091600","84996220","84996221","84996120","84996130","84090016","84090040","84993222","84993722","84993232","84994213","84994214","84994314","39990720","27943021","21155011","21155005","21155007","21155009","39990701","39542020","39542040","38982040","38982020","38982080","38982120","39543020","39543040","39543060","37999020","37983020","38983120","38983080","38983040","38983020","39544020","39544040","39544060","38984120","38984080","38984020","39546020","39546060","38993120","38993380","3999U042","37298040","37298060","37298020","37298080","37999010","39990710","48250204","48250092","48250082","48250402","194S0000","48250093","48250083","48250203","48250089","48250400","48250094","48250097","48250088","48250080","48250090","48250401","48250502","48250405","48250403"]);
const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const money=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2});
// Socomec quoting rule: 70% off list, then divide by 0.8 for a 20% gross margin.
const pricing={discountRate:.70,targetGrossMargin:.20};
function quotePrice(listPrice){return listPrice==null?null:listPrice*(1-pricing.discountRate)/(1-pricing.targetGrossMargin);}
function productImage(product){
  const primary=Array.isArray(product.assets)?product.assets.find(a=>a.asset_type==="image"&&a.is_primary!==false&&a.url):null;
  if(primary?.url)return primary.url;
  const sku=String(product.sku||"");
  if(["48250600","48250601"].includes(sku))return "./assets/products/diris-a-100.webp";
  if(["48250604","48250605"].includes(sku))return "./assets/products/diris-a-200.webp";
  if(sku==="22013003")return "./assets/products/sirco-m.webp";
  return "";
}

function escapeHtml(value=""){return String(value).replace(/[&<>"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));}
function statusClass(status){return status==="In stock"?"in-stock":status==="Incoming"?"incoming":"contact";}
function productCard(product){const image=productImage(product);const detailUrl=`./product.html?sku=${encodeURIComponent(product.sku)}`;return `<article class="product-card">${image?`<a class="product-image" href="${detailUrl}" aria-label="View details for ${escapeHtml(product.short_description)}"><img src="${image}" alt="${escapeHtml(product.short_description)} product image" loading="lazy"></a>`:""}<div class="product-top"><span class="product-category">${escapeHtml(product.product_type||"Socomec")}</span><span class="product-status ${statusClass(product.availability_status)}">${escapeHtml(product.availability_status||"Contact for availability")}</span></div><div class="product-main"><span class="product-sku">SKU ${escapeHtml(product.sku)}</span><h3><a href="${detailUrl}">${escapeHtml(product.short_description)}</a></h3><p class="product-description">${escapeHtml(product.long_description||"Product details available on request.")}</p></div><div class="product-bottom"><span class="product-price"><small>Your quoted price</small><strong>${quotePrice(product.list_price)!=null?money.format(quotePrice(product.list_price)):"Request quote"}</strong><small class="list-price-note">List ${product.list_price!=null?money.format(product.list_price):"price on request"}</small></span><span class="product-actions"><a class="icon-button" href="${detailUrl}">Details</a><button class="icon-button primary" data-quote-sku="${escapeHtml(product.sku)}">Quote</button></span></div></article>`;}

function productMatchesQuery(product,query){
  if(!query)return true;
  query=query.replace(/\bpq\b/g,'power quality').replace(/\bmcb\b/g,'miniature circuit breaker').replace(/\bmccb\b/g,'molded case circuit breaker');
  query=query.replace(/\b(split|solid)-core\b/g,'$1 core');
  const haystack=[product.sku,product.short_description,product.long_description,product.product_type].join(" ").toLowerCase().replace(/\b(split|solid)-core\b/g,'$1 core');
  if(haystack.includes(query))return true;
  if(/^(metering|meter|meters|power metering|power meter|power meters)$/.test(query)){
    const meteringTerms=["meter","diris","digiware","current sensor","current acquisition","current transformer","333mv ct","split core","split-core","solid core","solid-core","rogowski","rope sensor"];
    const meteringFamily=["Metering","MEASUREMENT SYSTEM"].includes(product.product_type||"");
    return meteringFamily&&meteringTerms.some(term=>haystack.includes(term));
  }
  if(/^(ct|cts|current sensors|current transformers)$/.test(query)){
    const sensorTerms=["current sensor","current transformer","333mv ct","split core","split-core","solid core","solid-core","rogowski","rope sensor","toroid"];
    return sensorTerms.some(term=>haystack.includes(term));
  }
  return false;
}

function applyFilters(){
  const queryControl=$("#catalog-query");
  const categoryControl=$("#category-filter");
  const availabilityControl=$("#availability-filter");
  if(!queryControl||!categoryControl||!availabilityControl)return;
  const query=queryControl.value.trim().toLowerCase();
  const category=categoryControl.value;
  const availability=availabilityControl.value;
  state.filtered=state.products.filter(product=>{
    return productMatchesQuery(product,query)&&(!category||product.product_type===category)&&(!availability||product.availability_status===availability);
  });
  state.visible=12;renderProducts();
}

function renderProducts(){
  const grid=$("#product-grid");
  if(!grid)return;
  const visible=state.filtered.slice(0,state.visible);
  grid.innerHTML=visible.length?visible.map(productCard).join(""):`<div class="empty-state"><strong>No products found.</strong><br>Try a different part number, category, or availability filter.</div>`;
  $("#catalog-count").textContent=`${state.filtered.length.toLocaleString()} product${state.filtered.length===1?"":"s"}${state.usingPreview?" · preview data":""}`;
  $("#load-more").hidden=state.visible>=state.filtered.length;
}

function populateCategories(){
  const filter=$("#category-filter");
  if(!filter)return;
  const categories=[...new Set([...state.products.map(p=>p.product_type),...productTaxonomy.flatMap(c=>c.groups.flatMap(g=>g.leaves.map(l=>storefrontCategory(l.category))))].filter(Boolean))].sort();
  filter.innerHTML=`<option value="">All categories</option>`+categories.map(category=>`<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
}

function applyUrlFilters(){
  if(!$("#product-grid"))return;
  const params=new URLSearchParams(window.location.search);
  $("#catalog-query").value=params.get("q")||"";
  const category=storefrontCategory(params.get("category")||"");
  const availability=params.get("availability")||"";
  if([...$("#category-filter").options].some(option=>option.value===category))$("#category-filter").value=category;
  if([...$("#availability-filter").options].some(option=>option.value===availability))$("#availability-filter").value=availability;
  applyFilters();
}

function syncFilterUrl(){
  if(!$("#product-grid")||window.location.protocol==="file:")return;
  const params=new URLSearchParams();
  const query=$("#catalog-query").value.trim();
  const category=$("#category-filter").value;
  const availability=$("#availability-filter").value;
  if(query)params.set("q",query);if(category)params.set("category",category);if(availability)params.set("availability",availability);
  history.replaceState(null,"",`${window.location.pathname}${params.size?`?${params}`:""}`);
}

function taxonomyHref(leaf){
  if(leaf.href)return leaf.href;
  const params=new URLSearchParams();
  if(leaf.category)params.set("category",leaf.category);if(leaf.query)params.set("q",leaf.query);
  return `./products.html?${params}`;
}

function initTaxonomy(){
  const primary=$("#taxonomy-primary"),secondary=$("#taxonomy-secondary"),leaves=$("#taxonomy-leaves");
  if(!primary||!secondary||!leaves)return;
  let primaryIndex=0,groupIndex=0;
  const renderLeaves=()=>{const group=productTaxonomy[primaryIndex].groups[groupIndex];leaves.innerHTML=`<div class="taxonomy-column-title"><span>03</span><strong>${escapeHtml(group.title)}</strong></div>`+group.leaves.map(leaf=>`<a href="${escapeHtml(taxonomyHref(leaf))}"><span>${escapeHtml(leaf.title)}</span><small>${escapeHtml(leaf.brand)}</small><i>→</i></a>`).join("");};
  const renderGroups=()=>{secondary.innerHTML=`<div class="taxonomy-column-title"><span>02</span><strong>Narrow the application</strong></div>`+productTaxonomy[primaryIndex].groups.map((group,index)=>`<button type="button" data-taxonomy-group="${index}" class="${index===groupIndex?"is-active":""}"><span><strong>${escapeHtml(group.title)}</strong><small>${escapeHtml(group.description)}</small></span><i>›</i></button>`).join("");renderLeaves();};
  primary.innerHTML=`<div class="taxonomy-column-title"><span>01</span><strong>Choose a system</strong></div>`+productTaxonomy.map((category,index)=>`<button type="button" data-taxonomy-primary="${index}" class="${index===primaryIndex?"is-active":""}"><span class="taxonomy-code">${escapeHtml(category.code)}</span><strong>${escapeHtml(category.title)}</strong><i>›</i></button>`).join("");
  primary.addEventListener("click",event=>{const button=event.target.closest("[data-taxonomy-primary]");if(!button)return;primaryIndex=Number(button.dataset.taxonomyPrimary);groupIndex=0;$$('[data-taxonomy-primary]').forEach(item=>item.classList.toggle("is-active",item===button));renderGroups();});
  secondary.addEventListener("click",event=>{const button=event.target.closest("[data-taxonomy-group]");if(!button)return;groupIndex=Number(button.dataset.taxonomyGroup);$$('[data-taxonomy-group]').forEach(item=>item.classList.toggle("is-active",item===button));renderLeaves();});
  renderGroups();
}

function initProductMenus(){
  $$(".products-mega").forEach(menu=>{
    let primaryIndex=0,groupIndex=0;
    menu.innerHTML=`<div class="mega-menu-top"><div><span>Product navigator</span><strong>Choose a system</strong></div><a href="./products.html">View all products →</a></div><div class="mega-menu-grid"><div class="mega-primary"></div><div class="mega-secondary"></div><div class="mega-leaves"></div></div>`;
    const primary=menu.querySelector(".mega-primary"),secondary=menu.querySelector(".mega-secondary"),leaves=menu.querySelector(".mega-leaves");
    const renderLeaves=()=>{const group=productTaxonomy[primaryIndex].groups[groupIndex];leaves.innerHTML=`<div class="mega-column-label">Products & options</div>`+group.leaves.map(leaf=>`<a href="${escapeHtml(taxonomyHref(leaf))}"><span>${escapeHtml(leaf.title)}</span><small>${escapeHtml(leaf.brand)}</small><i>→</i></a>`).join("");};
    const activateGroup=index=>{groupIndex=index;renderGroups();};
    const renderGroups=()=>{
      secondary.innerHTML=`<div class="mega-column-label">Narrow the application</div>`+productTaxonomy[primaryIndex].groups.map((group,index)=>`<button type="button" data-mega-group="${index}" class="${index===groupIndex?"is-active":""}"><span><strong>${escapeHtml(group.title)}</strong><small>${escapeHtml(group.description)}</small></span><i>›</i></button>`).join("");
      secondary.querySelectorAll("[data-mega-group]").forEach(button=>{const activate=()=>activateGroup(Number(button.dataset.megaGroup));button.addEventListener("pointerenter",activate);button.addEventListener("focus",activate);button.addEventListener("click",activate);});
      renderLeaves();
    };
    const activatePrimary=index=>{primaryIndex=index;groupIndex=0;renderPrimary();renderGroups();};
    const renderPrimary=()=>{
      primary.innerHTML=`<div class="mega-column-label">Choose a system</div>`+productTaxonomy.map((category,index)=>`<button type="button" data-mega-primary="${index}" class="${index===primaryIndex?"is-active":""}"><span class="mega-code">${escapeHtml(category.code)}</span><strong>${escapeHtml(category.title)}</strong><i>›</i></button>`).join("");
      primary.querySelectorAll("[data-mega-primary]").forEach(button=>{const activate=()=>activatePrimary(Number(button.dataset.megaPrimary));button.addEventListener("pointerenter",activate);button.addEventListener("focus",activate);button.addEventListener("click",activate);});
    };
    renderPrimary();renderGroups();
  });
}

function openQuote(sku="",intent="Request a product quote"){
  $("#quote-sku").value=sku;
  const select=$("#quote-form select[name='intent']");
  if([...select.options].some(option=>option.value===intent))select.value=intent;
  $("#quote-dialog").showModal();
}

function openProduct(sku){
  const p=state.products.find(product=>product.sku===sku);if(!p)return;
  $("#product-detail").innerHTML=`<button class="close-button detail-close" type="button" aria-label="Close product details">×</button><span class="detail-category">${escapeHtml(p.product_type||"Socomec product")}</span><h2>${escapeHtml(p.short_description)}</h2><p class="detail-sku">Socomec part number ${escapeHtml(p.sku)}</p><p class="detail-description">${escapeHtml(p.long_description||"Detailed product information is available on request.")}</p><div class="detail-grid"><div><small>Availability</small><strong>${escapeHtml(p.availability_status||"Contact for availability")}</strong></div><div><small>Supply mode</small><strong>${escapeHtml(p.supply_mode||"Confirm with quote")}</strong></div><div><small>Certification</small><strong>${escapeHtml(p.certification||"Confirm with quote")}</strong></div><div><small>Weight</small><strong>${p.weight_lb?`${escapeHtml(p.weight_lb)} lb`:"Not listed"}</strong></div></div><div class="detail-footer"><span><small>Your quoted price</small><div class="detail-price">${quotePrice(p.list_price)!=null?money.format(quotePrice(p.list_price)):"Request quote"}</div><small class="list-price-note">List ${p.list_price!=null?money.format(p.list_price):"price on request"}</small></span><button class="button button-solid" data-quote-sku="${escapeHtml(p.sku)}">Request project pricing</button></div>`;
  $("#product-dialog").showModal();
}

async function loadProducts(){
  try{
    const response=await fetch("/api/products", {cache:"no-store"});
    if(!response.ok)throw new Error("Catalog unavailable");
    const payload=await response.json();
    if(!Array.isArray(payload.products)||!payload.products.length)throw new Error("Empty catalog");
    state.products=payload.products.filter(p=>!hiddenSkus.has(String(p.sku)));
    const counts=state.products.reduce((acc,p)=>{acc[p.availability_status]=(acc[p.availability_status]||0)+1;return acc;},{});
    if($("#metric-stock"))$("#metric-stock").textContent=(counts["In stock"]||0).toLocaleString();
    if($("#metric-incoming"))$("#metric-incoming").textContent=(counts["Incoming"]||0).toLocaleString();
  }catch(error){state.products=sampleProducts.filter(p=>!hiddenSkus.has(String(p.sku)));state.usingPreview=true;}
  state.products=state.products.map(classifyStorefrontProduct);
  state.filtered=[...state.products];
  if($("#product-grid")){populateCategories();applyUrlFilters();}
  window.dispatchEvent(new Event('catalog-loaded'));
}

if($("#hero-search"))$("#hero-search").addEventListener("submit",event=>{event.preventDefault();const query=$("#hero-query").value.trim();window.location.href=`./products.html${query?`?q=${encodeURIComponent(query)}`:""}`;});
[$("#catalog-query"),$("#category-filter"),$("#availability-filter")].filter(Boolean).forEach(control=>control.addEventListener(control.tagName==="INPUT"?"input":"change",()=>{applyFilters();syncFilterUrl();}));
if($("#product-page-search"))$("#product-page-search").addEventListener("submit",event=>{event.preventDefault();applyFilters();syncFilterUrl();});
if($("#clear-filters"))$("#clear-filters").addEventListener("click",()=>{$("#catalog-query").value="";$("#category-filter").value="";$("#availability-filter").value="";applyFilters();syncFilterUrl();});
if($("#load-more"))$("#load-more").addEventListener("click",()=>{state.visible+=12;renderProducts();});
$$('[data-open-quote]').forEach(button=>button.addEventListener("click",()=>openQuote("",button.dataset.intent||"Request a product quote")));
$$('[data-close-quote]').forEach(button=>button.addEventListener("click",()=>$("#quote-dialog").close()));
if($("#product-grid"))$("#product-grid").addEventListener("click",event=>{const detail=event.target.closest("[data-detail]");const quote=event.target.closest("[data-quote-sku]");if(detail)openProduct(detail.dataset.detail);if(quote)openQuote(quote.dataset.quoteSku);});
$("#product-detail")?.addEventListener("click",event=>{if(event.target.closest(".detail-close"))$("#product-dialog").close();const quote=event.target.closest("[data-quote-sku]");if(quote){$("#product-dialog").close();openQuote(quote.dataset.quoteSku);}});
$("#quote-form")?.addEventListener("submit",event=>{event.preventDefault();const data=new FormData(event.currentTarget);const subject=`CT Power Source — ${data.get("intent")}${data.get("sku")?` — ${data.get("sku")}`:""}`;const body=[`Name: ${data.get("name")}`,`Company: ${data.get("company")}`,`Email: ${data.get("email")}`,`Phone: ${data.get("phone")||"Not provided"}`,`Request: ${data.get("intent")}`,`Part number: ${data.get("sku")||"Not specified"}`,`Quantity: ${data.get("quantity")||"Not specified"}`,"",data.get("details")||"No additional details provided."].join("\n");window.location.href=`mailto:sales@ctelectricreps.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;});

document.addEventListener("keydown",event=>{if(event.key==="/"&&$("#catalog-query")&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)){event.preventDefault();$("#catalog-query").focus();}});
$("#year").textContent=new Date().getFullYear();
initTaxonomy();

loadProducts();

// Accessible category menus: native disclosure controls support mouse, keyboard, and touch.
document.addEventListener('keydown', event => { if(event.key === 'Escape'){ const menu=document.querySelector('.header-category-menu[open]'); if(menu){menu.open=false;menu.querySelector('summary').focus();} } });
document.addEventListener('click', event => { const menu=document.querySelector('.header-category-menu[open]');if(menu && !menu.contains(event.target))menu.open=false; });
