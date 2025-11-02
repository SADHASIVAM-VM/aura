import { Button } from "@/components/ui/button"
import { TrashIcon } from "@heroicons/react/24/solid"
import { UseMyContext } from "../config/MyContext"
import { useNavigate } from "react-router-dom"
import emptyCart from '../assets/IconPng/Empcart.png'
import { CurrencyRupeeIcon, ShoppingBagIcon } from "@heroicons/react/16/solid"
import { IterationCcw } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

 const baseUrl = import.meta.env.VITE_BASE_URL
export default function Cart() {
const uuiid = localStorage.getItem('user_id')
 const navigate = useNavigate()
  const {cart, setCart} = UseMyContext()
  console.log(cart)

  // const updateQuantity = (id, value) => {
  //   const qty = Math.max(1, parseInt(value) || 1)
  //   setCart((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, quantity: qty } : item
  //     )
  //   )
  // }

 const removeItem = async (id) => {
  try {
     setCart((prev) => prev.filter((item) => item.id !== id))
    const response = await fetch(`${baseUrl}/cart?user_id=${uuiid}&id=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error("Failed to delete item");

    // Update cart without reload
    setCart(prev => prev.filter(item => item.id !== id));
  } catch (error) {
    console.error("Error removing item:", error);
  }
};
  const totalAmount = cart&&cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen mt-20 bg-white text-black md:p-8 p-2 ">
  <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
    {/* Cart Table */}
    <div className="lg:col-span-2 space-y-4">
      <div className=" p-6">
        {cart && cart.length > 0? cart?.map((item) => (
          <div key={item.id} className="grid grid-cols-5 place-cr place-items-center  py-4 border-b">
            <div className="flex items-center gap-4">
              <img
                src={item.product.image_url}
                alt={'img'}
                className="w-20 h-20 object-contain rounded-lg"
              />
             
            </div>
            <div>
                <h4 className="font-semibold ">{(item.product.name).length > 25 ? item.product.name.slice(0,20)+'...':(item.product.name) }</h4>
                {/* <p className="text-gray-500 text-sm">Set · Colour: {item.product.color || "Default"}</p> */}
              </div>
            <div className="flex items-center gap-3">

              <span className=" flex items-center gap-1 "><IterationCcw className="size-5"/> {item.quantity}</span>
     
            </div>

            <div className="w-24 text-right font-medium flex items-center gap-1"> <CurrencyRupeeIcon className="size-6 text-green-500"/> {Math.round(item.product.price * item.quantity)}</div>

            <button
              className="text-red-500 hover:text-red-700"
            ><AlertDialog>
  <AlertDialogTrigger>
              <TrashIcon className="w-5 h-5" /></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => removeItem(item.id)}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

            </button>
          </div>
        ))
      : <div className="flex flex-col items-center justify-center gap-5">
        <img className="w-64 h-64" src={"https://cdn-icons-png.flaticon.com/512/11329/11329060.png"} alt="" />
        {/* <p className="text-xs bg-red-400 p-2 rounded-xl text-white ">Your Cart is Empty ☹️</p> */}
      </div>
      }
       
      </div>
    </div>

    {/* Order Summary */}
    <div className="rounded-xl border h-fit border-gray-200 shadow-sm p-6 sticky top-20 ">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Discount voucher"
          className="border w-full px-4 py-2 rounded-lg mb-2"
        />
        <Button className="btn text-white w-full">Apply</Button>
      </div>

      <div className="text-sm space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Sub Total</span>
          <span className="flex gap-2 items-center justify-between w-16">  <CurrencyRupeeIcon className="size-4 text-green-500"/>{Math.round(totalAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount (10%)</span>
          <span className="text-red-500 flex gap-2 items-center justify-between w-16">  <CurrencyRupeeIcon className="size-4 "/>~</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery fee</span>
          <span className="flex gap-2 items-center justify-between w-16 text-red-500 line-through">  <CurrencyRupeeIcon className="size-4 text-red-500 line-through"/>50</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span className="flex gap-2 items-center justify-between w-16">  <CurrencyRupeeIcon className="size-4 text-green-500"/>{Math.round(totalAmount)}</span>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-4">
        ✔ 7 Days Limited Warranty against manufacturer's defects. Details
      </p>

      <Button
        className="bg-black text-white w-full py-2"
        onClick={() => navigate("/checkout")}
      >
        Checkout Now
      </Button>
    </div>
  </div>
</div>

  )
}
