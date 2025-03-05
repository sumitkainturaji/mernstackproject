

import React, { useState, useContext, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoSearchSharp, IoCart } from 'react-icons/io5'
import { FaRegUser } from 'react-icons/fa'
import { CiMenuFries } from 'react-icons/ci'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Profile from '../Pages/Profile'
import { getAuthToken } from '../utils/auth'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const { setShowSearch, getCartCount } = useContext(ShopContext)
  const [loggedIn, setLoggedIn] = useState(false)


  const checkAuthStatus = () => {
    const token = getAuthToken()
    setLoggedIn(!!token) 
  }

  useEffect(() => {
    checkAuthStatus()
    window.addEventListener('storage', checkAuthStatus) 

    return () => {
      window.removeEventListener('storage', checkAuthStatus) 
    }
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 w-full shadow-md z-50 h-[72px] flex items-center justify-between px-5 sm:px-10 rounded-b-lg bg-sky-50">
      
        <Link
          to="/"
          className="flex items-center"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src={assets.logo}
            className="h-[70px] w-max min-w-[50px] rounded-full"
            alt="Logo"
          />
        </Link>

        {/* Navbar Links */}
        <ul className="hidden sm:flex gap-6 text-lg font-medium">
          {['Home', 'Collection', 'About', 'Contact'].map((item) => {
            const path =
              item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`
            return (
              <NavLink
                key={item}
                to={path}
                className={({ isActive }) =>
                  `relative group transition-all duration-300 hover:text-black ${
                    isActive ? 'text-black' : ''
                  }`
                }
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                {item.toUpperCase()}
                <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-black transition-transform duration-300 scale-0 group-hover:scale-100"></span>
              </NavLink>
            )
          })}
        </ul>

      
        <div className="flex items-center gap-6">
        
          <IoSearchSharp
            className="text-xl cursor-pointer"
            onClick={() => setShowSearch(true)}
          />


          <div className="relative cursor-pointer">
            <FaRegUser
              className={`text-xl ${
                loggedIn ? 'text-green-600' : 'text-black'
              }`}
              onClick={() => setShowProfile(!showProfile)}
            />
            {showProfile && (
              <div className="absolute right-0 top-10 bg-white shadow-md rounded-md py-3 px-4 w-64">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <h3 className="text-lg font-semibold">Profile</h3>
                  <button onClick={() => setShowProfile(false)}>✕</button>
                </div>
                <Profile />
              </div>
            )}
          </div>

   
          <Link to="/cart" className="relative">
            <IoCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {getCartCount()}
            </span>
          </Link>

     
          <CiMenuFries
            className="text-2xl sm:hidden cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </nav>

   
      <div
        className={`fixed top-0 right-0 h-screen bg-white shadow-lg transition-transform duration-300 z-40 ${
          menuOpen ? 'w-64 translate-x-0' : 'w-0 translate-x-full'
        }`}
      >
        <div className="flex flex-col text-lg text-gray-700">
          <div
            onClick={() => setMenuOpen(false)}
            className="p-4 text-right cursor-pointer"
          >
            ✕
          </div>
          {['Home', 'Collection', 'About', 'Contact'].map((item) => {
            const path =
              item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`
            return (
              <NavLink
                key={item}
                to={path}
                className="p-4 border-b"
                onClick={() => {
                  setMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                {item.toUpperCase()}
              </NavLink>
            )
          })}
      
          <p
            onClick={() => setShowProfile(!showProfile)}
            className="p-4 border-b cursor-pointer"
          >
            My Profile
          </p>
        </div>
      </div>

    
      <div className="pt-[72px]"></div>
    </>
  )
}

export default Navbar
