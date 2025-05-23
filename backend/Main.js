const express = require('express')
const app = express()
const path = require('path')
const LoginRouter = require('./routes/LoginRoute')
const signRouter = require('./routes/SignUpRoute')
const ProductRouter = require('./routes/ProductRoute')
const CartRouter = require('./routes/CartRoute')
const orderRouter = require('./routes/OrdersRoute')
const { PYrouter } = require('./routes/payment')
const cors = require('cors');
const Uroute = require('./routes/auth_user')
const Searchroute = require('./routes/search')
const WishlistRoute = require('./routes/Wishlist')
require('dotenv').config({path:path.join(__dirname,'../config/.env')})


app.use(cors());
app.use(express.json());
app.use('/api/auth/login', LoginRouter)
app.use('/api/auth/signup', signRouter)
app.use('/products', ProductRouter)
app.use('/cart', CartRouter)
app.use('/o', orderRouter)
app.use('/api/payment', PYrouter)
app.use('/ro', Uroute)
app.use('/search', Searchroute)
app.use('/wishlist',WishlistRoute)

const port = 3000
app.get('/', (req, res) => res.send('aura.inc '))
app.listen(port, () => console.log(`server running... @${port}!`))