import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { toast } from "react-toastify"

const categories = ["Shoes", "Clothing", "Electronics", "Home", "Accessories"]

export default function AddItemForm() {
   const baseUrl = import.meta.env.VITE_BASE_URL
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    image_url: "",
    stock_quantity: 0,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(baseUrl+"/products/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((json) => toast.success('item added to aura'))
      .catch((err) => toast.error('unable to add item'))
  }

  return (
    <div className="min-h-screen  py-12 px-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white  rounded-xl p-8 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Create Your Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image URL Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Product Image Link
              </Label>
              <Input
                name="image_url"
                placeholder="https://example.com/image.jpg"
                value={formData.image_url}
                onChange={handleChange}
                className="bg-gray-100 border px-4 py-2 rounded-md"
              />
              <p className="text-xs text-gray-500">
                Accepted formats: .jpg, .png, .gif · Max size: 2MB
              </p>
            </div>

            {/* Image Preview */}
            <div className="bg-gray-100 rounded-md flex items-center justify-center h-40">
              {formData.image_url ? (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/placeholder.png"
                  }}
                  className="h-full object-contain"
                />
              ) : (
                <p className="text-gray-500 text-sm">Enter an image link above</p>
              )}
            </div>
          </div>

         <div className="flex gap-5 items-center">
           {/* Product Name */}
          <div className="flex-1">
            <Label className="text-sm font-semibold text-gray-700">Product Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Example: Wireless Headphones"
              className="mt-1 bg-gray-100 border px-4 py-3 rounded-md w-full"
            />
            
          </div>

          {/* Category Selector */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">Select a Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  category: value,
                }))
              }
            >
              <SelectTrigger className="mt-1 bg-gray-100 border px-4 py-3 rounded-md w-full">
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
         </div>

          {/* Description */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product clearly and concisely"
              className="mt-1 bg-gray-100 border px-4 py-3 rounded-md w-full min-h-[120px]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Need ideas? <a href="#" className="text-blue-600 underline">See examples</a>
            </p>
          </div>

          {/* Price */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">Price (₹)</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 bg-gray-100 border px-4 py-3 rounded-md w-full"
              placeholder="e.g. 1999"
            />
          </div>

          {/* Quantity */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">Stock Quantity</Label>
            <Input
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              className="mt-1 bg-gray-100 border px-4 py-3 rounded-md w-full"
              placeholder="e.g. 10"
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="bg-violet-500 hover:bg-violet-700 text-white w-full md:w-52 float-end py-3 rounded-md text-sm font-medium"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
