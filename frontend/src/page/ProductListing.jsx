import { useEffect, useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
 
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import Carded from "../components/Carded"
import { useDebounce } from "../config/useDebouncing"

const brands = ["Nike", "Adidas", "Puma", "Reebok"]
const categories = ["Shoes", "T-Shirts", "Jeans", "Accessories"]
const ratings = ["4★ & above", "3★ & above", "2★ & above"]
 const baseUrl = import.meta.env.VITE_BASE_URL
export default function FilterSidebar() {
  const [price, setPrice] = useState([500])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedRatings, setSelectedRatings] = useState([])
  const [AllItem, setAllItem] = useState()
  const [query, setQuery] = useState('')
   const debouncedQuery = useDebounce(query, 1000); // 500ms delay

  const handleToggle = (item, selectedItems, setSelectedItems) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    )
  }
const token = localStorage.getItem('token')
  const handleClearAll = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setSelectedRatings([])
    setPrice([500])
  }
  useEffect(()=>{
    const fetching = ()=>{
      const endpoint = query
        ? `${baseUrl}/search?search=${query}`
        : `${baseUrl}/products`;

      try{
        fetch(endpoint,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
      .then(res=>res.json())
      .then(json=>setAllItem(json))
      .catch(()=>setError(true))
  
      }
      catch(err){
        console.log(err)
      }
    }
    fetching()
    },[debouncedQuery])

  return (
    <div className="flex my-14 flex-col lg:flex-row gap-5">
 <aside className="z-20 lg:w-1/5 w-full max-h-screen sticky top-0  text-black bg-white border-b-2 rounded-md px-4 space-y-6">
    
      <Accordion type="multiple"   className="w-full space-y-2">
       <AccordionItem value="filter">
        <AccordionTrigger className="text-lg font-semibold mb-2">Filter</AccordionTrigger>
        <AccordionContent className="space-y-3 text-white bg-black  rounded-xl p-5">
        <div className=" ">
        <label className="my-2">Search</label>
        <input type="search" onChange={(e)=> setQuery(e.target.value)}  className="p-2 w-full border border-white/50 rounded-xl"/>
      </div>
             {/* Category */}
        <h1 className=" text-btn ">Category</h1>
            {categories.map((item) => (
              <div key={item} className="flex items-center gap-2 mb-2">
                <Checkbox
                  id={`category-${item}`}
                  checked={selectedCategories.includes(item)}
                  onCheckedChange={() =>
                    handleToggle(item, selectedCategories, setSelectedCategories)
                  }
                />
                <label htmlFor={`category-${item}`} className="text-sm">
                  {item}
                </label>
              </div>
            ))}

        {/* Brand */}
       
          <h1 className=" text-btn ">Brand</h1>
   
            {brands.map((brand) => (
              <div key={brand} className="flex items-center gap-2 mb-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() =>
                    handleToggle(brand, selectedBrands, setSelectedBrands)
                  }
                />
                <label htmlFor={`brand-${brand}`} className="text-sm">
                  {brand}
                </label>
              </div>
            ))}
    

        {/* Price */}
      
          <h1 className=" text-btn ">Price</h1>
            <label className="block mb-1 text-sm">Up to ₹{price[0]}</label>
            <Slider
              value={price}
              onValueChange={setPrice}
              min={0}
              max={5000}
              step={100}
            />
     

        {/* Ratings */}
        
          <h1 className=" text-btn ">Customer Ratings</h1>
            {ratings.map((rate) => (
              <div key={rate} className="flex items-center gap-2 mb-2">
                <Checkbox
                  id={`rating-${rate}`}
                  checked={selectedRatings.includes(rate)}
                  onCheckedChange={() =>
                    handleToggle(rate, selectedRatings, setSelectedRatings)
                  }
                />
                <label htmlFor={`rating-${rate}`} className="text-sm">
                  {rate}
                </label>
              </div>
            ))}
        

      {/* Buttons */}
      <div className="flex gap-2 pt-2">
        <Button variant="outline" onClick={handleClearAll} className="flex-1 text-black">
          Clear All
        </Button>
        <Button className="flex-1 bg-btn">Apply</Button>
      </div>
      </AccordionContent>
       </AccordionItem>
          
      </Accordion>
    </aside>

    <div className=" lg:w-4/5 w-full">
            <h1 className="text-black p-5 text-xl font-bold">Total Itmes : {AllItem&&AllItem.data.length}</h1>
        <div className="flex justify-center  ">
            {
              AllItem&&AllItem ?
                ( <div className="grid  grid-cols-2 md:grid-cols-3  place-content-center place-items-center gap-5 xl:grid-cols-4">
                    {
                     AllItem&&AllItem?.data?.length > 0 ? AllItem?.data.map((e)=> <Carded {...e}/>):
                     (
                      <p className="text-2xl sub_head text-black/50 w-full text-center flex justify-center min-h-96">No... Search Result : <span className="text-black ml-2"> '{ query}'</span></p>
                     )
                    }
                </div>
                )
               : (<div className="w-full h-[600px] flex-1 flex items-center place-content-center text-white justify-center">
               <div className="loader">
   
               </div>
    </div>)}
        </div>

     
    </div>
    </div>
   
  )
}
