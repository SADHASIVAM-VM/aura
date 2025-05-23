const express = require('express');
const { AdminOrdersView, orders, checkout } = require('../controllers/OrdersCon');
const orderRouter = express.Router();

orderRouter
.get('/order/:user_id', orders)
.get('/admin/orders', AdminOrdersView)
.post('/checkout/:user_id', checkout)

module.exports = orderRouter