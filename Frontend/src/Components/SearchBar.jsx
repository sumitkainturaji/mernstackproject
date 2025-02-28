import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'
const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext)
  const [visible, setVissible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVissible(true)
    } else {
      setVissible(false)
    }
  }, [location])

  return showSearch && visible ? (
    <div className=" text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-2 py-1 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none text-sm"
          type="text"
          placeholder="Search"
        />
        <img src={assets.search_icon} className="w-4" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        className="inline w-3  cursor-pointer"
      />
    </div>
  ) : null
}

export default SearchBar
