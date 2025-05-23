import { Button } from '@/components/ui/button';
import pp1 from '/pp1.png'
import pp2 from '/pp2.png'
import pp3 from '/pp3.png'
import clsx from 'clsx';
import { Card } from "@/components/ui/card";


import {
  Truck,
  TruckIcon ,
  ShieldCheckIcon ,
  ShieldCheck,
  CreditCardIcon,
  Sparkles,
  SparklesIcon ,
  TrendingUp,
  BadgePercent, 
  SaveAll,
  CheckCircleIcon,
  IndianRupeeIcon
} from "lucide-react"; // or '@heroicons/react/24/outline' for Heroicons

import { CurrencyRupeeIcon } from '@heroicons/react/16/solid'
import { Link } from 'react-router-dom';
const products = [
  {
    title: 'Men Collection',
    image: pp1,
    button: 'View All',
    color: 'from-orange-100 to-orange-200',
  },
  {
    title: 'Women Collection',
    image: pp2,
    button: 'View All',
    color: 'from-green-100 to-green-200',
  },
  {
    title: 'Top Collection',
    image: pp3,
    tags: ['Clothes', 'Shorts', 'Bags'],
    color: 'from-yellow-100 to-yellow-200',
  },
];

const topSellingItems = [
  {
    id: 1,
    title: "AE. Hoodie",
    image: pp1,
    trending: true,
    highlight: true,
  },
  {
    id: 2,
    title: "JPN T-Shirt",
    image: pp2,
    trending: true,
    highlight: false,
  },
  {
    id: 3,
    title: "Tactical Pant",
    image: pp3,
    trending: false,
    highlight: false,
  },
];


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white text-gray-900 mt-20 p-2 space-y-6">

      {/* Hero + Top Selling Section */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Hero */}
        <div className=" lg:col-span-2 bg-gradient-to-r from-[#f7e8d3] via-[#f9d3d3] to-[#ffd4f3] rounded-2xl p-3 flex flex-col md:flex-row items-center justify-between">
          <div className="order-2 md:order-1 px-5">
            <p  className="text-3xl logo text-black/50 ">
              aura<span className=" text-red-400 text-6xl">.</span>
            </p>
            <h1 className="text-6xl font-bold head ">Get Up to 50% Off</h1>
            <Button className="mt-4 w-62 p-5 bg-black text-white " onClick={()=> navigate('/shop')}>get more</Button>
          </div>
          <img src={'/hh.png'} alt="hero" className="w-full md:w-72 rounded-lg order-1" />
        </div>

        {/* Top Selling */}
        <div className="w-full">
          <TopSellingSection />
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className={clsx(
              "rounded-2xl overflow-hidden shadow hover:shadow-md transition relative w-full h-52 p-4 text-white",
              `bg-gradient-to-br ${product.color}`
            )}
          >
            <div className="absolute top-0 right-0 w-32 h-full bg-white opacity-10 rounded-l-full pointer-events-none" />
            <div className="  h-full justify-between  z-10 relative">
              <div className=''>
                <h3 className="text-4xl text-black/50 hover:text-black head font-bold">{product.title}</h3>
                {
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-white text-gray-700 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                 }
                 <Button className=" mt-3">Sell All</Button>
              </div>

              <div className="flex  w-full h-full">
                <img src={product.image} alt={product.title} className="w-72 absolute top-0 object-contain -right-10" />
                
              </div>
            </div>
          </div>
        ))}
      </div>

<ProductSpotlight/>

      <FeaturesSection/>

<BrandPartnerSection/>

<AboutSection/>





    </div>
  );
}

export function TopSellingSection() {
  return (
    <div className="bg-white rounded-2xl w-full p-4">
      <h2 className="text-3xl font-bold mb-4 head">Top Selling Products</h2>
      <ul className="space-y-3">
        {topSellingItems.map((item, index) => (
          <li
            key={item.id}
            className={`flex items-center gap-4 p-3  ${
              item.highlight
                ? "bg-gradient-to-r from-[#f2f7d3] via-[#f9e7d3] to-white rounded-2xl"
                :'white border-t'
            } transition`}
          >
            <div className="w-14 h-14 overflow-hidden rounded-md bg-white">
              <img
                src={item.image}
                alt={item.title}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex-1 text-sm font-semibold">{item.title}</div>

            {item.trending && (
              <div className="text-black/70 flex items-center flex-col">
                <TrendingUp className="w-5 h-5 " />
                <p className='text-[10px] '>{125-index}k+</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

//feature
export const FeaturesSection = () => {
  const features = [
    {
      icon: <TruckIcon className="w-8 h-8 text-indigo-600" />,
      title: "Fast Delivery",
      description: "Quick and reliable delivery to your doorstep within 2-3 business days.",
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-green-600" />,
      title: "Secure Shopping",
      description: "We use top-grade encryption and fraud protection to keep your data safe.",
    },
    {
      icon: <CreditCardIcon className="w-8 h-8 text-yellow-500" />,
      title: "Easy Payments",
      description: "Multiple payment options including UPI, Net Banking, and Credit/Debit Cards.",
    },
    {
      icon: <SparklesIcon className="w-8 h-8 text-pink-500" />,
      title: "Premium Quality",
      description: "Each product is handpicked to ensure maximum satisfaction and durability.",
    },
  ];

  return (

<section className="bg-gradient-to-b from-black via-70% to-transpraent py-20 px-6 rounded-2xl">
  <div className="max-w-7xl mx-auto space-y-20">
    {/* First Block: 60% Text | 40% Features */}
    <div className="flex flex-col lg:flex-row items-center gap-10">
      
      {/* Left Text Block (60%) */}
      <div className="w-full lg:w-3/5 text-left space-y-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white">What Makes Us Special</h2>
        <p className="text-[18px] md:text-xl lg:text-2xl text-gray-200">
          A shopping experience built on trust, speed, and premium quality—because you deserve the best.
        </p>
      </div>

      {/* Right Features Block (40%) */}
      <div className="w-full lg:w-2/5 grid  gap-3">
        {features.slice(0, 2).map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-green-100 to-green-200 p-6 rounded-2xl border  hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50 text-indigo-600">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Second Block: 40% Features | 60% Text */}
    <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
      
      {/* Right Text Block (60%) */}
      <div className="w-full lg:w-3/5 text-left space-y-6">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900">Designed for You</h2>
        <p className="text-[18px] md:text-xl lg:text-2xl text-gray-600">
          From fast delivery to curated collections, everything is tailored to your convenience and style.
        </p>
      </div>

      {/* Left Features Block (40%) */}
      <div className="w-full lg:w-2/5 grid gap-3">
        {features.slice(2, 4).map((feature, index) => (
          <div
            key={index}
            className="bg-indigo-50 p-6 rounded-2xl  border border-gray-100 hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-emerald-50 text-emerald-600">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>




 

  );
};

export const ProductSpotlight = () => {
  return (
    <>
    
   <div className="flex flex-col-reverse gap-3 lg:flex-row w-full rounded-xl overflow-hidden mb-12">
  {/* Left - 40% */}
  <div className="w-full lg:w-2/5 flex items-center justify-center">
    <img src="/hh.png" alt="Apple Headset" className="w-72 h-72 object-cover rounded-2xl" />
  </div>

  {/* Right - 60% */}
  <div className="w-full lg:w-3/5 p-4 lg:p-10 space-y-3 md:space-y-6 flex flex-col justify-center bg-gradient-to-b lg:bg-gradient-to-r from-yellow-50 via-yellow-50 to-white rounded-xl">
    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">Apple AirPods Pro (2nd Gen)</h2>
    <p className="text-[16px] md:text-2xl lg:text-2xl xl:text-3xl text-gray-700">Experience immersive sound with Active Noise Cancellation, Adaptive Transparency, and a customizable fit.</p>
    <p className="text-[12px] md:text-[14px] text-black bg-gradient-to-r from-yellow-200 via-yellow-100 to-transparent  font-semibold rounded-full px-3 py-1 inline-flex items-center gap-2">🔥 Limited Time Offer - 20% OFF</p>
    <div className="flex items-center gap-2 text-2xl font-bold">
            <p className="text-2xl  text-gray-900 flex items-center gap-1 sub_head font-bold"><CurrencyRupeeIcon className='size-8 text-green-400'/> 22,499</p>
<div className="flex items-center flex-col -space-y-2">
        <p className="text-red-400 text-xs font-medium line-through  ">₹27,999</p>
      <p className="text-green-400 rounded-xl p-1 text-sm font-black">₹5,500</p>
</div>
    </div>
  </div>
</div>

<section className="w-full">
  {/* First Section: 60% Left / 40% Right */}
  <div className="flex flex-col lg:flex-row w-full bg-gradient-to-b md:bg-gradient-to-r from-rose-100 to via-white to-white  rounded-xl overflow-hidden mb-12">
    {/* Left - 60% */}
   <div className="w-full lg:w-3/5 p-4 lg:p-10 space-y-3 md:space-y-6 flex flex-col justify-center bg-gradient-to-b lg:bg-gradient-to-r from-red-50 via-red-50 to-white rounded-xl">
  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">Apple Vision Pro</h2>
  <p className="text-[16px] md:text-2xl lg:text-2xl xl:text-3xl text-gray-700">Experience spatial computing like never before with the most immersive headset ever created.</p>
  <p className="text-[12px] md:text-[14px] text-black bg-gradient-to-r from-red-200 via-red-100 to-transparent font-semibold rounded-full px-3 py-1 inline-flex items-center gap-2">🎯 ₹25,000 Off on Pre-booking</p>
  <div className="flex items-center gap-2 text-2xl font-bold">
    <p className="text-2xl text-gray-900 flex items-center gap-1 sub_head font-bold">
      <CurrencyRupeeIcon className="size-8 text-green-400" /> 2,99,999
    </p>
  </div>
</div>


    {/* Right - 40% */}
    <div className="w-full lg:w-2/5 bg-white flex items-center justify-center">
      <img src="/visionpro.png" alt="Apple Headset" className="w-full h-auto object-fill" />
    </div>
  </div>

  {/* Second Section: 40% Left / 60% Right */}
  <div className="flex flex-col-reverse gap-3 lg:flex-row w-full  rounded-xl overflow-hidden mb-12">
    {/* Left - 40% */}
    <div className="w-full lg:w-2/5 bg-white flex items-center justify-center">
      <img src="/m2.jpg" alt="Apple Side View" className="w-full h-auto object-cover  rounded-xl" />
    </div>

    {/* Right - 60% */}
    <div className="w-full lg:w-3/5 p-4 lg:p-10 space-y-3 md:space-y-6 flex flex-col justify-center bg-gradient-to-b lg:bg-gradient-to-r from-indigo-100 via-indigo-100 to-white rounded-xl">
  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">Unmatched Performance</h2>
  <p className="text-[16px] md:text-2xl lg:text-2xl xl:text-3xl text-gray-700">Powerful M2 chip, ultra-clear displays, and seamless integration with your digital life.</p>
  <p className="text-[12px] md:text-[14px] text-black bg-gradient-to-r from-blue-200 via-blue-100 to-transparent font-semibold rounded-full px-3 py-1 inline-flex items-center gap-2">💳 Save 10% with HDFC Bank Cards</p>
  <div className="flex items-center gap-2 text-2xl font-bold">
    <p className="text-2xl text-gray-900 flex items-center gap-1 sub_head font-bold">
      <CurrencyRupeeIcon className="size-8 text-green-400" /> 2,75,999
    </p>
  </div>
</div>


  </div>
</section>
</>

  );
};

// about section

export function AboutSection(){

  return(
    <section className="w-full bg-white py-20 px-3 md:px-16">
  <div className=" mx-auto flex flex-col  items-center gap-6">
    
 
    <div className="flex gap-2 items-center">
      <p className='text-4xl text-black/50 sub_head mt-2 text-center'>about</p>
     <Link to="/" className="text-6xl logo text-black ">
              aura<span className=" text-red-400 text-6xl">.</span>
            </Link>
    </div>

    {/* Right - Text */}
    <div className="space-y-3">

      <p className="text-[16px] md:text-xl lg:text-2xl text-gray-700 ">
        Aura is not just an e-commerce platform — it's a lifestyle destination. We bring together the latest in technology, fashion, and design to create a seamless shopping experience for the modern consumer.
      </p>
      <p className="text-[16px] md:text-xl lg:text-2xl text-gray-700">
        Founded with a passion for quality and innovation, Aura is dedicated to curating high-end products with unmatched service. From handpicked collections to lightning-fast delivery, every detail is designed with you in mind.
      </p>
      <p className="text-[16px] md:text-xl lg:text-2xl text-gray-700">
        Join our growing community of trendsetters and discover how Aura is redefining online shopping — one elegant click at a time.
      </p>
      


    </div>
  </div>
</section>

  )
}

// partners
export  function BrandPartnerSection() {
  const brands = [
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Flipkart", logo: "https://cdn.iconscout.com/icon/free/png-256/free-flipkart-logo-icon-download-in-svg-png-gif-file-formats--online-shopping-brand-logos-pack-icons-226594.png?f=webp" },
  { name: "Meesho", logo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Meesho_Logo_Full.png" },
  { name: "Snapdeal", logo: "https://brandlogos.net/wp-content/uploads/2017/01/snapdeal-logo-preview-300x300.png" },
  { name: "Myntra", logo: "https://1000logos.net/wp-content/uploads/2022/08/Myntra-Logo.png" },
  { name: "Ajio", logo: "https://1000logos.net/wp-content/uploads/2020/07/Ajio-Logo1.jpg" },
  { name: "TataCliq", logo: "https://1000logos.net/wp-content/uploads/2021/05/Tata-Cliq-logo.png" },
  { name: "ShopClues", logo: "https://images.seeklogo.com/logo-png/28/1/shopclues-logo-png_seeklogo-282030.png" },
  { name: "Nykaa", logo: "https://seeklogo.com/images/N/nykaa-logo-AA06314FB9-seeklogo.com.png" },
  { name: "Reliance Digital", logo: "https://1000logos.net/wp-content/uploads/2021/08/Reliance-Industries-Limited-RIL-Logo-1966.png" },
];
  return (
    <section className="pt-10 ">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center text-black/50 mb-6 ">Our Brand <span className='logo text-4xl text-black'>Partners</span></h2>

        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide ">
          <div className="inline-flex gap-4 px-2">
            {brands.map((brand, index) => (
              <Card
                key={index}
                className="flex-shrink-0 w-40 h-24 flex items-center group justify-center p-4 hover:shadow-md transition-all bg-white"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-16 object-contain grayscale group-hover:grayscale-0 group-hover:-translate-y-3 z-10 transition duration-300"
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
