import {
    ArrowUpRightFromCircleIcon,
  Heart,
  ShoppingBag,
  Star,
  Tag,
} from "lucide-react";

const categories = [
  {
    title: "👗 Fashion",
    products: [
      {
        id: 1,
        name: "Linen Summer Dress",
        price: 79,
        rating: 4.8,
        category: "Fashion",
        image_url:
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTojmvB6uJ71f_GvLjdUXSOZKcq2X6Pi-clfLJyKi6aAGpdKSsz5MAjoTjHspWiAETg0TTv5XL3zXv2XhxJhxwCer2xKVgxUFypQRlHbf2YNUJy309Ugncw",
      },
      {
        id: 2,
        name: "Classic Denim Jacket",
        price: 109,
        rating: 4.6,
        category: "Fashion",
        image_url:
          "https://freenotecloth.com/cdn/shop/products/untitled-28.jpg?v=1671127725&width=2048",
      },
      {
        id: 3,
        name: "Wool Oversized Coat",
        price: 149,
        rating: 4.9,
        category: "Fashion",
        image_url:
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQoPkM-IZuI4uUpQXVprFppyuCIEwOHd15KaziIlzA-XN6CgROfSHU5I3pjl4FkdIi8bBIWrz-BkTAbcQeQCxUuQDdn8HEc34MiB-cuwxL9aivesa4KetAiRQ",
      },
      {
        id: 4,
        name: "Urban Street Hoodie",
        price: 69,
        rating: 4.5,
        category: "Fashion",
        image_url:
          "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80",
      },
    ],
  },
  {
    title: "💄 Beauty",
    products: [
      {
        id: 5,
        name: "Rose Glow Serum",
        price: 45,
        rating: 4.7,
        category: "Beauty",
        image_url:
          "https://m.media-amazon.com/images/I/51IzQOVxsUL.jpg",
      },
      {
        id: 6,
        name: "Matte Lipstick Set",
        price: 59,
        rating: 4.6,
        category: "Beauty",
        image_url:
          "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR1EIErX7tL7oYRQ_IUeujPAPtjinoElkYFNXMMhBYQALkkSQCAEPmXErJoBGMygnJht5xY1i4ZclCeXOVQiLmlHYCWW0mMgIPmGPSPlDsNw90bWmXavxZp1IA",
      },
      {
        id: 7,
        name: "Natural Face Cream",
        price: 38,
        rating: 4.8,
        category: "Beauty",
        image_url:
          "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS6n-HS6fHnDC5e9tMcPd4m-eLglYyytG4_LJnRcEY63ZzLxreudzczBNBd2H-r2x0bsFQaC80Brpr8Gpq6nw_r7xH0fk_Igo3M66ljJ8pCSmJqBybgvqnvsws",
      },
      {
        id: 8,
        name: "Essential Oil Kit",
        price: 65,
        rating: 4.7,
        category: "Beauty",
        image_url:
          "https://m.media-amazon.com/images/I/51mEaKDw+WL.jpg",
      },
    ],
  },
  {
    title: "📱 Electronics",
    products: [
      {
        id: 9,
        name: "Noise-Cancel Headphones",
        price: 199,
        rating: 4.9,
        category: "Electronics",
        image_url:
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTT88mjqZQcvpZX3ah2eRzmsk3WFlS6-Qz_yxJAUy23kCMygmHTmicwKAcCtb2_xG2s1q-f7l5Cqh-_70R9IxfPUFbv9scymUUvPfII4-uM2E_Bkm8gHNx0NA",
      },
      {
        id: 10,
        name: "Smartwatch Pro X",
        price: 229,
        rating: 4.8,
        category: "Electronics",
        image_url:
          "/watch.jpeg",
      },
      {
        id: 11,
        name: "Wireless Earbuds 2.0",
        price: 129,
        rating: 4.7,
        category: "Electronics",
        image_url:
          "/er1.jpg",
      },
      {
        id: 12,
        name: "UltraHD Mini Projector",
        price: 299,
        rating: 4.6,
        category: "Electronics",
        image_url:
          "https://m.media-amazon.com/images/I/51GTqntMW8L.jpg",
      },
    ],
  },
  {
    title: "👟 Shoes",
    products: [
      {
        id: 13,
        name: "AirFlex Running Shoes",
        price: 129,
        rating: 4.8,
        category: "Shoes",
        image_url:
          "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRzkUh4drY9cNiVwNRkpHT72kmwuXYIpWgU05SKWiG8_QcOyDQaTDqGKO8l1yn3Nr2-h2AHRQjrMbq9oA6aA14IU85xR7X2W2ew8v1lHzCewXwUAVjqXd4BXA",
      },
      {
        id: 14,
        name: "leather Shoes",
        price: 99,
        rating: 4.6,
        category: "Shoes",
        image_url:
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSBx-52ta3T0Udk7PILe7RJa3ElOukj8rJtofsgxcnOgZ5OQ47apxbfa2mVBxg3Z9Ti5_qYGZhfwoPxTC3yf8kq7Z-nWY6c6DgNf7kxS0zAyk_Wz_OB7HI8bQ",
      },
      {
        id: 15,
        name: "SportLite Trainers",
        price: 119,
        rating: 4.7,
        category: "Shoes",
        image_url:
          "https://m.media-amazon.com/images/I/51yfBZvjlcL._UY350_.jpg",
      },
      {
        id: 16,
        name: "Canvas Slip-Ons",
        price: 79,
        rating: 4.5,
        category: "Shoes",
        image_url:
          "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/C51643s.jpg?im=Resize,width=750",
      },
    ],
  },
  {
    title: "🍳 Kitchen",
    products: [
      {
        id: 17,
        name: "Stainless Pan Set",
        price: 149,
        rating: 4.9,
        category: "Kitchen",
        image_url:
          "https://m.media-amazon.com/images/I/71DKw+61VEL.jpg",
      },
      {
        id: 18,
        name: "Glass Storage Jars",
        price: 49,
        rating: 4.7,
        category: "Kitchen",
        image_url:
          "https://m.media-amazon.com/images/I/61OYfGDQ88L._AC_UF894,1000_QL80_.jpg",
      },
      {
        id: 19,
        name: "Chef Knife Pro",
        price: 89,
        rating: 4.8,
        category: "Kitchen",
        image_url:
          "https://media.takealot.com/covers_images/171bf2e470a1494eb985be7f5a12b3b6/s-pdpxl.file",
      },
      {
        id: 20,
        name: "Modern Coffee Maker",
        price: 199,
        rating: 4.9,
        category: "Kitchen",
        image_url:
          "https://images.philips.com/is/image/philipsconsumer/vrs_a6f229ac53eb2ad8dcf9e281050310d76783fec6?$pnglarge$&wid=960",
      },
    ],
  },
];

export default function CategorieSections() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900 p-3 space-y-20">
      {categories.map((cat) => (
        <section key={cat.title} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl lg:text-3xl font-bold">{cat.title}</h2>
            <button className="mt-6 bg-[#e4ff75] text-xs text-black font-semibold rounded-full px-5 py-2 flex items-center gap-2 transition" onClick={()=> navigate('/shop')}>
            view <ArrowUpRightFromCircleIcon className="w-6 h-6 bg-black text-white p-1 rounded-full" />
          </button>
          </div>

          {/* Horizontal Scroll Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 cttc ">
            {cat.products.map((item) => (
              <div
                key={item.id}
                className="min-w-[260px] p-2 bg-gradient-to-b from-white to-slate-50 border border-slate-200 rounded-2xl shadow-sm  transition-all duration-300 overflow-hidden flex-shrink-0"
              >
                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full rounded-2xl  h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow hover:bg-red-100 transition">
                    <Heart fill="red" className="h-4 w-4 text-red-600" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center text-sm text-yellow-500 gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(item.rating) ? "fill-yellow-400" : ""
                        }`}
                      />
                    ))}
                    <span className="text-gray-500 ml-1">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-indigo-600 font-semibold text-lg">
                      ${item.price}
                    </span>
                    <button className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition">
                      <ShoppingBag className="h-4 w-4" />
                      <span className="text-sm font-medium">Buy</span>
                    </button>
                  </div>

                  <div className="flex items-center text-xs text-gray-400 mt-2">
                    <Tag className="h-3 w-3 mr-1 text-indigo-400" />
                    {item.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
