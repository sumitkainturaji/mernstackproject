import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'

const Cart = () => {
  const { currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    setCartData(Object.values(cartItems))
  }, [cartItems])

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Title text1={'YOUR'} text2={'CART'} />
      {cartData.length > 0 ? (
        <div className="grid gap-6">
          {cartData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between xrounded-lg shadow-md bg-white"
            >
              {/* <h1>{item.image}</h1> */}
              {/* <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              /> */}

              <div className="flex flex-col flex-1 px-4">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-600">
                  {currency}
                  {item.price}
                </p>
                {Object.entries(item.sizes).map(([size, quantity]) => (
                  <div key={size} className="mt-2 flex items-center">
                    <p className="mr-2 font-medium">Size: {size}</p>
                    <input
                      type="number"
                      min={1}
                      defaultValue={quantity}
                      onChange={(e) =>
                        updateQuantity(item._id, size, Number(e.target.value))
                      }
                      className="w-16 px-2 py-1 border rounded-md text-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">Your cart is empty</p>
      )}
      <CartTotal />
      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/place-order')}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          PROCEED TO PAY
        </button>
      </div>
    </div>
  )
}

export default Cart
