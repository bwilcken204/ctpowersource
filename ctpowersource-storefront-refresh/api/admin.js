const c = require('../server/commerce.cjs');
const accounts = require('../server/accounts.cjs');
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (!['GET','POST'].includes(req.method)) throw c.fail(405,'Method not allowed');
    const user = await accounts.user(req);
    if (user.email?.trim().toLowerCase() !== 'sales@ctelectricreps.com') throw c.fail(403,'CTE administrator access required.');
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw c.fail(503,'Admin database connection is awaiting setup.');
    if (req.method === 'POST') {
      const b = c.guard(req,8000);
      if (!/^[0-9a-f-]{36}$/i.test(b.id||'') || !['pending_approval','approved','closed_invoiced','declined'].includes(b.status)) throw c.fail(400,'Invalid order update.');
      const update = {status:b.status};
      for (const key of ['invoice_number','tracking_number','internal_notes']) {
        if (typeof b[key] !== 'string' || b[key].length > (key==='internal_notes'?4000:200)) throw c.fail(400,'Check the order fields.');
        update[key] = b[key].trim();
      }
      if (b.status==='closed_invoiced' && !update.invoice_number) throw c.fail(400,'Enter the invoice number before closing the order.');
      update.admin_updated_at = new Date().toISOString();
      update.admin_updated_by = user.id;
      const saved = await c.db('ct_po_requests?id=eq.'+b.id, {method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify(update)});
      if (!saved.length) throw c.fail(404,'Order not found.');
      return res.status(200).json({ok:true});
    }
    const url = new URL(req.url,'https://admin.local');
    const page = Number(url.searchParams.get('page')||1);
    if (!Number.isInteger(page)||page<1||page>100000) throw c.fail(400,'Invalid page.');
    const offset=(page-1)*50;
    if (url.searchParams.get('tab') === 'customers') {
      const r = await fetch(new URL('/auth/v1/admin/users?page='+page+'&per_page=50',process.env.NEXT_PUBLIC_SUPABASE_URL),{headers:{apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,Authorization:'Bearer '+process.env.SUPABASE_SERVICE_ROLE_KEY},signal:AbortSignal.timeout(15000)});
      if (!r.ok) throw c.fail(502,'Unable to load registered users.');
      const data=await r.json();
      const users=(data.users||[]).map(u=>({id:u.id,email:u.email,created_at:u.created_at,last_sign_in_at:u.last_sign_in_at}));
      const ids=users.map(u=>u.id);
      const profiles=ids.length?await c.db('ct_customer_profiles?user_id=in.('+ids.join(',')+')&select=user_id,name,company,phone,address'):[];
      return res.status(200).json({users:users.map(u=>({...u,profile:profiles.find(p=>p.user_id===u.id)||{}})),hasMore:users.length===50,page});
    }
    const stage=url.searchParams.get('status')||'all';
    if (!['all','pending_approval','approved','closed_invoiced','declined'].includes(stage)) throw c.fail(400,'Invalid order stage.');
    const filter=stage==='all'?'':'&status=eq.'+stage;
    const orders=await c.db('ct_po_requests?select=id,created_at,status,customer,items,subtotal_cents,currency,payment_method,user_id,invoice_number,tracking_number,internal_notes,admin_updated_at&order=created_at.desc,id.asc&limit=51&offset='+offset+filter);
    return res.status(200).json({orders:orders.slice(0,50),hasMore:orders.length>50,page});
  } catch(e) { return c.error(res,e); }
};
