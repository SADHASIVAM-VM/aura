import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CurrencyRupeeIcon,
  CreditCardIcon,
  BanknotesIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";
import PaymentButton from "../components/Payment" 
import { UseMyContext } from "../config/MyContext";

 const baseUrl = import.meta.env.VITE_BASE_URL
export default function CheckoutStepFlow() {
  const [step, setStep] = useState("address");
   
  const{cart} =UseMyContext()
   console.log(cart)

   const totalAmount = cart?.reduce((acc,item)=>{
    return  acc + item.quantity *item.product.price
   },0) 
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // You should validate or save data here before moving on
    setStep("payment");
  };
function checkout (){
  fetch(baseUrl+'/o/checkout/6ffd704c-fcc1-4d8d-8b24-45e9f16536b0',
    {
      method:'post'
      
    }
  )
  .then((e)=> e.json())
  .then((e)=> console.log(e.data))
  .catch((err)=> console.log(err))

}


  return (
    <div className="mt-12 p-5 flex flex-col md:flex-row gap-5">
      <div className="flex-1 py-8 px-5">
        <Tabs value={step} className="w-full">
          {/* Tab headers (optional hidden if linear flow) */}
          <TabsList className=" w-full grid-cols-2 hidden">
            <TabsTrigger value="address">Shipping Address</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>

          {/* Address Step */}
          <TabsContent value="address">
            
            <form className="space-y-4 max-w-6xl mx-auto mt-4" onSubmit={handleAddressSubmit}>
                        <h2 className="text-xl font-semibold">Shipping Address</h2>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" className="border-black py-5" placeholder="John Doe" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" className="border-black py-5" type="email" placeholder="john@example.com" required />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" className="border-black py-5" type="tel" placeholder="+1 234 567 8901" required />
              </div>
              <div>
                <Label htmlFor="address">Address Line 1</Label>
                <Input id="address" className="border-black py-5" placeholder="123 Main St" required />
              </div>
              <div>
                <Label htmlFor="address2">Address Line 2 (optional)</Label>
                <Input id="address2" className="border-black py-5" placeholder="Apt, Suite, etc." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" className="border-black py-5" required />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" className="border-black py-5" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postal">ZIP / Postal Code</Label>
                  <Input id="postal" className="border-black py-5" required />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" className="border-black py-5" placeholder="e.g. United States" required />
                </div>
              </div>
              <Button type="submit" className="w-52 mt-2">
                Continue to Payment
              </Button>
            </form>
          </TabsContent>

          {/* Payment Step */}
        <TabsContent value="payment">
  <div className="mt-6 p-6 rounded-lg  border-gray-200 bg-[#9]/40  max-w-lg mx-auto">
    {/* Header */}
    <div className="mb-6 text-center">
      <h2 className="text-2xl logo  font-semibold ">Review Your Payment <span className="text-red-400 text-6xl">.</span></h2>
      <p className="text-sm  mt-1">Confirm the amount and proceed to checkout</p>
    </div>

    {/* Amount Block */}
    <div className="flex justify-between items-center bg-gray-100 rounded-md px-4 py-4 mb-6 border">
      <div className="flex items-center gap-2 text-black">
        <BanknotesIcon className="w-6 h-6 text-green-600" />
        <span className="text-lg font-medium">Total Amount</span>
      </div>
      <div className="text-3xl font-bold bg-[#4936a9] p-2 rounded-2xl text-white flex items-center gap-1">
        <CurrencyRupeeIcon className="size-6" />
        {Math.round(totalAmount)}
      </div>
    </div>

    {/* Payment Button */}

<div className="bg-btn p-3 rounded-md text-center w-72 text-white">

      <PaymentButton amount={totalAmount}/>
</div>


    {/* Security Notice */}
    <div className="mt-5 text-center text-sm text-white flex items-center justify-center gap-2">
      <LockClosedIcon className="w-4 h-4 text-white" />
      Transactions are secured & encrypted.
    </div>
  </div>
</TabsContent>


        </Tabs>
      </div>
    </div>
  );
}

