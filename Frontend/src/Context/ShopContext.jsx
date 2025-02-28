import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
  const currency = '₹'
  const delivery_fee = 10
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({})
  const navigate = useNavigate()

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Product Size')
      return
    }

    try {
      const backendURL = import.meta.env.VITE_BACKEND_HOST_URL
      const response = await axios.get(`${backendURL}/api/product/list`)

      if (response.data.success) {
        const product = response.data.data.find((item) => item._id === itemId)

        if (product) {
          let cartData = structuredClone(cartItems)

          if (!cartData[itemId]) {
            cartData[itemId] = { ...product, sizes: {} }
          }

          if (cartData[itemId].sizes[size]) {
            cartData[itemId].sizes[size] += 1
          } else {
            cartData[itemId].sizes[size] = 1
          }

          setCartItems(cartData)
        }
      }
    } catch (error) {
      console.error('Error fetching product details:', error)
    }
  }

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, item) =>
        total + Object.values(item.sizes).reduce((sum, qty) => sum + qty, 0),
      0
    )
  }

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)
    if (quantity > 0) {
      cartData[itemId].sizes[size] = quantity
    } else {
      delete cartData[itemId].sizes[size]
      if (Object.keys(cartData[itemId].sizes).length === 0) {
        delete cartData[itemId]
      }
    }
    setCartItems(cartData)
  }

  const getCartAmount = () => {
    return Object.values(cartItems).reduce(
      (total, item) =>
        total +
        item.price *
          Object.values(item.sizes).reduce((sum, qty) => sum + qty, 0),
      0
    )
  }

  const value = {
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  }

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  )
}

export default ShopContextProvider
