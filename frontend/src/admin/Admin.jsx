import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChartBig,
  ShoppingCart,
  Truck,
  TrendingUp,
  Package,
  Edit,User
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { TrashIcon } from "@heroicons/react/24/outline"
import { Link, useNavigate } from "react-router-dom"
import Userss from './UserListing'
import OrderManagement from "./Order"
import { UseMyContext } from "../config/MyContext"

 const baseUrl = import.meta.env.VITE_BASE_URL
export default function Dashboard() {
  
   const token = localStorage.getItem('token')
   const {currentAdminMenu, setcurrentAdminMenu} =UseMyContext()
   const [ProductCount, setProductCount] =useState('')
  useEffect(()=>{
    const fetchingData = async()=>{
      await fetch (baseUrl+'/products', {headers:{
            Authorization: `Bearer ${token}`
    }})
      .then((res)=> res.json())
      .then((res)=> setProductCount(res.data.length))
      .catch(er=> console.log(er))
    }
    fetchingData()
  },[])
    
    
      const renderView = () => {
    switch (currentAdminMenu) {
      case 'dashboard':
        return <div> <main className="flex-1 p-6 space-y-6 bg-gray-50">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">Export</Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Total Revenue" value="$2,189.00" change="+7.52%" />
          <StatsCard title="Visitors" value="611" change="+6.20%" />
          <StatsCard title="Orders" value="3,250" change="+3.56%" />
          <StatsCard title="Total Products" value={ProductCount || 0} change="+3.72%" />
        </div>

        {/* Sales Analytics + Traffic */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56 w-full bg-gray-200 rounded-md flex items-center justify-center text-muted">
                {/* Replace with chart.js or shadcn chart */}
                Chart Placeholder
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traffic Source</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TrafficBar label="Google" percent={71} />
              <TrafficBar label="Shopify" percent={61} />
              <TrafficBar label="Facebook" percent={49} />
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Leather Flat Sandals</span>
                <span>$220.2 | 206 pcs</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <Badge variant="outline" className="text-green-600 border-green-400">In Stock</Badge>
              </div>
              <div>Total Earnings: <strong>$5,361.20</strong></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 text-center">
              <div>
                <div className="text-2xl font-bold text-green-500">756</div>
                <div className="text-xs text-muted-foreground">Packed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">1052</div>
                <div className="text-xs text-muted-foreground">Delivered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-500">1564</div>
                <div className="text-xs text-muted-foreground">Shipped</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main></div>
      case 'product':
        return <ProductsPage/>
      case 'orders':
        return <OrderManagement/>
      case 'customers':
        return <Userss/>
      default:
        return <div>404 Not Found</div>
    }
  }
console.log(currentAdminMenu )
  return (
    <div className="flex min-h-screen bg-muted mt-20 text-muted-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
    
        <nav className="space-y-3 text-sm">
          <div className="font-semibold text-primary">Main Menu</div>
          <ul className="space-y-2 pt-2">
            <li className={`flex items-center gap-2 cursor-pointer ${ currentAdminMenu =='dashboard' && 'font-medium text-black'}`} onClick={()=> setcurrentAdminMenu('dashboard')}><BarChartBig size={16}/> Dashboard</li>
            <li className={`flex items-center gap-2 cursor-pointer ${ currentAdminMenu == 'product' && 'font-medium text-black'}`} onClick={()=> setcurrentAdminMenu('product')}><Package size={16}/> Products</li>
            <li className={`flex items-center gap-2 cursor-pointer ${ currentAdminMenu == 'orders' && 'font-medium text-black'}`} onClick={()=> setcurrentAdminMenu('orders')}><ShoppingCart size={16}/> Orders</li>
            <li className={`flex items-center gap-2 cursor-pointer ${currentAdminMenu == 'customers'&& 'font-medium text-black'}`} onClick={()=> setcurrentAdminMenu('customers')}><User size={16}/> Customers</li>
            <li className={`flex items-center gap-2 cursor-pointer ${currentAdminMenu == 0 && 'font-medium text-black'}`}><Truck size={16}/> Shipping</li>
            <li className={`flex items-center gap-2 cursor-pointer ${ currentAdminMenu == 0 && 'font-medium text-black'}`}><TrendingUp size={16}/> Reviews</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 bg-gray-50">

         {
            renderView()
        }
        
       

      </main>
    </div>
  )
}

// Reusable stats card
function StatsCard({ title, value, change }) {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-black">{value}</div>
        <p className="text-xs text-green-500">{change} from last month</p>
      </CardContent>
    </Card>
  )
}

// Traffic bar
function TrafficBar({ label, percent }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="text-muted-foreground">{percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-violet-500 transition-all`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}


export  function ProductsPage() {

  const [datas, setDatas] =useState()
 const token = localStorage.getItem('token')
  useEffect(()=>{
    const fetchingData = async()=>{
      await fetch (baseUrl+'/products', {headers:{
            Authorization: `Bearer ${token}`
    }})
      .then((res)=> res.json())
      .then((res)=> setDatas(res.data))
      .catch(er=> console.log(er))
    }
    fetchingData()
  },[])
  console.log(datas)

  
const navigate = useNavigate()
  return (
    <div className="p-6 bg-gray-50 min-h-screen ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <Button variant="outline">Total : {datas?.length}</Button>
        </div>
        <Button className="bg-btn hover:bg-btn/70 text-white" onClick={()=> navigate('/admin/add')}>+ Add product</Button>
      </div>

      {/* Table */}
      <Table className="rounded-xl shadow-sm overflow-hidden w-full">
        <TableHeader>
          <TableRow>
     
            <TableHead>NAME</TableHead>
    
            <TableHead>PRICE</TableHead>
            <TableHead>CONDITION</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>AVAILABLE</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datas?.map((product, i) => (
            <TableRow key={i}>
              
              <TableCell className="flex items-center gap-2">
                <img src={product.image_url} className="w-8 h-8 rounded" />
                {product.name}
              </TableCell>
            
              <TableCell>{product.price}</TableCell>
              <TableCell>{'NEW'}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock_quantity}</TableCell>
              <TableCell><Edit color="blue" className="size-6"/></TableCell>
              <TableCell><TrashIcon color="red" className="size-6"/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Mock */}
      
    </div>
  )
}

