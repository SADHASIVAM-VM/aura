import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentButton = ({amount}) => {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const user_id = localStorage.getItem('user_id')
  const navigate = useNavigate()
  const handlePayment = async () => {
    const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
  
};loadRazorpayScript()

    try {
      // 1. Create Razorpay order
      const createOrderRes = await fetch(baseUrl+'/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const orderData = await createOrderRes.json();
      console.log(orderData)
      const { id: order_id } = orderData;

      // 2. Set up Razorpay Checkout options
      const options = {
        key: import.meta.env.VITE_rp_key,
        amount: amount *100,
        currency: 'INR',
        name: 'aura.inc',
        description: 'payment proccessing here...',
        order_id,
        handler: async (response) => {
          console.log(response)
          // 3. Verify payment on backend
          const verifyRes = await fetch(baseUrl+'/api/payment/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          

          // confrom order
          
            const create_order = await fetch(`${baseUrl}/o/checkout/${user_id}`, {
             method: 'POST'});

             if(create_order.ok){
                navigate('/')}
             
          alert(verifyData.message);
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PaymentButton;
