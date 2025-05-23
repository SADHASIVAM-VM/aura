const express = require('express')
const { signUp, getUsers } = require('../controllers/SignUp')
const signRouter = express.Router()

signRouter
.get('/', getUsers)
.post('/', signUp)


module.exports = signRouter