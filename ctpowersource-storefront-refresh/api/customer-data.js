const c=require('../server/commerce.cjs');const a=require('../server/accounts.cjs');
module.exports=async(req,res)=>{res.setHeader('Cache-Control','no-store');try{
 const u=await a.user(req);
 if(req.method==='GET'){const [profiles,boms]=await Promise.all([a.data(u,'ct_customer_profiles?select=name,company,phone,address&user_id=eq.'+u.id),a.data(u,'ct_customer_boms?select=id,name,notes,items,review_required,updated_at&user_id=eq.'+u.id+'&order=updated_at.desc&limit=100')]);return res.status(200).json({profile:profiles[0]||null,boms});}
 const body=c.guard(req,150000);
 if(body.action==='profile'){const value={...a.profile(body),user_id:u.id};await a.data(u,'ct_customer_profiles?on_conflict=user_id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(value)});return res.status(200).json({ok:true});}
 if(body.action==='save-bom'){const value=a.bom(body);if(body.id&&!/^[0-9a-f-]{36}$/i.test(body.id))throw c.fail(400,'Invalid BOM.');let saved;if(body.id){saved=await a.data(u,'ct_customer_boms?id=eq.'+body.id+'&user_id=eq.'+u.id,{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({...value,updated_at:new Date().toISOString()})});}else{saved=await a.data(u,'ct_customer_boms',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({...value,user_id:u.id})});}if(!saved?.length)throw c.fail(404,'BOM not found in your account.');return res.status(200).json({bom:saved[0]});}
 throw c.fail(400,'Invalid account action.');
}catch(e){return c.error(res,e);}};
