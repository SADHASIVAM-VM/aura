const express = require('express')
const supabase = require('../util/Sb')
const WishlistRoute = express.Router()

WishlistRoute.post('/',async (req, res)=>{
    const { user_id, product_id } = req.body;
  console.log(product_id)

  if (!user_id || !product_id) {
    return res.status(400).json({ message: "user_id, product_id, and quantity are required" });
  }

  try {
    const { data, error } = await supabase
      .from("wishlists")
      .insert([{ user_id, product_id}]);

    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({ message: "Product added to Whislist", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

WishlistRoute.get('/', async(req, res)=>{
  const {user_id} = req.query

  try {
    const { data, error } = await supabase
      .from("wishlists")
      .select(`id, product:product_id(name, price, image_url,id)`)
      .eq('user_id', user_id)

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({data:data});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

WishlistRoute.delete('/delete', async(req, res)=>{
  const {user_id, del_id} = req.query;
  console.log(user_id, del_id)

  try {
    const { data, error } = await supabase
      .from("wishlists")
      .delete().eq("user_id", user_id).eq('id', del_id);

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = WishlistRoute;