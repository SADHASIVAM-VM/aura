import React from "react";
import { ArrowRight, Heart, ShoppingBag, Circle, ArrowUpRightFromCircleIcon, ScanEyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CategorySections from "../components/CategorySection";
import BannerSlideshow from "../components/BannerSection";


export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen mt-14 w-full space-y-8 md:space-y-16  p-3 lg:p-10 font-sans">

  {/* Main Grid (2 sections) */}
  <main className="grid h-full  lg:grid-cols-3 gap-6">

    {/* LEFT GRID */}
    <div className="lg:col-span-2 grid lg:grid-rows-[2fr_1fr] gap-5">

      {/* Top (Hero 70%) */}
      <section className="bg-[url('/hrbg.jpeg')] bg-no-repeat bg-cover rounded-3xl p-10 relative overflow-hidden flex flex-col justify-between">
        <div>
          <p className="uppercase text-white  mb-2 bg-white/20 inline text-xs rounded-2xl px-2 py-1">🎵 Music is Classic</p>
          <h1 className="text-4xl lg:text-7xl font-extrabold leading-tight text-white">
            Sequoia Inspiring <br /> Musico.
          </h1>
          <p className="text-white mt-4 text-sm">
            Clear Sounds — Making your dream music come true <br />
            stay with Sequoia Sounds!
          </p>
          <button className="mt-6 bg-[#e4ff75] text-xs text-black font-semibold rounded-full px-5 py-2 flex items-center gap-2 transition" onClick={()=> navigate('/shop')}>
            Shop Now <ArrowUpRightFromCircleIcon className="w-6 h-6 bg-black text-white p-1 rounded-full" />
          </button>
        </div>
      </section>

      {/* Bottom (Cards 30%) */}
      <section className="grid  lg:grid-cols-[2fr_1fr_2fr] gap-6">
        <div className="bg-violet-100 flex-col rounded-3xl p-5 flex justify-between  gap-6 shadow">
          <div className="flex  justify-between">
           <div className="">
             <h3 className="font-semibold text-gray-900 text-xl">More Products</h3>
            <p className="text-gray-500 text-sm">10M+ items</p>
            
           </div>
            <div className="">
               <button className=" bg-white rounded-full p-1" onClick={()=> navigate('/shop')}>
        <ArrowUpRightFromCircleIcon className="size-5 text-black/60"/>
        </button>
            </div>
          </div>
         <div className="flex flex-row  items-center justify-evenly">
           <img
            src="/iphone.jpeg"
            alt="products"
            className="w-16 h-16 object-cover rounded-2xl"
          />
           <img
            src="/watch.jpeg"
            alt="products"
            className="w-16 h-24 object-cover rounded-2xl"
          />
           <img
            src="/d1.jpeg"
            alt="products"
            className="w-16 h-24 object-cover rounded-2xl"
          />
           <img
            src="/d2.jpeg"
            alt="products"
            className="w-16 h-16 object-cover rounded-2xl"
          />
         </div>
        </div>

        <div className="bg-blue-900 rounded-3xl p-5 flex flex-col items-center justify-center text-center shadow">
         <div className="bg-radial from-black/80 to-red-700  rounded-full p-4">
           <h3 className="text-4xl font-extrabold text-white">5M+</h3>
          <p className="text-gray-300 text-sm">purchased</p>
         </div>
          <p className="text-yellow-100 mt-1 text-sm font-semibold flex gap-2 items-center"><ScanEyeIcon className="size-4 text-white"/> 46M+ visits</p>
        </div>

        <div className="bg-[url('/game.jpeg')] bg-no-repeat w-full h-52 md:h-full  bg-cover rounded-3xl p-2 pl-3 flex items-center justify-between shadow">
          <div>
            <h3 className="text-gray-900 font-semibold text-xl">Ready To Toar !</h3>
            <p className="text-gray-500 text-sm">Get yours today!</p>
          </div>
         
        </div>
      </section>
    </div>

    {/* RIGHT GRID */}
    <aside className="lg:col-span-1 grid lg:grid-rows-[1fr_2fr] gap-6">

      <div className="bg-orange-50 rounded-3xl p-6">
        
         <div className="flex justify-between items-center">
           <h3 className="text-lg font-semibold mb-3">Jewellery</h3>
           <button className=" bg-white rounded-full p-1" onClick={()=> navigate('/shop')}>
        <ArrowUpRightFromCircleIcon className="size-5 text-black/60"/>
        </button>
            </div>
        <div className="flex gap-3">
          <img src="/gold.jpeg" className="w-full h-32 object-cover rounded-2xl" alt="" />
        </div>
      </div>

      {/* <div className="bg-white rounded-3xl p-4 overflow-hidden flex flex-col">
        <div className="relative w-full h-36 rounded-2xl overflow-hidden">
          <img
            src="https://cdn.pixabay.com/photo/2020/06/16/12/58/earphones-5304274_1280.jpg"
            alt="earbuds"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        <div className="p-3">
          <h4 className="text-base font-semibold text-gray-900">New Gen X-Bud</h4>
          <p className="text-sm text-gray-500">Immersive wireless audio</p>
        </div>
      </div> */}

      <div className="bg-gray-100 rounded-3xl p-4 overflow-hidden flex flex-col">
        <div className="relative w-full h-[40vh] rounded-2xl overflow-hidden">
          <img
            src="/amz.jpeg"
            alt="vr headset"
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        <div className="p-3">
          <h4 className="text-base font-semibold text-gray-900">Light Grey Surface Headphone</h4>
          <p className="text-sm text-gray-500">Boosted with bass</p>
        </div>

        <button className="bg-[#e4ff75] p-3 text-xs rounded-2xl w-44 flex gap-2 items-center justify-center">
          view products <ArrowUpRightFromCircleIcon className="size-6 text-black bg-white rounded-full p-1"/>
        </button>
      </div>

    </aside>

  </main>

<BannerSlideshow/>
  <CategorySections/>
</div>

  );
}
