// razorpay.js
const Razorpay = require('razorpay');
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

var k_secret = process.env.RP_SECRET
var k_id = process.env.RP_KEY
const razorpay = new Razorpay({
  key_id:k_id,
  key_secret:k_secret,
});

module.exports = razorpay;
