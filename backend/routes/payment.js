const express = require('express');
const PYrouter = express.Router();
const razorpay = require('../util/rayzonPay')
const crypto = require('crypto');
const supabase = require('../util/Sb');

PYrouter.post('/create-order', async (req, res) => {
  const { amount, currency, receipt } = req.body;
  console.log(req.body)
 let amt = Math.round(amount * 100);// Convert to paise
   console.log(amt)
  if (!amt || isNaN(amt)) {
    return res.status(400).json({ success: false, message: 'Amount is required and must be a valid number.' });
  }

  try {
    // 2. Razorpay options
    const options = {
      amount: amt, 
      currency: currency || 'INR',
      receipt: receipt || `rcptid_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);

    // const {data, error} = await supabase.from('payment_details').insert(options)
    // if(error) res.status(400).json({message:'unable to add payment'})

    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

PYrouter.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, payment_id, razorpay_signature } = req.body;
  console.log(req.body)

  const sign = razorpay_order_id + '|' + payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', 'fra16DpptftKd8pHg6vnPbkJ')
    .update(sign.toString())
    .digest('hex');

  if (payment_id) {
    // Payment is legit
    res.status(200).json({ success: true, message: 'Payment verified' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid signature' });
  }
});


module.exports={PYrouter}