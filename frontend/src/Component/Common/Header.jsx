import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from '../Common/Navbar'
import CartDrawer from '../Layout/CartDrawer'

function Header() {
  return (
    <header>
        <Topbar/>
        <Navbar />
        {/* cart */}
    </header>
  )
}

export default Header