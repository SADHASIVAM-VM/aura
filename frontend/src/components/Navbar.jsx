import React, { useState } from "react";
import {
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dot } from "lucide-react";
import { UseMyContext } from "../config/MyContext";
import { useDebounce } from "../config/useDebouncing";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFirstClick, setFirstClick] = useState(false);
  const [queries, setQueries] = useState('');

  const { cart, setcurrentAdminMenu } = UseMyContext();
  const isUser = localStorage.getItem("user_id");
  const admin_url = useLocation().pathname;

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

  // const menuItems = [
  //   { label: "Shop", icon: RectangleStackIcon, path: "/shop" },
  //   { label: "Order", icon: ShoppingBagIcon, path: "/myorder" },
  //   { label: "About", icon: RectangleStackIcon, path: "/" },
  // ];

  const adminMenuItems = [
    { label: "Dashboard", path: "dashboard" },
    { label: "Product", path: "product" },
    { label: "Orders", path: "orders" },
    { label: "Customers", path: "customers" },
  ];

  // handle the first click of the search box
function verifyClick(){
  if(isFirstClick){
    navigate('/shop')
  }
  setFirstClick(true);
}

// handle search queries
function handleQuery(e){
 setQueries(e.target.value);

}
let res = useDebounce(queries, 2000)
console.log(res)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100">
      {!admin_url.includes("admin") ? (
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Left Section - Logo + Search */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            
               <Link to="/" className="text-3xl logo text-black ">
              aura<span className=" text-red-400 text-3xl">.</span>
            </Link>
            

            {/* Search Input */}
            <div className="relative hidden sm:block w-60">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onFocus={verifyClick}
                onChange={handleQuery}
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.25-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
              </svg>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-6">
              {/* {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
                >
                  {item.label}
                </Link>
              ))} */}
            </nav>

            {/* Orders */}
            <button
              title="Orders"
              onClick={() => navigate("/myorder")}
              className="flex items-center gap-1 text-black hover:text-indigo-600 transition"
            >
              <img src="/ic/orders.png" className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-medium">Orders</span>
            </button>

            {/* Wishlist */}
            <button
              title="Wishlist"
              onClick={() => navigate("/wishlist")}
              className="flex items-center gap-1 text-black hover:text-red-500 transition"
            >
              <img src="/ic/heart.png" className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-medium">Favourites</span>
            </button>

            {/* Cart */}
            <button
              title="Cart"
              onClick={() => navigate("/cart")}
              className="relative flex items-center gap-1 text-black hover:text-indigo-600 transition"
            >
              <img src="/ic/cart.png" className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-medium">Cart</span>
              {1 > 0 && (
                <span className="text-[8px] absolute -top-1 -right-2 md:-left-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cart?.length ?? 0}
                </span>
              )}
            </button>

            {/* User */}
            <button
              onClick={handleClick}
              className="hidden md:flex items-center gap-2 px-3 py-1 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-full transition"
            >
              <img src="/ic/user.png" className="w-5 h-5 text-black" />
              {isUser ? "Logout" : "Login"}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-black hover:text-indigo-600 transition"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      ) : (
        // Admin Navbar
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Link to="/" className="text-3xl logo text-black ">
              aura<span className=" text-red-400 text-3xl">.</span>
           
            </Link>

            <span className="text-sm text-gray-600 ml-2">Admin</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-black hover:text-indigo-600 md:hidden"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>

          {/* Admin Menu Mobile */}
          {isMobileMenuOpen && (
            <div className="absolute top-14 left-0 w-full bg-white shadow-md p-4 rounded-b-lg space-y-3 md:hidden">
              {adminMenuItems.map((item) => (
                <p
                  key={item.label}
                  onClick={() => setcurrentAdminMenu(item.path)}
                  className="text-black hover:text-indigo-600 cursor-pointer font-medium"
                >
                  {item.label}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && !admin_url.includes("admin") && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md p-4 rounded-b-lg space-y-3 md:hidden">
          {/* {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="block text-black hover:text-indigo-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))} */}

          <button
            onClick={() => {
              handleClick();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left text-black hover:text-red-500 font-medium"
          >
            <UserCircleIcon className="inline w-5 h-5 mr-1" />
            {isUser ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
