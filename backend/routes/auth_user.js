const express = require('express')
const authMiddleware = require('../middleware/JWT_vaildater')
const supabase = require('../util/Sb')
const Uroute = express.Router()

Uroute.get('/user/me',authMiddleware ,async (req,res)=>{
     const user = await supabase.from('users').select('*').eq('id', req.user.id);
  try{
    if(!user){
    res.status(400).json({message:'the user is unable'})
  }
  res.json(user);
  }
  catch(err){
    res.status(500).json({err:err.message});
  }
})
module.exports = Uroute