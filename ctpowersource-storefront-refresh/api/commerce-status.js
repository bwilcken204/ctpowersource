const {ready}=require('../server/commerce.cjs');
module.exports=(req,res)=>{res.setHeader('Cache-Control','no-store');return res.status(200).json({po:ready(),card:false,qbInvoice:ready()&&process.env.QB_INVOICE_REQUESTS_ENABLED==='true',ai:ready()&&process.env.AI_ENABLED==='true'&&!!process.env.OPENAI_API_KEY&&!!process.env.OPENAI_MODEL});};
