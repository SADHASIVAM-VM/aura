const express = require('express')
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/CartCon')
const CartRouter = express.Router()

CartRouter.get('/:user_id', getCart)
.post('/', addToCart)
.put('/:id',   updateCartItem)
.delete('/', removeFromCart)

module.exports = CartRouter;