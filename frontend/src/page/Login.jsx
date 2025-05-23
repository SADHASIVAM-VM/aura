import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Eye, EyeOff, Mail, Lock, User, ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { useDebounce } from "../config/useDebouncing";

 const baseUrl = import.meta.env.VITE_BASE_URL
const AuthPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    role: 'customer',
  });
  
  const debouncedEmail = useDebounce(formData.email, 500)
  const [currentValue, setCurrentValue] = useState('login');
  const [error, setError] = useState(false);
  const [emailUnable, setEmailUnable] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
    const handleBackspace = (e) => {
      if (e.key === "Backspace") setError(false);
    };
    window.addEventListener("keydown", handleBackspace);
    return () => window.removeEventListener("keydown", handleBackspace);
  }, []);

  // email checking
  useEffect(()=>{
      const checkEmail = async () => {
      if (!debouncedEmail) {
        setEmailUnable(false);
        return;
      }
    }
  })

 const handleChange = async(e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if(name == 'email') {
      const email = value.trim();
      if(email) setCheckEmail(email)
      
    }
  };

 const handleLogin = async () => {
  setIsLoading(true);
  try {
    const response = await fetch(baseUrl+'/api/auth/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const res = await response.json();

    if (res.statusCode === 401 || !res.token) {
      toast.warn('Unauthorized user or invalid credentials');
      setIsLoading(false);
      return;
    }

    localStorage.setItem('user_id', res.user.id);
    localStorage.setItem('token', res.token);

    toast.success('Login successful!');
    await acc_userme(res.token);

    setIsLoading(false);
    // navigate to home (if using React Router DOM v6+)
    window.location.href = '/';

  } catch (err) {
    console.error(err);
    toast.error('Login failed. Please try again later.');
    setIsLoading(false);
  }
};

const handleSignUp = async () => {
  setIsLoading(true);
  try {
    const response = await fetch(baseUrl+'/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success('Account created successfully!');
      setTimeout(() => {
        setCurrentValue('login');
        setIsLoading(false);
      }, 1500);
    } else {
      toast.error(data.message || 'Sign-up failed. Please check your input.');
      setIsLoading(false);
    }

  } catch (err) {
    console.error(err);
    toast.error('Sign-up failed. Please try again later.');
    setIsLoading(false);
  }
};

async function acc_userme(token) {
  try {
    const res = await fetch(baseUrl+'/ro/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data?.data?.[0]) {
      localStorage.setItem('user_info', JSON.stringify(data.data[0]));
    } else {
      toast.warn('Could not fetch user details');
    }

  } catch (err) {
    console.error('Token fetch error:', err);
    toast.error('Failed to fetch user info');
  }
}


  return (

    <div className="min-h-screen bg-gradient-to-br mt-18 from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Hero Content */}
          <div className="hidden lg:flex flex-col items-center justify-center text-white space-y-8 p-8">
            <div className="relative">
            </div>
            
            <div className="text-center space-y-4">
              <h1 className="text-5xl  logo text-white">
              aura<span className=" text-red-400 text-6xl">.</span>
            
              </h1>
              <p className="text-xl text-purple-200 max-w-md">
                Your one-stop destination for all your daily essentials. Experience shopping like never before.
              </p>
            </div>

            <div className="flex items-center space-x-8 text-purple-200">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Side - Authentication Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
                
                {/* Mobile Logo */}
                <div className="lg:hidden text-center mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <h1 className="text-5xl  logo text-white">
              aura<span className=" text-red-400 text-6xl">.</span>
            
              </h1>
                  </div>
                  <p className="text-purple-200 text-sm">Welcome back!</p>
                </div>

                <Tabs defaultValue={currentValue} className="w-full space-y-6">
                  <TabsList className="grid grid-cols-2 w-full bg-white/10 rounded-2xl p-1 backdrop-blur-sm">
                    <TabsTrigger 
                      value="login" 
                      className="data-[state=active]:bg-white data-[state=active]:text-purple-900 text-white rounded-xl transition-all duration-300"
                      onClick={() => setCurrentValue("login")}
                    >
                     LogIn
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup" 
                      className="data-[state=active]:bg-white data-[state=active]:text-purple-900 text-white rounded-xl transition-all duration-300"
                      onClick={() => setCurrentValue("signup")}
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-6">
                    {error && (
                      <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl flex items-center gap-3 backdrop-blur-sm">
                        <Info className="w-5 h-5" />
                        <span>Invalid email or password. Please try again.</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                        <Input
                          type="email"
                          className="pl-10  border-white/20 placeholder-red-600  rounded-xl h-12 backdrop-blur-sm focus:bg-white/20 transition-all"
                          placeholder="Enter your email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10  border-white/20  rounded-xl h-12 backdrop-blur-sm focus:bg-white/20 transition-all"
                          placeholder="Enter your password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2 text-purple-200">
                        <input type="checkbox" className="rounded" />
                        <span>Remember me</span>
                      </label>
                      <a href="#" className="text-purple-300 hover:text-white transition-colors">Forgot password?</a>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl h-12 font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none" 
                      onClick={handleLogin} 
                      type="button"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-6">
                    {emailUnable && (
                      <div className="bg-green-500/20 border border-green-500/30 text-green-200 px-4 py-3 rounded-xl flex items-center gap-3 backdrop-blur-sm">
                        <Info className="w-5 h-5" />
                        <span>Email is available for registration!</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                        <Input
                          type="text"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder-white rounded-xl h-12 backdrop-blur-sm focus:bg-white/20 transition-all"
                          placeholder="Enter your full name"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                        <Input
                          type="email"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder-white rounded-xl h-12 backdrop-blur-sm focus:bg-white/20 transition-all"
                          placeholder="Enter your email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-white rounded-xl h-12 backdrop-blur-sm focus:bg-white/20 transition-all"
                          placeholder="Create a password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-purple-200">
                      <input type="checkbox" className="rounded" />
                      <span>I agree to the <a href="#" className="text-purple-300 hover:text-white transition-colors">Terms of Service</a> and <a href="#" className="text-purple-300 hover:text-white transition-colors">Privacy Policy</a></span>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl h-12 font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none" 
                      onClick={handleSignUp} 
                      type="button"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>

                {/* Social Login Options */}
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-transparent text-purple-200">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/10 backdrop-blur-sm text-purple-200 hover:bg-white/20 transition-all duration-200">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </button>
                    <button className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/10 backdrop-blur-sm text-purple-200 hover:bg-white/20 transition-all duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-white font-semibold">Processing your request...</p>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default AuthPage;