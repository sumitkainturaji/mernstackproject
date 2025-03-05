

import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const currency = '₹'
  const delivery_fee = 10
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('cartItems')) || {}
  })
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

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
          setCartItems((prevCart) => {
            const updatedCart = { ...prevCart }
            if (!updatedCart[itemId]) {
              updatedCart[itemId] = { ...product, sizes: {} }
            }
            updatedCart[itemId].sizes[size] =
              (updatedCart[itemId].sizes[size] || 0) + 1
            return updatedCart
          })
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
    setCartItems((prevCart) => {
      const updatedCart = { ...prevCart }
      if (quantity > 0) {
        updatedCart[itemId].sizes[size] = quantity
      } else {
        delete updatedCart[itemId].sizes[size]
        if (Object.keys(updatedCart[itemId].sizes).length === 0) {
          delete updatedCart[itemId]
        }
      }
      return updatedCart
    })
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

  const removeFromCart = (itemId) => {
    setCartItems((prevCart) => {
      const updatedCart = { ...prevCart }
      delete updatedCart[itemId]
      return updatedCart
    })
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
    removeFromCart,
    navigate,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export default ShopContextProvider
