const crypto = require('node:crypto');
const fail = (status, message) => Object.assign(new Error(message), {status});
function ready(){return process.env.PO_ENABLED==='true' && !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY && !!process.env.STOREFRONT_ORIGIN;}
function guard(req,max=30000){
  if(req.method!=='POST')throw fail(405,'Method not allowed');
  if(!process.env.STOREFRONT_ORIGIN || req.headers.origin!==process.env.STOREFRONT_ORIGIN)throw fail(403,'Please submit from the storefront.');
  if(!String(req.headers['content-type']||'').startsWith('application/json'))throw fail(415,'JSON required');
  const body=typeof req.body==='string'?JSON.parse(req.body):req.body;
  if(!body || JSON.stringify(body).length>max)throw fail(400,'Request is too large or incomplete.');
  return body;
}
async function db(path,options={}){
  const result=await fetch(new URL('/rest/v1/'+path,process.env.NEXT_PUBLIC_SUPABASE_URL),{...options,headers:{apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,Authorization:'Bearer '+process.env.SUPABASE_SERVICE_ROLE_KEY,'Content-Type':'application/json',...options.headers},signal:AbortSignal.timeout(15000)});
  if(!result.ok)throw fail(502,'The service is temporarily unavailable. Please try again.');
  return result.status===204?null:result.json();
}
async function quota(kind,limit){const allowed=await db('rpc/ct_take_quota',{method:'POST',body:JSON.stringify({bucket_name:kind,daily_limit:limit})});if(allowed!==true)throw fail(429,'Today’s request limit has been reached. Please contact CTE.');}
async function catalog(){let all=[];for(let offset=0;offset<5000;offset+=1000){const rows=await db('public_product_catalog?select=sku,manufacturer,short_description,long_description,product_type,list_price,currency,purchasable&order=sku.asc&limit=1000&offset='+offset);all.push(...rows);if(rows.length<1000)return all;}throw fail(503,'Catalog exceeds the configured limit. Please contact CTE.');}
function priceItems(items,products){
  if(!Array.isArray(items)||!items.length||items.length>100)throw fail(400,'Choose 1–100 products.');
  const seen=new Set();return items.map(item=>{
    if(!item||typeof item.sku!=='string'||seen.has(item.sku)||!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>999)throw fail(400,'Invalid product or quantity.');seen.add(item.sku);
    const matches=products.filter(p=>String(p.sku)===item.sku);const p=matches[0];
    if(matches.length!==1||p.purchasable===false||p.manufacturer?.toLowerCase()!=='socomec'||p.currency!=='USD'||p.list_price==null||!Number.isFinite(Number(p.list_price))||Number(p.list_price)<=0)throw fail(400,'A product or price requires CTE confirmation: '+item.sku);
    const cents=Math.round(Number(p.list_price)*0.375*100);if(!Number.isSafeInteger(cents*item.quantity))throw fail(400,'Price requires confirmation.');
    return {sku:item.sku,description:p.short_description,quantity:item.quantity,unit_price_cents:cents};
  });
}
function customer(body){const out={};for(const [key,max]of Object.entries({name:150,company:150,email:200,phone:50,address:1000,po_number:100,notes:2000})){if(typeof body[key]!=='string'||body[key].length>max||(!body[key].trim()&&key!=='notes'&&!(key==='po_number'&&body.method==='qb_invoice')))throw fail(400,'Please complete the contact and PO fields.');out[key]=body[key].trim();}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out.email))throw fail(400,'Enter a valid email.');return out;}
function fingerprint(value){return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');}
function error(res,e){res.setHeader('Cache-Control','no-store');return res.status(e.status||503).json({error:e.status?e.message:'This feature is temporarily unavailable. Please contact CTE.'});}
module.exports={ready,guard,db,quota,catalog,priceItems,customer,fingerprint,fail,error};
