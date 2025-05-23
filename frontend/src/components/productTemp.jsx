import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyRupeeIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { UseMyContext } from "../config/MyContext";
import PaymentButton from "./Payment";
import { toast } from "react-toastify";

const colors = ["Red", "Blue", "Black"];
const sizes = ["S", "M", "L", "XL"];

export default function ProductConfig({ item }) {
    const [TempAdded, setTempAdded] = useState()
  const {
    cart,
    setcurrentOrderId
  } = UseMyContext();

  const [selectedColor, setSelectedColor] = useState("Red");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
 const baseUrl = import.meta.env.VITE_BASE_URL
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) setQuantity(value);
  };
const token = localStorage.getItem('user_id')
  const isInCart =
    cart && cart.some((e) => e.product.id === item?.id);

  const AddtoCartFunction = async (item) => {
    const fakeCart = {
      user_id: token, 
      quantity,
      product_id: item.id,
    };

    try {
      const res = await fetch(baseUrl+"/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fakeCart),
      });
      const data = await res.json();
      setTempAdded(true)
      toast.success('added to cart')
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 rounded-md max-w-md space-y-6">
      {/* Price */}
      <div>
        <h2 className="text-2xl font-bold text-green-500 flex items-center gap-2">
          <CurrencyRupeeIcon className="size-6" />
          {Math.round(item?.price + 2)}
        </h2>
        <span className="text-gray-600 text-[10px]">
          ({item?.price}+2 )
        </span>
        <p className="text-sm text-gray-600">
          Inclusive of all taxes
        </p>
      </div>

      {/* Color Options */}
      <div>
        <Label className="block mb-2 font-medium">Color</Label>
        <RadioGroup
          value={selectedColor}
          onValueChange={setSelectedColor}
          className="flex gap-4"
        >
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <RadioGroupItem value={color} id={`color-${color}`} />
              <label htmlFor={`color-${color}`} className="text-sm capitalize">
                {color}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Size Options */}
      {item?.category === "clothes" && (
        <div>
          <Label className="block mb-2 font-medium">Size</Label>
          <RadioGroup
            value={selectedSize}
            onValueChange={setSelectedSize}
            className="flex gap-3"
          >
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <RadioGroupItem value={size} id={`size-${size}`} />
                <label htmlFor={`size-${size}`} className="text-sm">
                  {size}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <Label htmlFor="quantity" className="block mb-2 font-medium">
          Quantity
        </Label>
        <Input
          id="quantity"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
          className="w-20"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-2">
        <Button disabled={isInCart  || TempAdded}
          className={`flex-1 bg-btn  ${isInCart || TempAdded ? ' bg-black':'bg-violet-400 hover:bg-violet-700'}`}
          onClick={() => AddtoCartFunction(item)}
        >
          {TempAdded || isInCart ? "Added" : "Add to Cart ⚡"}
        </Button>
        {/* <Button variant="outline" className="flex-1 text-black" onClick={()=> checkout(item)} >Buy Now</Button> */}
        <PaymentButton amount={item?.price} />
      </div>
    </div>
  );
}
