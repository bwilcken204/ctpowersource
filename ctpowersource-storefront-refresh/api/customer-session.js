const c=require('../server/commerce.cjs');const a=require('../server/accounts.cjs');
module.exports=async(req,res)=>{res.setHeader('Cache-Control','no-store');try{
 if(req.method==='GET'){if(!a.ready())return res.status(200).json({configured:false,user:null});if(!a.token(req))return res.status(200).json({configured:true,user:null});try{const u=await a.user(req);return res.status(200).json({configured:true,user:{id:u.id,email:u.email}});}catch(e){if(e.status!==401)throw e;a.cookie(res,'',0);return res.status(200).json({configured:true,user:null});}}
 const body=c.guard(req,1500);
 if(body.action==='logout'){const t=a.token(req);a.cookie(res,'',0);if(t&&a.ready())try{await a.auth('logout','POST',null,t);}catch{}return res.status(200).json({ok:true});}
 if(!a.ready())throw c.fail(503,'Customer sign-in is awaiting connection. You can continue as a guest.');
 if(typeof body.email!=='string'||body.email.length>200||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))throw c.fail(400,'Enter a valid email address.');
 if(body.action==='code'){await a.auth('otp','POST',{email:body.email,create_user:true});return res.status(200).json({message:'Check your inbox for a sign-in code.'});}
 if(body.action==='verify'&&/^\d{6,10}$/.test(body.code||'')){const session=await a.auth('verify','POST',{email:body.email,token:body.code,type:'email'});if(!session.access_token||!session.user?.id)throw c.fail(401,'Unable to sign in. Try a new code.');a.cookie(res,session.access_token,Math.min(session.expires_in||3600,3600));return res.status(200).json({user:{id:session.user.id,email:session.user.email}});}
 throw c.fail(400,'Invalid sign-in request.');
}catch(e){if(e.status===401)a.cookie(res,'',0);return c.error(res,e);}};
