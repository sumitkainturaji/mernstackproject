import React from 'react'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full shadow-md z-50 h-[72px] flex items-center justify-between px-5 sm:px-10 rounded-b-lg bg-sky-50">
      <img
        className="h-[70px] w-max min-w-[50px] rounded-full"
        src={assets.logo}
        alt="Logo"
      />
    </nav>
  )
}

export default Navbar
