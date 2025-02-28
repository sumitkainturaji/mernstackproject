import React, { useContext, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { IoSearchSharp } from 'react-icons/io5'
import { FaRegUser } from 'react-icons/fa'
import { IoCart } from 'react-icons/io5'
import { CiMenuFries } from 'react-icons/ci'
import { ShopContext } from '../Context/ShopContext'
const Navbar = () => {
  const [visible, setVisible] = useState(false)

  const { setShowSearch, getCartCount } = useContext(ShopContext)

  return (
    <div className="flex item-center justify-between py-5 font-medium">
      <Link to="/">
        {' '}
        <img src={assets.logo} className="w-25 h-20" alt="" />{' '}
      </Link>
      <ul className=" sm:flex  gap-5 text-sm text-gray-400 hidden">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-black hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-black hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-black hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-black hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <p
          onClick={() => setShowSearch(true)}
          className="w-5 cursor-pointer text-lg mb-5"
        >
          {' '}
          <IoSearchSharp />
        </p>
        <div className="group relative">
          <Link to="/login">
            <p className="w-5 cursor-pointer text-md mb-5">
              {' '}
              <FaRegUser />
            </p>
          </Link>

          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-400 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <p className="w-5 min-w-5 pb-5 text-xl">
            <IoCart />
          </p>
          <p className="absolute right-[-6px] bottom-[5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] mb-6 ">
            {getCartCount()}
          </p>
        </Link>
        <p
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden mb-5"
        >
          <CiMenuFries />
        </p>
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all  ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-400">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-2 border"
            to="/"
          >
            {' '}
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-2 border"
            to="/collection"
          >
            {' '}
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-2 border"
            to="/about"
          >
            {' '}
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-2 border"
            to="/contact"
          >
            {' '}
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
