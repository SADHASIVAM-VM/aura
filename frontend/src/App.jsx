import Home from "./page/Home";
import "./App.css";
import Cart from "./page/Cart";
import Layout from "./Layout/Layout";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
} from "react-router-dom";
import ProductListing from "./page/ProductListing";
import Product from "./page/Product";
import AddItemForm from "./admin/Additem";
import Wishlist from "./page/Wishlist";
import AuthPage from "./page/Login";
import ProtectedRoute from "./route/ProtectedRoute";
import PublicRoute from "./route/PublicRoute";
import OrderTracking from "./page/orderTracking";
import { toast, ToastContainer } from "react-toastify";
import Dashboard from "./admin/Admin";
import CheckoutStepFlow from "./page/PlaceOrderSetup";

function App() {
  console.log(import.meta.env.VITE_BASE_URL)
  const routt = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: (
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/shop",
          element: (
            <ProtectedRoute>

              <ProductListing />
            </ProtectedRoute>
            
          ),
        },
        {
          path: "/product/:id",
          element: (
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/add",
          element: <AddItemForm />,
        },
        {
          path: "/l",
          element: <Wishlist />,
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <CheckoutStepFlow/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/myorder",
          element: (
            <ProtectedRoute>
              <OrderTracking/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin",
          element: (
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return(
  <>
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
   <RouterProvider router={routt} />
   </>)
}

export default App;
