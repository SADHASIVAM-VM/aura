import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image:
      "https://i.ytimg.com/vi/_-AS5DtDeqs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCQWL5rM0qjqW93zHGyprrudzcxOw",
    title: "Elevate Your Everyday Fashion",
    subtitle: "New arrivals designed to make a statement.",
    buttonText: "Shop Now",
    color: "bg-pink-600",
  },
  {
    id: 2,
    image:
      "vr.jpeg",
    title: "Modern Gadgets, Sleek Design",
    subtitle: "Upgrade your tech game with premium electronics.",
    buttonText: "Shop Now",
    color: "bg-indigo-600",
  },
  {
    id: 3,
    image:
      "/hrbg1.jpg",
    title: "Style Starts from Your Feet",
    subtitle: "Discover the latest trends in comfort & fashion.",
    buttonText: "Shop Now",
    color: "bg-orange-500",
  },
];

export default function BannerSlideshow() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[300px] lg:h-[400px] overflow-hidden rounded-3xl shadow-md">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-6 md:px-12">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-sm md:text-lg mb-6 opacity-90">
                {slide.subtitle}
              </p>
              <button
                className={`${slide.color} text-xs hover:brightness-110 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transition`}
              >
                {slide.buttonText} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
