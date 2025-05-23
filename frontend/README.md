# BuyHere

import React, { useEffect, useState } from 'react'
import b1 from '../assets/curserol/b1.jpg'
import b2 from '../assets/curserol/b2.jpg'
import b3 from '../assets/curserol/b3.jpg'
import { HeartIcon, TagIcon } from 'lucide-react'
import { CurrencyRupeeIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'


// Placeholder image
const placeholder = 'https://via.placeholder.com/300x400.png?text=Product+Image'

// Replace with your API endpoint
const API_URL = 'https://fakestoreapi.com/products'

export default function ProductLandingPage() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setError(true))
  }, [])
  console.log(products)

  return (
    <div className="bg-[#f9f9f9] mt-12 text-gray-800 font-sans">
     

      {/* Hero Section */}
      <HeroCarousel/>

      {/* What does it do section */}
     <CategorySection/>
   
   <ProductsByCategory/>



      {/* About Us */}
      
    </div>
  )
}

// category
export const TempCard = (item) => {
  const navigate= useNavigate()
  return (
    <div
      className="w-full max-w-sm text-black rounded-xl  hover:shadow-xl transition duration-300 cursor-pointer relative group "
    onClick={()=> navigate('/shop')}
    >
      {/* Wishlist Button */}
      <div className="absolute top-5 right-5 flex gap-2 z-10">
    <div className="bg-[#f4f4f3] p-1 rounded-full shadow hover:shadow-md">
                <HeartIcon className="h-6 w-6 hover:fill-red-500 text-red-400" />
              </div>
      </div>

      {/* Image */}
      <div className="p-4">
        <img
          src={item?.image}
          alt={item?.title}
          onError={(e) => {
            e.target.onerror = null
            e.target.src =
              'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-5_large.png?v=1530129199'
          }}
          className="w-full h-56 object-contain bg-white rounded-2xl transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="px-5 pb-5 space-y-2">
        <h5 className="text-lg font-semibold truncate">{item?.title}</h5>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-500 flex items-center gap-1">
              <CurrencyRupeeIcon className="w-5 h-5" />
              {Math.round(item?.price * 80)}
            </span>
            <span className="text-sm text-red-400 line-through">
              ₹{Math.round(item?.price * 80 * 1.2)}
            </span>
          </div>
          <span className="text-xs text-gray-400">★ 4.5 ({Math.floor(Math.random() * 100)}k+)</span>
        </div>

        <div className="flex items-center text-xs text-gray-400 gap-1">
          <TagIcon className="w-4 h-4 text-orange-400" />
          <span>{item?.category}</span>
        </div>
      </div>
    </div>
  )
}


export function ProductsByCategory() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setError(true))
  }, [])

  // Group by category
  const grouped = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {})

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      <h3 className="text-3xl font-bold text-center mb-10">Our Products</h3>

      {error ? (
        <div className="text-red-500 text-center flex justify-center items-center gap-2">
          Error fetching products <GlobeAltIcon className="w-6 h-6 animate-bounce" />
        </div>
      ) : (
        <>
          {Object.keys(grouped).map((category) => (
            <div key={category} className="mb-16">
              <h4 className="text-2xl font-semibold mb-6 text-gray-800">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-2 place-content-center place-items-center md:grid-cols-3 lg:grid-cols-4 gap-8">
                {grouped[category].map((product) => (
                <TempCard {...product}/>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}






// hero
export function HeroCarousel() {
  const banners = [
  {
    id: 11,
    title: "Cinnamon Essential Oil",
    subtitle: "The best natural remedy to refresh your body and relax your mind.",
    image: b1,
    highlight: "Essential Oil",
    color: "text-green-500",
  },
  {
    id: 12,
    title: "Organic Lavender Oil",
    subtitle: "Relax your senses with pure lavender essence for your skin and mood.",
    image: b2,
    highlight: "Lavender Oil",
    color: "text-purple-500",
  },
  {
    id: 13,
    title: "Lemon Zest Elixir",
    subtitle: "Awaken your body with zesty lemon oil, perfect for your mornings.",
    image: b3,
    highlight: "Zest Elixir",
    color: "text-yellow-500",
  },
]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const active = banners[index]

  return (
    <section className="w-full bg-[#f9f9f9] py-10">
      <div className="max-w-7xl mx-auto md:rounded-2xl bg-white overflow-hidden shadow-md transition-all duration-500">
     
          <div className="flex-1 w-full h-72 md:h-[400px] text-center">
            <img
              src={active.image}
              alt={active.title}
              className="w-full h-full  object-cover"
            />
          </div>
     
      </div>
    </section>
  )
}


// category section
export function CategorySection() {
  const categories = [
  { name: 'Electronics', icon: '💻' },
  { name: 'Fashion', icon: '👗' },
  { name: 'Shoes', icon: '👟' },
  { name: 'Beauty', icon: '💄' },
  { name: 'Books', icon: '📚' },
  { name: 'Toys', icon: '🧸' },
  { name: 'Home', icon: '🏠' },
  { name: 'Jewelry', icon: '💍' },
  { name: 'Sports', icon: '⚽' },
  { name: 'Gadgets', icon: '📱' },
]
  return (
    <section className="py-14 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Browse Categories</h2>
      
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((cat) => (
          <div key={cat.name} className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full shadow-md flex items-center justify-center text-3xl hover:bg-yellow-100 transition">
              {cat.icon}
            </div>
            <span className="text-sm font-medium text-gray-700">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}


