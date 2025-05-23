const supabase = require("../util/Sb");

const addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  console.log(product_id)

  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ message: "user_id, product_id, and quantity are required" });
  }

  try {
    const { data, error } = await supabase
      .from("cart_items")
      .insert([{ user_id, product_id, quantity }]);

    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({ message: "Product added to cart", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cart items for a user
const getCart = async (req, res) => {
  const {user_id} = req.params;


  try {
    const { data, error } = await supabase
      .from("cart_items")
      .select(`id, quantity, product:product_id(name, price, image_url,id)`)
      .eq("user_id", user_id);

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({ cart: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update item quantity
const updateCartItem = async (req, res) => {
  const { cart_id } = req.params;
  const { quantity } = req.body;

  if (!quantity) return res.status(400).json({ message: "Quantity is required" });

  try {
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", cart_id);

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({ message: "Cart item updated", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const userId = req.query.user_id;
  const itemId = req.query.id;

  try {
    const { data, error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", userId).eq('id', itemId);

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({ message: "Item removed from cart" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
};