import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TrashIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "secret123",
    createdAt: "2024-05-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "mypassword",
    createdAt: "2024-04-10",
  },
]

 const baseUrl = import.meta.env.VITE_BASE_URL
export default function Userss() {
  const [users, setUsers] = useState(initialUsers)

    useEffect(()=>{
      const fetchingData = async()=>{
        await fetch (baseUrl+'/api/auth/signup')
        .then((res)=> res.json())
        .then((res)=> setUsers(res))
        .catch(er=> console.log(er))
      }
      fetchingData()
    },[])
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?")
    if (!confirmed) return

    const updated = users.filter((user) => user.id !== id)
    setUsers(updated)
    toast.success("User deleted")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Users</h2>
        <Button className="bg-green-600 hover:bg-green-700 text-white">+ Add User</Button>
      </div>

      <Table className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-gray-500">{user.password}</TableCell>
              <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(user.id)}
                >
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
