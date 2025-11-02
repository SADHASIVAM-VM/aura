import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Carded from "../components/Carded";
import { useDebounce } from "../config/useDebouncing";

const brands = ["Adidas", "Columbia", "Demix", "New Balance", "Nike", "Xiaomi", "Asics"];
const categories = ["All Categories", "Deals", "Crypto", "Fashion", "Health & Wellness", "Art"];
const baseUrl = import.meta.env.VITE_BASE_URL;

export default function ModernFilterPage() {
  const [price, setPrice] = useState([300]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [AllItem, setAllItem] = useState();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 800);
  const token = localStorage.getItem("token");

  const handleToggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };



  const handleClear = () => {
    setSelectedBrands([]);
    setPrice([300]);
    setQuery("");
  };

  useEffect(() => {
    const fetchItems = async () => {
      const endpoint = query
        ? `${baseUrl}/search?search=${query}`
        : `${baseUrl}/products`;

      try {
        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        setAllItem(json);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [debouncedQuery]);

  return (
    <div className="min-h-screen w-full bg-[#eff1f5] p-8 mt-14">
        {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm  ${
                  cat === ""
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
    
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className=" flex flex-col lg:w-1/4 space-y-4">
          {/* Price Range */}
          <div className="bg-white  p-6 w-full rounded-xl">
            <h2 className="text-gray-800 font-semibold mb-3">Price Range</h2>
            <p className="text-sm text-gray-500 mb-2">
              The average price is ${price[0]}
            </p>
            <Slider
              value={price}
              onValueChange={setPrice}
              min={20}
              max={1130}
              step={10}
            />
            <div className="flex justify-between text-sm mt-2 text-gray-500">
              <span>${20}</span>
              <span>${1130}</span>
            </div>
          </div>

          {/* Star Rating */}
          <div className="bg-white  p-6 w-full rounded-xl">
            <h2 className="text-gray-800 font-semibold mb-3">Star Rating</h2>
            <div className="flex items-center gap-2 text-yellow-400 text-lg">
              ★★★★☆ <span className="text-gray-500 text-sm">4 Stars & up</span>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="bg-white  p-6 w-full rounded-xl">
            <h2 className="text-gray-800 font-semibold mb-3">Brand</h2>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleToggleBrand(brand)}
                    id={brand}
                  />
                  <label htmlFor={brand} className="text-gray-700">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-white  p-6 w-full rounded-xl">
            <h2 className="text-gray-800 font-semibold mb-3">
              Delivery Options
            </h2>
            <div className="flex gap-3">
              <Button variant="outline" className="border-gray-300 text-gray-700">
                Standard
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Pick Up
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleClear} variant="outline" className="flex-1 border-gray-300">
              Reset
            </Button>
            <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
              Apply
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-3/4">
        

          {/* Product Grid */}
        

          {AllItem? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {AllItem&&AllItem ?.data?.length > 0 ? (
                AllItem.data.map((item) => <Carded key={item.id} {...item} />)
              ) : (
                <p className="text-black text-center col-span-full">
                  No results found for "{query}"
                </p>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center h-96 text-black">
              Loading...
            </div>
          )}
        </main>
      </div>


    </div>
  );
}
