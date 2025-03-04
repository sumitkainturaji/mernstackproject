// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/frontend_assets/assets'
// import { Link, NavLink } from 'react-router-dom'
// import { IoSearchSharp } from 'react-icons/io5'
// import { FaRegUser } from 'react-icons/fa'
// import { IoCart } from 'react-icons/io5'
// import { CiMenuFries } from 'react-icons/ci'
// import { ShopContext } from '../Context/ShopContext'
// const Navbar = () => {
//   const [visible, setVisible] = useState(false)

//   const { setShowSearch, getCartCount } = useContext(ShopContext)

//   return (
//     <div className="flex item-center justify-between py-5 font-medium">
//       <Link to="/">
//         {' '}
//         <img src={assets.logo} className="w-25 h-20" alt="" />{' '}
//       </Link>
//       <ul className=" sm:flex  gap-5 text-sm text-gray-400 hidden">
//         <NavLink to="/" className="flex flex-col items-center gap-1">
//           <p>HOME</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-black hidden" />
//         </NavLink>
//         <NavLink to="/collection" className="flex flex-col items-center gap-1">
//           <p>COLECTION</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-black hidden" />
//         </NavLink>
//         <NavLink to="/about" className="flex flex-col items-center gap-1">
//           <p>ABOUT</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-black hidden" />
//         </NavLink>
//         <NavLink to="/contact" className="flex flex-col items-center gap-1">
//           <p>CONTACT</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-black hidden" />
//         </NavLink>
//       </ul>

//       <div className="flex items-center gap-6">
//         <p
//           onClick={() => setShowSearch(true)}
//           className="w-5 cursor-pointer text-lg mb-5"
//         >
//           {' '}
//           <IoSearchSharp />
//         </p>
//         <div className="group relative">
//           <Link to="/login">
//             <p className="w-5 cursor-pointer text-md mb-5">
//               {' '}
//               <FaRegUser />
//             </p>
//           </Link>

//           <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
//             <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-400 rounded">
//               <p className="cursor-pointer hover:text-black">My Profile</p>
//               <p className="cursor-pointer hover:text-black">Orders</p>
//               <p className="cursor-pointer hover:text-black">Logout</p>
//             </div>
//           </div>
//         </div>
//         <Link to="/cart" className="relative">
//           <p className="w-5 min-w-5 pb-5 text-xl">
//             <IoCart />
//           </p>
//           <p className="absolute right-[-6px] bottom-[5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] mb-6 ">
//             {getCartCount()}
//           </p>
//         </Link>
//         <p
//           onClick={() => setVisible(true)}
//           className="w-5 cursor-pointer sm:hidden mb-5"
//         >
//           <CiMenuFries />
//         </p>
//       </div>

//       <div
//         className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all  ${
//           visible ? 'w-full' : 'w-0'
//         }`}
//       >
//         <div className="flex flex-col text-gray-400">
//           <div
//             onClick={() => setVisible(false)}
//             className="flex items-center gap-4 p-3 cursor-pointer"
//           >
//             <img className="h-4 rotate-180" src={assets.dropdown_icon} />
//             <p>Back</p>
//           </div>
//           <NavLink
//             onClick={() => setVisible(false)}
//             className="py-2 pl-2 border"
//             to="/"
//           >
//             {' '}
//             HOME
//           </NavLink>
//           <NavLink
//             onClick={() => setVisible(false)}
//             className="py-2 pl-2 border"
//             to="/collection"
//           >
//             {' '}
//             COLLECTION
//           </NavLink>
//           <NavLink
//             onClick={() => setVisible(false)}
//             className="py-2 pl-2 border"
//             to="/about"
//           >
//             {' '}
//             ABOUT
//           </NavLink>
//           <NavLink
//             onClick={() => setVisible(false)}
//             className="py-2 pl-2 border"
//             to="/contact"
//           >
//             {' '}
//             CONTACT
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar

// import React, { useContext, useState, useEffect } from 'react'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { IoSearchSharp, IoCart } from 'react-icons/io5'
// import { FaRegUser } from 'react-icons/fa'
// import { CiMenuFries } from 'react-icons/ci'
// import { ShopContext } from '../Context/ShopContext'
// import Cookies from 'js-cookie'
// import { assets } from '../assets/frontend_assets/assets'

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const { setShowSearch, getCartCount } = useContext(ShopContext)
//   const navigate = useNavigate()

//   useEffect(() => {
//     setIsLoggedIn(!!Cookies.get('authToken'))
//   }, [])

//   const handleLogout = () => {
//     Cookies.remove('authToken')
//     Cookies.remove('user')
//     setIsLoggedIn(false)
//     navigate('/login')
//   }

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full  shadow-md z-50 h-[72px] flex items-center justify-between px-5 sm:px-10 rounded-b-lg bg-sky-50 ">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center"
//           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         >
//           <img
//             src={assets.logo}
//             className="w-28 h-20 object-contain"
//             alt="Logo"
//           />
//         </Link>

//         <ul className="hidden sm:flex gap-6 text-lg font-medium">
//           <NavLink
//             key="Home"
//             to="/"
//             className="relative transition-all duration-300 hover:text-black"
//           >
//             HOME
//             <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-black scale-0 transition-transform duration-200 hover:scale-100"></span>
//           </NavLink>
//           {['Collection', 'About', 'Contact'].map((item) => (
//             <NavLink
//               key={item}
//               to={`/${item.toLowerCase()}`}
//               className="relative hover:text-black transition-all duration-200"
//             >
//               {item.toUpperCase()}
//               <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-black scale-0 transition-transform duration-200 hover:scale-100"></span>
//             </NavLink>
//           ))}
//         </ul>

//         {/* Icons Section */}
//         <div className="flex items-center gap-6">
//           {/* Search Icon */}
//           <IoSearchSharp
//             className="text-xl cursor-pointer"
//             onClick={() => setShowSearch(true)}
//           />

//           {/* User Profile */}
//           <div className="relative">
//             {isLoggedIn ? (
//               <div className="cursor-pointer relative group">
//                 <FaRegUser className="text-xl text-black" />

//                 {/* Dropdown Menu */}
//                 <div className="hidden group-hover:flex flex-col absolute right-0 top-8 bg-white shadow-md rounded-md py-2 w-40">
//                   <Link to="/profile" className="px-4 py-2 hover:bg-gray-100">
//                     My Profile
//                   </Link>
//                   <Link to="/orders" className="px-4 py-2 hover:bg-gray-100">
//                     Orders
//                   </Link>
//                   <p
//                     onClick={handleLogout}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   >
//                     Logout
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <Link to="/login">
//                 <FaRegUser className="text-xl cursor-pointer" />
//               </Link>
//             )}
//           </div>

//           {/* Cart Icon */}
//           <Link to="/cart" className="relative">
//             <IoCart className="text-2xl" />
//             <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//               {getCartCount()}
//             </span>
//           </Link>

//           {/* Mobile Menu Icon */}
//           <CiMenuFries
//             className="text-2xl sm:hidden cursor-pointer"
//             onClick={() => setMenuOpen(true)}
//           />
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 right-0 h-screen bg-white shadow-lg transition-all duration-300 z-40 ${
//           menuOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
//         }`}
//       >
//         <div className="flex flex-col text-lg text-gray-700">
//           {/* Close Button */}
//           <div
//             onClick={() => setMenuOpen(false)}
//             className="p-4 text-right cursor-pointer"
//           >
//             ✕
//           </div>

//           {/* Links */}
//           <NavLink
//             key="Home"
//             to="/"
//             className="p-4 border-b"
//             onClick={() => setMenuOpen(false)}
//           >
//             HOME
//           </NavLink>
//           {['Collection', 'About', 'Contact'].map((item) => (
//             <NavLink
//               key={item}
//               onClick={() => setMenuOpen(false)}
//               className="p-4 border-b"
//               to={`/${item.toLowerCase()}`}
//             >
//               {item.toUpperCase()}
//             </NavLink>
//           ))}

//           {/* Profile / Logout in Mobile Menu */}
//           {isLoggedIn ? (
//             <>
//               <NavLink
//                 onClick={() => setMenuOpen(false)}
//                 className="p-4 border-b"
//                 to="/profile"
//               >
//                 My Profile
//               </NavLink>

//               <p onClick={handleLogout} className="p-4 cursor-pointer">
//                 Logout
//               </p>
//             </>
//           ) : (
//             <NavLink
//               onClick={() => setMenuOpen(false)}
//               className="p-4"
//               to="/login"
//             >
//               Login
//             </NavLink>
//           )}
//         </div>
//       </div>

//       {/* Page Content Wrapper with proper padding */}
//       <div className="pt-[72px]">
//         {/* This ensures content starts below the navbar */}
//       </div>
//     </>
//   )
// }

// export default Navbar

// import React, { useContext, useState, useEffect } from 'react'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { IoSearchSharp, IoCart } from 'react-icons/io5'
// import { FaRegUser } from 'react-icons/fa'
// import { CiMenuFries } from 'react-icons/ci'
// import { ShopContext } from '../Context/ShopContext'
// import Cookies from 'js-cookie'
// import { assets } from '../assets/frontend_assets/assets'

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const { setShowSearch, getCartCount } = useContext(ShopContext)
//   const navigate = useNavigate()

//   useEffect(() => {
//     setIsLoggedIn(!!Cookies.get('authToken'))
//   }, [])

//   const handleLogout = () => {
//     Cookies.remove('authToken')
//     Cookies.remove('user')
//     setIsLoggedIn(false)
//     navigate('/login')
//   }

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full shadow-md z-50 h-[72px] flex items-center justify-between px-5 sm:px-10 rounded-b-lg bg-sky-50">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center"
//           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         >
//           <img
//             src={assets.logo}
//             className="w-28 h-20 object-contain"
//             alt="Logo"
//           />
//         </Link>

//         {/* Navbar Links */}
//         <ul className="hidden sm:flex gap-6 text-lg font-medium">
//           {['Home', 'Collection', 'About', 'Contact'].map((item) => (
//             <NavLink
//               key={item}
//               to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
//               className={({ isActive }) =>
//                 `relative transition-all duration-300 hover:text-black ${
//                   isActive ? 'text-black' : ''
//                 }`
//               }
//               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//             >
//               {item.toUpperCase()}
//               <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-black scale-0 transition-transform duration-300 group-hover:scale-100"></span>
//             </NavLink>
//           ))}
//         </ul>

//         {/* Icons Section */}
//         <div className="flex items-center gap-6">
//           {/* Search Icon */}
//           <IoSearchSharp
//             className="text-xl cursor-pointer"
//             onClick={() => setShowSearch(true)}
//           />

//           {/* User Profile */}
//           <div className="relative">
//             {isLoggedIn ? (
//               <div className="cursor-pointer relative group">
//                 <FaRegUser className="text-xl text-black" />
//                 <div className="hidden group-hover:flex flex-col absolute right-0 top-8 bg-white shadow-md rounded-md py-2 w-40">
//                   <Link to="/profile" className="px-4 py-2 hover:bg-gray-100">
//                     My Profile
//                   </Link>
//                   <Link to="/orders" className="px-4 py-2 hover:bg-gray-100">
//                     Orders
//                   </Link>
//                   <p
//                     onClick={handleLogout}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   >
//                     Logout
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <Link to="/login">
//                 <FaRegUser className="text-xl cursor-pointer" />
//               </Link>
//             )}
//           </div>

//           {/* Cart Icon */}
//           <Link to="/cart" className="relative">
//             <IoCart className="text-2xl" />
//             <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//               {getCartCount()}
//             </span>
//           </Link>

//           {/* Mobile Menu Icon */}
//           <CiMenuFries
//             className="text-2xl sm:hidden cursor-pointer"
//             onClick={() => setMenuOpen(true)}
//           />
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 right-0 h-screen bg-white shadow-lg transition-all duration-300 z-40 ${
//           menuOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
//         }`}
//       >
//         <div className="flex flex-col text-lg text-gray-700">
//           <div
//             onClick={() => setMenuOpen(false)}
//             className="p-4 text-right cursor-pointer"
//           >
//             ✕
//           </div>

//           {['Home', 'Collection', 'About', 'Contact'].map((item) => (
//             <NavLink
//               key={item}
//               to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
//               className="p-4 border-b"
//               onClick={() => {
//                 setMenuOpen(false)
//                 window.scrollTo({ top: 0, behavior: 'smooth' })
//               }}
//             >
//               {item.toUpperCase()}
//             </NavLink>
//           ))}

//           {/* Profile / Logout in Mobile Menu */}
//           {isLoggedIn ? (
//             <>
//               <NavLink
//                 onClick={() => setMenuOpen(false)}
//                 className="p-4 border-b"
//                 to="/profile"
//               >
//                 My Profile
//               </NavLink>

//               <p onClick={handleLogout} className="p-4 cursor-pointer">
//                 Logout
//               </p>
//             </>
//           ) : (
//             <NavLink
//               onClick={() => setMenuOpen(false)}
//               className="p-4"
//               to="/login"
//             >
//               Login
//             </NavLink>
//           )}
//         </div>
//       </div>

//       {/* Page Content Wrapper */}
//       <div className="pt-[72px]"></div>
//     </>
//   )
// }

// export default Navbar

// import React, { useContext, useState, useEffect } from 'react'
// import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
// import { IoSearchSharp, IoCart } from 'react-icons/io5'
// import { FaRegUser } from 'react-icons/fa'
// import { CiMenuFries } from 'react-icons/ci'
// import { ShopContext } from '../Context/ShopContext'
// import Cookies from 'js-cookie'
// import { assets } from '../assets/frontend_assets/assets'

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const { setShowSearch, getCartCount } = useContext(ShopContext)
//   const navigate = useNavigate()
//   const location = useLocation()

//   useEffect(() => {
//     setIsLoggedIn(!!Cookies.get('authToken'))
//   }, [])

//   const handleLogout = () => {
//     Cookies.remove('authToken')
//     Cookies.remove('user')
//     setIsLoggedIn(false)
//     navigate('/login')
//   }

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full shadow-md z-50 h-[72px] flex items-center justify-between px-5 sm:px-10 rounded-b-lg bg-sky-50">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center"
//           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         >
//           <img
//             src={assets.logo}
//             className="w-28 h-20 object-contain"
//             alt="Logo"
//           />
//         </Link>

//         {/* Navbar Links */}
//         <ul className="hidden sm:flex gap-6 text-lg font-medium">
//           {['Home', 'Collection', 'About', 'Contact'].map((item) => {
//             const path = `/${
//               item.toLowerCase() === 'home' ? '' : item.toLowerCase()
//             }`
//             return (
//               <NavLink
//                 key={item}
//                 to={path}
//                 className={({ isActive }) =>
//                   `relative group transition-all duration-300 hover:text-black ${
//                     isActive ? 'text-black' : ''
//                   }`
//                 }
//                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//               >
//                 {item.toUpperCase()}
//                 {/* Smooth Underline Effect */}
//                 <span
//                   className={`absolute bottom-[-4px] left-0 w-full h-[2px] bg-black transition-transform duration-300 ${
//                     location.pathname === path ? 'scale-100' : 'scale-0'
//                   } group-hover:scale-100`}
//                 ></span>
//               </NavLink>
//             )
//           })}
//         </ul>

//         {/* Icons Section */}
//         <div className="flex items-center gap-6">
//           {/* Search Icon */}
//           <IoSearchSharp
//             className="text-xl cursor-pointer"
//             onClick={() => setShowSearch(true)}
//           />

//           {/* User Profile */}
//           <div className="relative">
//             {isLoggedIn ? (
//               <div className="cursor-pointer relative group">
//                 <FaRegUser className="text-xl text-black" />
//                 <div className="hidden group-hover:flex flex-col absolute right-0 top-8 bg-white shadow-md rounded-md py-2 w-40">
//                   <Link to="/profile" className="px-4 py-2 hover:bg-gray-100">
//                     My Profile
//                   </Link>
//                   <Link to="/orders" className="px-4 py-2 hover:bg-gray-100">
//                     Orders
//                   </Link>
//                   <p
//                     onClick={handleLogout}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   >
//                     Logout
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <Link to="/login">
//                 <FaRegUser className="text-xl cursor-pointer" />
//               </Link>
//             )}
//           </div>

//           {/* Cart Icon */}
//           <Link to="/cart" className="relative">
//             <IoCart className="text-2xl" />
//             <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//               {getCartCount()}
//             </span>
//           </Link>

//           {/* Mobile Menu Icon */}
//           <CiMenuFries
//             className="text-2xl sm:hidden cursor-pointer"
//             onClick={() => setMenuOpen(true)}
//           />
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 right-0 h-screen bg-white shadow-lg transition-all duration-300 z-40 ${
//           menuOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
//         }`}
//       >
//         <div className="flex flex-col text-lg text-gray-700">
//           <div
//             onClick={() => setMenuOpen(false)}
//             className="p-4 text-right cursor-pointer"
//           >
//             ✕
//           </div>

//           {['Home', 'Collection', 'About', 'Contact'].map((item) => {
//             const path = `/${
//               item.toLowerCase() === 'home' ? '' : item.toLowerCase()
//             }`
//             return (
//               <NavLink
//                 key={item}
//                 to={path}
//                 className="p-4 border-b"
//                 onClick={() => {
//                   setMenuOpen(false)
//                   window.scrollTo({ top: 0, behavior: 'smooth' })
//                 }}
//               >
//                 {item.toUpperCase()}
//               </NavLink>
//             )
//           })}

//           {/* Profile / Logout in Mobile Menu */}
//           {isLoggedIn ? (
//             <>
//               <NavLink
//                 onClick={() => setMenuOpen(false)}
//                 className="p-4 border-b"
//                 to="/profile"
//               >
//                 My Profile
//               </NavLink>

//               <p onClick={handleLogout} className="p-4 cursor-pointer">
//                 Logout
//               </p>
//             </>
//           ) : (
//             <NavLink
//               onClick={() => setMenuOpen(false)}
//               className="p-4"
//               to="/login"
//             >
//               Login
//             </NavLink>
//           )}
//         </div>
//       </div>

//       {/* Page Content Wrapper */}
//       <div className="pt-[72px]"></div>
//     </>
//   )
// }

// export default Navbar

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

  // Function to check login status dynamically
  const checkAuthStatus = () => {
    const token = getAuthToken()
    setLoggedIn(!!token) // Convert to boolean
  }

  // Run on mount & when token changes
  useEffect(() => {
    checkAuthStatus()
    window.addEventListener('storage', checkAuthStatus) // Listen for login/logout changes

    return () => {
      window.removeEventListener('storage', checkAuthStatus) // Cleanup
    }
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 w-full shadow-md z-50 h-[72px] flex items-center justify-between px-5 sm:px-10 rounded-b-lg bg-sky-50">
        {/* Logo */}
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

        {/* Icons Section */}
        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <IoSearchSharp
            className="text-xl cursor-pointer"
            onClick={() => setShowSearch(true)}
          />

          {/* User Profile - Dropdown */}
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

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <IoCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {getCartCount()}
            </span>
          </Link>

          {/* Mobile Menu Icon */}
          <CiMenuFries
            className="text-2xl sm:hidden cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
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
          {/* Profile in Mobile Menu */}
          <p
            onClick={() => setShowProfile(!showProfile)}
            className="p-4 border-b cursor-pointer"
          >
            My Profile
          </p>
        </div>
      </div>

      {/* Page Content Wrapper */}
      <div className="pt-[72px]"></div>
    </>
  )
}

export default Navbar
