import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import deleteimg from '../../assets/delete.svg'

const List = ({ url }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error('Error fetching list')
      }
    } catch (error) {
      toast.error('Server error')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeFood = async (FoodID) => {
    try {
      const response = await axios.post(`${url}/api/product/remove`, {
        id: FoodID,
      })
      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      } else {
        toast.error('Error removing item')
      }
    } catch (error) {
      toast.error('Server error')
    }
  }

  return (
    <div className="w-[90vw] h-full overflow-hidden relative top-[20vh] left-1/2 transform -translate-x-1/2 justify-center z-10">
      <p className="text-2xl font-semibold mb-4 text-center ">
        All Products List
      </p>

      {/* Table Container */}
      <div className="border border-gray-300 rounded-lg overflow-x-auto mt-3.5">
        {/* Header (Hidden in Mobile) */}
        <div className="hidden lg:grid grid-cols-7 bg-gray-800 text-white p-4 font-semibold text-center">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>SubCategory</b>
          <b>Price</b>
          <b>Sizes</b>
          <b>Action</b>
        </div>

        {/* List Items */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 lg:grid-cols-7 items-center border-b text-center gap-4"
          >
            <img
              src={`${url}/images/` + item.image}
              alt=""
              className="w-16 h-16 object-cover rounded-lg mx-auto"
            />

            {/* Mobile View */}
            <div className="text-left lg:hidden">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-gray-500">{item.category}</p>
              <p className="text-xs text-gray-500">₹{item.price}</p>
              <p className="text-xs text-gray-500 break-words">
                <span className="font-semibold">Sizes: </span>
                {item.sizes}
              </p>
            </div>

            {/* Desktop View */}
            <p className="hidden lg:block">{item.name}</p>
            <p className="hidden lg:block">{item.category}</p>
            <p className="hidden lg:block">{item.subCategory}</p>
            <p className="hidden lg:block">₹{item.price}</p>
            <p className="hidden lg:block break-words">{item.sizes}</p>

            <p onClick={() => removeFood(item._id)} className="cursor-pointer">
              <img src={deleteimg} alt="Delete" className="w-6 h-6 " />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
