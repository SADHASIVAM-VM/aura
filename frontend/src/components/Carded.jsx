import { CurrencyRupeeIcon, TagIcon } from '@heroicons/react/16/solid'
import { TooltipProvider } from './ui/tooltip'
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import { HeartIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Carded = (item) => {
    const baseUrl = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate()

  const navi = () => {
    navigate("/product/" + item.id)
    document.location.reload()
    document.addEventListener('scroll', scroll(0, 0))
  }
// add to wishlist
const userIdd = localStorage.getItem('user_id')
const addTowish = async (item)=>{
  const formdata={}
  formdata.product_id = item.id
  formdata.user_id = userIdd

  fetch(baseUrl+'/wishlist', {
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify(formdata)
}).then((res)=> res.json())
.then(re=> toast.success('added to wishlist'))
.catch(err=> toast.error('error ?'))
}


  return (
    <div
     
      className="w-full max-w-sm text-white rounded-xl border  hover:shadow-sm transition duration-300 cursor-pointer relative group"
    >
      {/* Wishlist / Cart Buttons */}
      <div className="absolute top-5 right-5 flex gap-2 z-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-[#f4f4f3] p-1 rounded-full shadow hover:shadow-md">
                <HeartIcon className="h-6 w-6 hover:fill-red-500 text-red-400 " onClick={()=>addTowish(item)} />
              </div>
            </TooltipTrigger>
            <TooltipContent><p className='bg-black text-xs p-2' >Wishlist</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      
      </div>

      {/* Image */}
      <div className="p-4 "  onClick={navi}>

        <img
          src={item.image_url}
          alt={item.name}
          loading='lazy'
            onError={(e) => {
    e.target.onerror = null // Prevents infinite loop if placeholder also fails
    e.target.src = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-5_large.png?v=1530129199' // Replace with your placeholder path
  }}
          className="w-full h-56 object-contain bg-white rounded-2xl transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="px-5 pb-5 space-y-2">
        <h5 className="text-lg text-black font-semibold truncate">{item.name.length >15 ? item.name.slice(0,30)+'....': item.name
                }</h5>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-500 flex items-center gap-1">
              <CurrencyRupeeIcon className="w-5 h-5" />
              {Math.round(item.price)}
            </span>
            <span className="text-sm text-red-400 line-through">
              ₹{Math.round(item.price * 1.2)}
            </span>
          </div>
          <span className="text-xs text-black/70">★ 4.5 ({Math.round(Math.random()*100)+'k+'})</span>
        </div>

        <div className="flex items-center text-xs text-black/70 gap-1">
          <TagIcon className="w-4 h-4 text-orange-400" />
          <span>{item.category}</span>
        </div>
      </div>
    </div>
  )
}

export default Carded
