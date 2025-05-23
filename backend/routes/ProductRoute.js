const express = require('express')
const { getAllProducts, singleProduct, CreateProduct, UpdateProduct, DeleteProduct } = require('../controllers/ProductCon');
const authMiddleware = require('../middleware/JWT_vaildater');
const ProductRouter= express.Router()

ProductRouter.get('/',authMiddleware, getAllProducts)
.get('/:id', singleProduct)
.post('/', CreateProduct)
.put('/:id', UpdateProduct)
.delete('/:id', DeleteProduct)

module.exports = ProductRouter;