import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="fixed top-[8vh]  w-full shadow-md z-50 h-[72px] flex items-center justify-center gap-7 px-5 sm:px-10  bg-sky-50 ">
      <NavLink
        to={'/add'}
        className="flex items-center px-8 py-3 h-10 w-30 rounded-lg text-lg font-semibold hover:bg-blue-600 transition border-2 border-black  justify-center"
      >
        <p>Add Items</p>
      </NavLink>
      <NavLink
        to={'/list'}
        className="flex items-center px-8 py-3 h-10 w-30 rounded-lg text-lg font-semibold hover:bg-blue-600 transition border-2 border-black  justify-center"
      >
        <p>List Items</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
