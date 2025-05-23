import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


 const baseUrl = import.meta.env.VITE_BASE_URL
export default function Wishlist() {
 const navigate = useNavigate()
  // Sample product or empty array
  const [wishlist, setWishlist] = useState()
  const user_id = localStorage.getItem('user_id')
useEffect(()=>{

  fetch(baseUrl+'/wishlist?user_id='+user_id)
  .then((re)=> re.json())
  .then(e=> setWishlist(e.data))
},[])

console.log(wishlist)
  const handleRemove = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
   fetch(`http://localhost:3000/wishlist/delete?user_id=${user_id}&del_id=${id}`,{
    method:'DELETE'
   })
  .then((re)=> re.json())
  .then(e=> toast.success('item removed'))
  .catch(e=> toast.error('unable to remove'))
  }

   const navi = (id) => {
    navigate("/product/" + id)
    document.location.reload()
    document.addEventListener('scroll', scroll(0, 0))
  }

  return (
    <div className=" mt-12 mx-auto p-6">
      <h2 className="text-2xl sub_head text-black/70 text-left font-semibold mb-4"><span className="text-3xl  text-black">My Wishlists</span> </h2>

      {wishlist?.length == 0 ? (
        <div className="text-center  p-6 rounded-md">
         <Empty o={'Wishlist'}/>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlist&&wishlist.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <img
                  src={item.product?.image_url}
                  alt={item.title}
                  className="rounded-md w-full h-40 object-contain "
                />
                <p>{item.product?.name.length >15 ? item.product?.name.slice(0,15)+'....': item.product?.name}</p>
                <p className=" font-medium text-lg head">₹{item.product?.price}</p>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={()=>navi(item.product?.id)}>View</Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </div>
  )
}

export function Empty ({o}){
   const navigate = useNavigate()
  return(
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 space-y-6">
  {/* Heartbreak SVG */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-24 h-24 text-red-400 animate-pulse"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 3.75c-1.886 0-3.25 1.21-4.5 3-1.25-1.79-2.614-3-4.5-3C5.114 3.75 3 5.671 3 8.25c0 2.157 1.78 4.132 4.41 6.321 1.068.912 2.236 1.844 3.41 2.744a60.26 60.26 0 0 0 1.68 1.19c.16-.104.488-.32.94-.633a48.357 48.357 0 0 0 3.471-2.719C19.22 12.382 21 10.407 21 8.25c0-2.579-2.114-4.5-4.5-4.5Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8l-2 4 3 1.5-2 3"
    />
  </svg>

  {/* Title */}
  <h2 className="text-4xl font-bold text-gray-800">Your {o} is Empty</h2>

  {/* Description (optional) */}
  <p className="text-gray-600 text-lg">Looks like you haven't added any favorites yet.</p>

  {/* Button */}
  <Button onClick={()=> navigate('/shop')} className='hover:-translate-y-1 bg-gradient-to-br from-btn via-orange-400 to-yellow-200'>Add a {o} Item</Button>
</div>

  )
}