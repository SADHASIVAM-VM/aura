import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

 const baseUrl = import.meta.env.VITE_BASE_URL
export default function OrderManagement() {
  const [searchUser, setSearchUser] = useState("");
  const [filterDelivered, setFilterDelivered] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/o/admin/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders))
      .catch((err) => console.error(err));
  }, []);

  // Filtered Orders (using useMemo for performance)
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const userMatch = !searchUser || order.orderBy?.user_id?.includes(searchUser);
      const statusMatch = !filterDelivered || order.status === "delivered";
      return userMatch && statusMatch;
    });
  }, [orders, searchUser, filterDelivered]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-6">
      <h2 className="text-2xl font-semibold">Order Management</h2>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <Input
          placeholder="Search by User ID"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="w-full md:w-64"
        />
        <div className="">
  <p className="text-black/50 font-medium ">total orders <span className="border p-2 px-4 rounded-md logo text-black" >{orders.length}</span> </p>
</div>
      </div>


      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <img
                      src={order.product?.image_url}
                      alt={order.product?.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.product?.name}
                  </TableCell>
                  
                  <TableCell>
                    ₹{Number(order.price).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {order.orderBy?.user_id}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={clsx("capitalize", {
                        "bg-green-100 text-green-800": order.status === "delivered",
                        "bg-yellow-100 text-yellow-800": order.status === "pending",
                      })}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center text-muted-foreground">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
