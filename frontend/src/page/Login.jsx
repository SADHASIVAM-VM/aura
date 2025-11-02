import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_BASE_URL;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });

  // Update field values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // LOGIN
  const handleLogin = async () => {
    if (!formData.email || !formData.password)
      return toast.warn("Please fill all fields.");

    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user?.id || "");
        toast.success("Login successful!");
        window.location.href = "/";
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // SIGNUP
  const handleSignup = async () => {
    if (!formData.email || !formData.password || !formData.username)
      return toast.warn("Please fill all fields.");

    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully!");
        setIsLogin(true);
      } else {
        toast.error(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Signup failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex my-18 bg-gray-50 text-black font-sans">
      {/* LEFT SECTION (Form) */}
      <div className="w-full lg:w-[35%]  min-h-[50vh] flex flex-col justify-center items-center px-8 lg:px-16">
        <div className="w-full max-w-sm space-y-6">
          {/* Logo */}
          <div className="mb-4 flex items-center gap-2">
            <div className="w-18 h-18 bg-black rounded-sm">
              <img src="/logo.png" className="w-full h-full object-cover" alt="" />
            </div>
            <h1 className="font-semibold text-lg">Aura</h1>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-2xl font-bold">
              {isLogin ? "Sign in" : "Create account"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isLogin
                ? "Welcome back! Please enter your details."
                : "Join us to start your Aura experience."}
            </p>
          </div>

          {/* Fields */}
          <div className="space-y-4 mt-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Full Name"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 rounded-md pl-9 pr-3 text-sm focus:ring-2 focus:ring-black outline-none"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-10 border border-gray-300 rounded-md pl-9 pr-3 text-sm focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-10 border border-gray-300 rounded-md pl-9 pr-9 text-sm focus:ring-2 focus:ring-black outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me / Toggle */}
          {isLogin && (
            <div className="flex items-center justify-between text-xs text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-black" /> Remember me
              </label>
              <button className="hover:underline">Forgot Password?</button>
            </div>
          )}

          {/* Button */}
          <button
            onClick={isLogin ? handleLogin : handleSignup}
            disabled={isLoading}
            className="w-full bg-black text-white h-10 rounded-md text-sm font-medium hover:bg-gray-900 transition-colors disabled:opacity-50"
          >
            {isLoading
              ? isLogin
                ? "Signing in..."
                : "Creating account..."
              : isLogin
              ? "Sign In"
              : "Sign Up"}
          </button>

          {/* Switch */}
          <p className="text-center text-xs text-gray-600">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="font-medium text-black hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="font-medium text-black hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>

          {/* Social Buttons */}

          {/* <div className="flex justify-center gap-3 mt-4">
            <button className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
              <img src="/google.svg" alt="Google" className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
              <img src="/github.svg" alt="GitHub" className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
              <img src="/facebook.svg" alt="Facebook" className="w-4 h-4" />
            </button>
          </div> */}


        </div>
      </div>

      {/* RIGHT SECTION (Dark Display Panel) */}
      <div className="hidden lg:flex w-[65%] min-h-[50vh] items-center justify-center bg-black text-white rounded-l-3xl relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 bg-gradient-to-tr from-gray-600 to-gray-800 rotate-45 right-10 top-10 blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="max-w-md z-10 space-y-6 px-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome to Aura</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Aura brings you closer to the brands you love.
Shop premium products, exclusive deals, and a seamless checkout experience.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-5 text-sm border border-gray-800">
            <h3 className="font-semibold mb-1">
               Shop smarter, live better.
            </h3>
            <p className="text-gray-400 mb-4">
Join thousands of happy customers enjoying effortless online shopping.
            </p>
            <div className="flex -space-x-2">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                className="w-6 h-6 rounded-full border border-gray-800"
              />
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                className="w-6 h-6 rounded-full border border-gray-800"
              />
              <img
                src="https://randomuser.me/api/portraits/women/32.jpg"
                className="w-6 h-6 rounded-full border border-gray-800"
              />
              <div className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full text-xs">
                +3
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
