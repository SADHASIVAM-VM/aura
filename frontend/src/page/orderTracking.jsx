import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { Empty } from "./Wishlist";

 const baseUrl = import.meta.env.VITE_BASE_URL
export default function OrderTracking() {
  const [orders, setOrders] = useState([]);
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    fetch(`${baseUrl}/o/order/${user_id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.data))
      .catch((err) => console.error(err));
  }, []);

  const getStatusStyle = (status) =>
    clsx("text-sm font-medium px-2 py-1 rounded-full flex items-center gap-1", {
      "bg-yellow-100 text-yellow-800": status === "pending" || status === "in progress",
      "bg-green-100 text-green-800": status === "delivered" || status === "completed",
      "bg-red-100 text-red-800": status === "cancelled",
    });

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4 py-8 min-h-96">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      <div className="space-y-4">
        {orders ? 
        orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 flex justify-between items-center bg-[#f3f3f3] hover:shadow-sm transition"
          >
            <div className="flex items-start gap-4">
              <img
                src="https://bookings.jenningsstorage.co.uk/assets/blank-unit-type-icon-ffbac7b88ba66c5e286b0e438baccc4b9c83835d4c34f86887a83fc20ec27e7b.svg"
                alt="Pro"
                className="w-16 h-16 rounded object-cover"
              />
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
                <div className="font-semibold text-base">
                  Order ID: ABC-{order.id}
                </div>
                <div className="text-xl ">
                  ₹{Number(order.total_amount).toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <Badge className={getStatusStyle(order.status)}>
                ● {order.status}
              </Badge>
              <button className="text-red-600 text-sm hover:underline">
                View Details
              </button>
            </div>
          </div>

        
        ))
      :<div className="text-center  p-6 rounded-md">
               <Empty o={'orders'}/>
              </div>

      }
      </div>
    </div>
  );
}
