const c=require('../server/commerce.cjs');const accounts=require('../server/accounts.cjs');
module.exports=async(req,res)=>{try{
  if(!c.ready())throw c.fail(503,'PO submission is awaiting setup. Your cart is saved; no order has been submitted.');
  const body=c.guard(req);if(!['po','qb_invoice'].includes(body.method)||!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.idempotency_key||''))throw c.fail(400,'Invalid checkout request.');
  if(body.method==='qb_invoice'&&process.env.QB_INVOICE_REQUESTS_ENABLED!=='true')throw c.fail(503,'QuickBooks invoice requests are awaiting setup. No payment has been taken.');
  let userId=null;if(accounts.token(req)&&body.guest_checkout!==true)userId=(await accounts.user(req)).id;
  const contact=c.customer(body);const hash=c.fingerprint({contact,items:body.items,method:body.method,userId});
  const existing=await c.db('ct_po_requests?id=eq.'+body.idempotency_key+'&select=id,request_hash');
  if(existing.length){if(existing[0].request_hash!==hash)throw c.fail(409,'This request changed. Refresh the cart and try again.');return res.status(200).json({order_id:existing[0].id,status:'pending_approval'});}
  await c.quota('po',100);const items=c.priceItems(body.items,await c.catalog());
  await c.db('ct_po_requests?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=ignore-duplicates,return=representation'},body:JSON.stringify({id:body.idempotency_key,request_hash:hash,customer:contact,items,subtotal_cents:items.reduce((n,x)=>n+x.quantity*x.unit_price_cents,0),currency:'USD',status:'pending_approval',payment_method:body.method,user_id:userId})});
  const saved=await c.db('ct_po_requests?id=eq.'+body.idempotency_key+'&select=id,request_hash');
  if(saved[0]?.request_hash!==hash)throw c.fail(409,'This request changed. Refresh the cart and try again.');
  res.setHeader('Cache-Control','no-store');return res.status(201).json({order_id:body.idempotency_key,status:'pending_approval'});
}catch(e){return c.error(res,e);}};
