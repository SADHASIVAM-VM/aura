import { HeartIcon, ScanHeartIcon, ShoppingBasket, StarIcon, TagIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Carded = (item) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const userIdd = localStorage.getItem("user_id");

  const navi = () => {
    navigate("/product/" + item.id);
    document.location.reload();
  };

  const addToWish = async () => {
    const formdata = { product_id: item.id, user_id: userIdd };
    fetch(`${baseUrl}/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then(() => toast.success("Added to wishlist"))
      .catch(() => toast.error("Error adding to wishlist"));
  };

  return (
    <div
      onClick={navi}
      className="relative hover:rounded-2xl  transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Wishlist Icon */}
      <div
        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-red-100 z-10"
        onClick={(e) => {
          e.stopPropagation();
          addToWish();
        }}
      >
        <ScanHeartIcon className="h-5 w-5 text-[#6047f5]" />
      </div>

      {/* Image */}
      <div className="w-full h-48 bg-radial rounded-2xl from-[#e7e7e7] via-[#e6e7e7] to-[#d9d9d7]   flex items-center justify-center overflow-hidden">
        <img
          src={item.image_url}
          alt={item.name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-5_large.png?v=1530129199";
          }}
          className="w-40 h-40 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="p-2 rounded-2xl bg-white group hover:bg-[#6047f5] hover:text-white mt-2 space-y-2">

        <div className="flex flex-col gap-5 justify-center items-center">
           <h3 className=" font-extrabold text-xl">
          {item.name}
        </h3>

{/* price */}
        <div className=" group group-hover:border-white border-blue-600 border px-3 py-1 rounded-2xl">

          <p className="text-[#6047f5] group-hover:text-white flex items-center gap-2">
            <ShoppingBasket className="text-[#6047f5] size-4 group-hover:text-white"/>
            $ {item.price}</p>
        </div>
        </div>
       

        {/* <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray-900 font-bold text-lg">
              ${Math.round(item.price)}
            </span>
            <span className="text-gray-400 line-through text-xs">
              ${Math.round(item.price * 1.2)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <StarIcon className="w-4 h-4 fill-yellow-400" />
            <span className="text-gray-600">4.{Math.floor(Math.random() * 5)}</span>
          </div>
        </div> */}

        <div className="flex items-center text-xs text-gray-500 gap-1">
          <TagIcon className="w-3 h-3 text-orange-400" />
          <span>{item.category || "General"}</span>
        </div>

      </div>
    </div>
  );
};

export default Carded;
