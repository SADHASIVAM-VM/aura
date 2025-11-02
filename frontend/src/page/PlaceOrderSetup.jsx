import React, { useState } from "react";
import { BanknotesIcon, LockClosedIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import PaymentButton from "../components/Payment";
import { UseMyContext } from "../config/MyContext";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function CheckoutStepFlow() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    province: "",
    city: "",
    postal: "",
  });

  const [step, setStep] = useState("address");
  const { cart } = UseMyContext();

  const totalAmount = cart?.reduce((acc, item) => acc + item.quantity * item.product.price, 0) || 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep("payment");
  };

  const checkout = () => {
    fetch(baseUrl + "/o/checkout/6ffd704c-fcc1-4d8d-8b24-45e9f16536b0", {
      method: "POST",
    })
      .then((e) => e.json())
      .then((e) => console.log(e.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans mt-12">

      {/* Main layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10 p-8">
        {/* LEFT: Shipping Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-8">Shipping Information</h1>

          {step === "address" && (
            <form onSubmit={handleAddressSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Detail Address</label>
                <textarea
                  name="address"
                  placeholder="Enter your detail address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 rounded-2xl px-4 py-3 text-sm h-24 focus:ring-2 focus:ring-black outline-none"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Province</label>
                  <input
                    type="text"
                    name="province"
                    placeholder="Province"
                    value={form.province}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Postal Code</label>
                  <input
                    type="text"
                    name="postal"
                    placeholder="Postal code"
                    value={form.postal}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {step === "payment" && (
            <div className="mt-12">
  <h2 className="text-2xl font-semibold mb-6">Payment Summary</h2>

  {/* Payment Card */}
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
    {/* Amount */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <BanknotesIcon className="w-5 h-5 text-green-700" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-xl font-semibold">${Math.round(totalAmount)}</p>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200 my-4"></div>

    {/* Payment CTA */}
    <div className="text-center">
      <PaymentButton amount={totalAmount} />
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200 my-5"></div>

    {/* Secure Message */}
    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100">
        <LockClosedIcon className="w-4 h-4 text-gray-600" />
      </div>
      <span>Transactions are secured & encrypted</span>
    </div>
  </div>
</div>

          )}
        </div>

        {/* RIGHT: Order Summary */}
        <div className="w-full lg:w-[40%] bg-gray-50 rounded-3xl p-6 border border-gray-200 h-fit">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>

          <div className="space-y-4">
            {cart?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image_url || "https://via.placeholder.com/80"}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold">${item.product.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-lg">Order Summary</h3>
            <div className="flex justify-between text-sm mt-2">
              <span>Subtotal</span>
              <span>${totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold text-base mt-3 border-t pt-2">
              <span>Total</span>
              <span>${totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
