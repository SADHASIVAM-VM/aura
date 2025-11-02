const supabase = require("../util/Sb");



// Get all cart items form the current user
const checkout = async (req, res) => {
  const { user_id } = req.params;
  console.log(user_id)

  try {
    const { data:cart_items, error:cart_error } = await supabase
      .from("cart_items")
      .select(`*, product:product_id(price)` )
      .eq("user_id", user_id);

    console.log('===1===',cart_items)
    if (cart_error) return res.status(400).json({ error: error.message });
    if(!cart_items || cart_items.length == 0)  return res.status(400).json({ error: 'Cart is empty' });

//   sum of total items
const total = cart_items.reduce((sum, item) => {
    const price = item?.product.price
    return sum + price * item.quantity;
}, 0);
console.log('===2===',total)
  
    // 3. Create order
    const { data:order, error:orderError } = await supabase
      .from('orders')
      .insert({ user_id: user_id, total_amount:total, status: 'pending' })
      .select('*')
     const createdOrder = order?.[0];
      if (!createdOrder) return res.status(500).json({ error: 'Order creation failed' });



    // create orders_item table
    const orderItemsData = cart_items.map(item => ({
  order_id: createdOrder.id, 
  product_id: item.product_id,
  quantity: item.quantity,
  price: item.product?.price || 0  
}));
    console.log(orderItemsData)

    //inser into order items
    const { data:order_item, error: orders_itemsError } = await supabase
  .from('order_items')
  .insert(orderItemsData);

if (orders_itemsError) {
  return res.status(500).json({ error: 'orders_item 3 # ' + orders_itemsError.message });
}
    //  clear cart table
      const { error: clearError } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user_id);

    if (clearError) return res.status(500).json({ error: "orders_item clear "+clearError.message });

    res.status(201).json({ message: 'Order placed successfully', order });


}   
  catch (error) {
    res.status(500).json({ error:'#########'+ error.message });
  }
};

// admin order dashboard
const AdminOrdersView = async (req, res) => {
   const {user_id}=req.params
//    try{
//     if(user_id){
//     const {data, error} = await supabase.from('users').select('role')

//     if(error){
//         res.status(400).json({message: " THROW AN ERROR FROM ADMINORDER"})
//     }
  
//     if(data.toLocaleString().toLowerCase() == 'admin ' || data == 'admin'){
//         const {data:orders, error:orders_err} = await supabase.from('orders').select('*')

//         if(orders_err){
//             return res.status(400).json({message:'something went wrong'})
//         }
//         if(orders.length == 0 || !orders){
//             return  res.status(400).json({message:'empty orders'})
//         }
//         res.status(200).json({data:orders})
//     }
//    }
//    }
//    catch(err){
//     res.status(500).json({error: err.message})
//    }

try{
    const {data:orders, error:orders_err} = await supabase.from('order_items').select('*, product:product_id(name,image_url), orderBy:order_id(user_id)   )')
    if (orders_err) return res.status(500).json({ error: orders_err.message });
     if(orders.length == 0 || !orders){
     return  res.status(400).json({message:'empty orders'})}
    res.status(201).json({ message: 'admin Orders', orders });
    

} catch (error) {
    res.status(500).json({ error: error.message });
  }

    
    
}

// particular User Orders
const orders = async (req, res) => {
   const {user_id} = req.params;

   try{

 if(user_id){
    const {data, error} = await supabase.from('orders').select('*').eq('user_id', user_id)

    if(error){
        res.status(400).json({message: " THROW AN ERROR FROM ORDER"})
    }
 if(data.length == 0 || !data){
            return  res.status(400).json({message:'empty orders'})
        }
        res.status(200).json({data:data})
   }
}catch(err){
    res.status(500).json({error: err.message})
   }}

module.exports = {checkout, AdminOrdersView,orders}