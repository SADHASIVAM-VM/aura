import React, { useState } from "react";
import {
  HeartIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  RectangleStackIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dot } from "lucide-react";
import{ UseMyContext } from '../config/MyContext'

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {cart, setcurrentAdminMenu} = UseMyContext()
  const isUser = localStorage.getItem("user_id");
  const admin_url = useLocation().pathname
  //console.log(admin_url)

  const handleClick = () => {
    if (isUser) {
      logout();
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  function logout() {
    toast.warn("Logged out successfully", { autoClose: 2000 });
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    return <Navigate to={"/login"} />;
  }

  const menuItems = [
    { label: "Shop", icon: RectangleStackIcon, path: "/shop" },
    { label: "My Order", icon: ShoppingBagIcon, path: "/myorder" },
    { label: "About", icon: RectangleStackIcon, path: "/" },
  ];

  const adminMenuItems =[
    {label:'Dashboard', path:'dashboard'},
    {label:'Product', path:'product'},
    {label:'Orders', path:'orders'},
    {label:'Customers', path:'customers'}
  ]

  return (
    <header className="backdrop-blur-md fixed top-0 left-0 w-full z-50 bg-white/70  border-gray-800">
      {
        !admin_url.includes('admin') ?
        (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="">
            <Link to="/" className="text-3xl logo text-black">
              aura<span className=" text-red-400 text-4xl">.</span>
            </Link>
          </div>

          {/* Menu - Desktop */}
          <nav className="hidden md:flex gap-8 ">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="group text-black transition relative z-30"
              >
                <span>{item.label}</span>
                <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-indigo-500 transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex justify-center items-center gap-4">
            <button
              title="Wishlist"
              className="text-gray-300 hover:text-red-500 transition"
             onClick={() => navigate("/wishlist")}>
              <HeartIcon fill="red" color="red" className="w-6 h-6" />
            </button>

            <button
              title="Cart"
              className="text-gray-300 hover:text-indigo-500 transition relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartIcon className="w-6 h-6 text-black" />
              {cart?.length > 0 && <Dot className="size-14 text-orange-400 absolute -top-6 -left-2"/>}
            </button>

            <button
              onClick={handleClick}
              className="hidden md:flex items-center gap-2 px-3 py-1 text-sm font-medium  hover:bg-[#f3f3f3]  rounded-full transition"
            >
              <UserCircleIcon className="w-6 h-6" />
              {isUser ? "Logout" : "Login"}
            </button>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden mt-2">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="text-black hover:text-red-400 z-30"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen ? (
          <div className="md:hidden bg-black/90  space-y-4 p-5 rounded-md shadow-lg mt-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            )) 
            }
            <button
              onClick={() => {
                handleClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 text-gray-300 hover:text-red-400 font-medium"
            >
              <UserCircleIcon className="w-5 h-5" />
              {isUser ? "Logout" : "Login"}
            </button>
          </div>
        ):''}
      </div>)
 
      :(
        // Admin menus
         <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

<div className="flex justify-between items-center h-14">
{/* logo */}
 <div className="">
        <Link to="/" className="text-3xl logo text-black">
              aura<span className=" text-red-400 text-4xl">.</span>
            </Link>
            <span className="text-sm ml-2">Admin</span>
     </div>

<div className="md:hidden mt-2">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="text-black hover:text-red-400"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
</div>



     {/* mobile menu */}
     {isMobileMenuOpen && (
          <div className="md:hidden bg-black/90  space-y-4 p-5 rounded-md shadow-lg mt-2">
            {adminMenuItems.map((item) => (
              <p className="text-white" onClick={()=> setcurrentAdminMenu(item.path)}>{item.label}</p>
            ))}
           
          </div>
        )}
         </div>
      )

      }
       
    </header>
  );
};

export default Navbar;
