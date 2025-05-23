import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
    <nav>
<Navbar/>
    </nav>

    <main>
        <Outlet/>
    </main>
      
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default Layout
