import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <Header/> 
      <main>
        <Outlet/>
      </main>
      <Footer/> 
    </>
  )
}

export default Layout