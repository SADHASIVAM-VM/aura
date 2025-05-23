const express = require('express')
const { Login } = require('../controllers/LoginCon')

const LoginRouter = express.Router()

LoginRouter.post('/', Login)

module.exports = LoginRouter;