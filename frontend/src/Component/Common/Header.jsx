import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from '../Layout/Navbar'

function Header() {
  return (
    <header>
        <Topbar/>
        <Navbar/>
        {/* cart */}
    </header>
  )
}

export default Header