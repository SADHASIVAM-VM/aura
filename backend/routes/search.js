const express = require('express')
const supabase = require('../util/Sb')
const Searchroute = express.Router()

Searchroute.get('/em', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email query parameter is required' });
  }

  try {
    const { data, error } = await supabase
      .from('users') // 🔁 Replace with your table name
      .select('id')  // Or 'email' or any column — we just need to know if it exists
      .eq('email', email)
      .single();     // Expect only one match

    if (error) {
      if (error.code === 'PGRST116') { // Not found
        return res.json({ exists: false });
      }
      return res.status(500).json({ message: 'Database error', error });
    }

    return res.json({ exists: true });

  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});
Searchroute.get('/',async(req, res)=>{
    const search = req.query.search;
    const category = req.query.category;
 

    try{
        let query = supabase.from('products').select('*');


if ( search) {
  query = query.ilike('name', `%${search}%`);
} else if(category) {
  query = query.ilike('category', `%${category}%`);
}

const { data, error } = await query;
        if(error){
            res.status(400).json({message:"sorry unable to find"})
        }
        res.status(200).json({data:data})
    }
    catch(err){
         res.status(500).json({err: err.message})
    }
})

module.exports = Searchroute;