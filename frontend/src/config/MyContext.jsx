import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


const MyContext = createContext()


export const MyContexProvider = ({children}) => {
 const baseUrl = import.meta.env.VITE_BASE_URL
  const LoginedUser_ID = localStorage.getItem('user_id')
  const TokenFromLocal = localStorage.getItem('token') 
const [currentOrderId, setcurrentOrderId]  = useState('')
const [currentAdminMenu, setcurrentAdminMenu]  = useState('dashboard')
const [cart, setCart] = useState()
//console.log(LoginedUser_ID)
  useEffect(()=>{

    fetch(`${baseUrl}/cart/${localStorage.getItem('user_id')}`)
    .then(response => response.json())
    .then(data => setCart(data.cart))
    .catch(err=> console.log(err))
  },[setCart])

const contextValues = {
    currentOrderId, setcurrentOrderId,
  cart, setCart,LoginedUser_ID,TokenFromLocal,
  currentAdminMenu, setcurrentAdminMenu
}


  return (
    <MyContext.Provider value={contextValues}>
      {children}
    </MyContext.Provider>
  )
}

export const UseMyContext =()=>{
    const context = useContext(MyContext);
    return context
}
