

import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, subCategory }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link
      className="text-gray-700 cursor-pointer block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
      to={`/product/${id}`}
    >
      
      <div className="w-full h-56 sm:h-64 flex items-center justify-center overflow-hidden">
        <img
          className="h-full w-4/5 object-cover rounded-md transition duration-300 ease-in-out hover:brightness-90 hover:contrast-90"
          src={image}
          alt={name}
        />
      </div>

      <p className="pt-3 pb-1 text-sm sm:text-base font-semibold text-center">
        {name}
      </p>
      <p className="text-sm sm:text-base text-center text-gray-800">
        {currency}
        {price}
      </p>
      <p className="text-xs sm:text-sm text-center text-gray-600">
        {subCategory}
      </p>
    </Link>
  )
}

export default ProductItem
