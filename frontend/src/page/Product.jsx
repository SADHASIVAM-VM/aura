import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TagIcon } from '@heroicons/react/16/solid'
import ProductConfig from '../components/productTemp'
import Carded from '../components/Carded'
import { User } from 'lucide-react'

 const baseUrl = import.meta.env.VITE_BASE_URL
const Product = () => {
  const [oneItem, setOneItem] = useState()

  const { id } = useParams()

  useEffect(() => {
    fetch(`${baseUrl}/products/${id}`)
      .then(res => res.json())
      .then(json => setOneItem(json))
      .catch(err => console.error(err))
  }, [id])

  const product = oneItem?.data[0]
  console.log(product)

  return (
    <div className="bg-[#f9f9f9] text-black py-10 px-6 lg:px-20 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Side - Product Images */}
        <div className="flex flex-col gap-4items-center">
          <img
            src={product?.image_url}
            alt={'img....'}
              onError={(e) => {
    e.target.onerror = null // Prevents infinite loop if placeholder also fails
    e.target.src = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-5_large.png?v=1530129199' // Replace with your placeholder path
  }}
            className="rounded-lg p-3 w-full max-w-md h-96 object-contain shadow"
          />
          {/* Thumbnails - Optional */}
          <div className=" gap-2 hidden">
            <img src={product?.image_url} className="w-20 h-20 object-cover rounded-lg border" />
            <img src={product?.image_url} className="w-20 h-20 object-cover rounded-lg border" />
            <img src={product?.image_url} className="w-20 h-20 object-cover rounded-lg border" />
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div>
          <p className="text-sm text-gray-500 mb-2">{product?.category}</p>
          <h1 className="text-3xl font-semibold mb-1">{product?.name}</h1>
     

          {/* Size Selector */}
          {
            product?.category.includes('shoes', 'fashion') &&
            <div className="mb-3">
            <p className="text-sm mb-2 font-medium">Select Size</p>
            <div className="flex gap-2">
              {["S", "M", "L", "XL", "XXL"].map(size => (
                <button key={size} className="px-4 py-2 border rounded-full hover:bg-black hover:text-white transition">
                  {size}
                </button>
              ))}
            </div>
          </div> 
          }

          {/* Add to Cart */}
          <ProductConfig item={product} id={id} />

          {/* Accordions */}
          
          <div className="mt-6">
            <Accordion type="single" defaultValue="desc"   collapsible>
              <AccordionItem value="desc">
                <AccordionTrigger className="text-base font-medium">Description & Fit</AccordionTrigger>
                <AccordionContent >
                  <p className="text-sm text-gray-700">{product?.description}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-base font-medium">Shipping</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-sm text-gray-700 list-disc list-inside">
                    <li>Disc: 50%</li>
                    <li>Delivery: 3–5 working days</li>
                    <li>Est. Arrival: 10–12 October 2024</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="mt-20">
        <h2 className="text-xl font-semibold mb-4">Rating & Reviews</h2>
        <div className="flex items-center gap-6">
          <div className="text-5xl font-bold">4.5 <span className="text-xl text-gray-500">/ 5</span></div>
          <div className="text-sm space-y-1">
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="flex items-center gap-2">
                <span>{stars} ★</span>
                <div className="w-40 h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-yellow-400 rounded w-[70%]" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 p-4 bg-white rounded-lg shadow space-y-5 border inset-1">
          {
            Array.from({length:6}).map((_, index)=> <div className="border-l border-black/90 rounded-2xl   pl-2">
          <p className="text-md font-bold flex gap-1 items-center mb-2"><User className='size-6 p-1 bg-white rounded-full'/>user {index+1}</p>
          <p className="text-sm text-gray-600 ml-6">"dedication to sustainability and ethical practices resonates strongly..."</p>
        </div>)
          }
        </div>
      </div>

      {/* Similar Items */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <Similar slug={product?.category || '1'} />
      </div>
    </div>
  )
}

export default Product

// Similar Products
export function Similar({ slug }) {
  console.log(slug)
  const [slugs, setSlug] = useState([])
  console.log(slugs)

  useEffect(() => {
    fetch(`${baseUrl}/search?category=${slug}`)
      .then(res => res.json())
      .then(result => setSlug(result))
  }, [slug])
  console.log(slug)

  return (
    <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
      {slugs && slugs.data?.map((e) => (
        <Carded key={e.id} {...e} />
      ))}
    </div>
  )
}
