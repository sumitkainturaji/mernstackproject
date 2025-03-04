// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import Title from '../Components/Title'
// import CartTotal from '../Components/CartTotal'

// const Cart = () => {
//   const { currency, cartItems, updateQuantity, navigate } =
//     useContext(ShopContext)
//   const [cartData, setCartData] = useState([])

//   useEffect(() => {
//     setCartData(Object.values(cartItems))
//   }, [cartItems])

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <Title text1={'YOUR'} text2={'CART'} />
//       {cartData.length > 0 ? (
//         <div className="grid gap-6">
//           {cartData.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between xrounded-lg shadow-md bg-white"
//             >
//               {/* <h1>{item.image}</h1> */}
//               {/* <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-24 h-24 object-cover rounded-md"
//               /> */}

//               <div className="flex flex-col flex-1 px-4">
//                 <p className="text-lg font-semibold">{item.name}</p>
//                 <p className="text-gray-600">
//                   {currency}
//                   {item.price}
//                 </p>
//                 {Object.entries(item.sizes).map(([size, quantity]) => (
//                   <div key={size} className="mt-2 flex items-center">
//                     <p className="mr-2 font-medium">Size: {size}</p>
//                     <input
//                       type="number"
//                       min={1}
//                       defaultValue={quantity}
//                       onChange={(e) =>
//                         updateQuantity(item._id, size, Number(e.target.value))
//                       }
//                       className="w-16 px-2 py-1 border rounded-md text-center"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-8">Your cart is empty</p>
//       )}
//       <CartTotal />
//       <div className="text-center mt-6">
//         <button
//           onClick={() => navigate('/place-order')}
//           className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
//         >
//           PROCEED TO PAY
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Cart

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { Trash2 } from 'lucide-react'
import { assets } from '../assets/frontend_assets/assets'

const Cart = () => {
  const { currency, cartItems, updateQuantity, removeFromCart, navigate } =
    useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    setCartData(Object.values(cartItems))
  }, [cartItems])

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-xl">
        <Title text1={'YOUR'} text2={'CART'} />{' '}
      </h1>

      {cartData.length > 0 ? (
        <div className="grid gap-6">
          {cartData.map((item, index) => {
            const imageUrl = item.image
              ? item.image.startsWith('http')
                ? item.image
                : `${import.meta.env.VITE_BACKEND_HOST_URL}/${item.image}`
              : assets.contact_img

            console.log('Image URL:', imageUrl)

            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between rounded-lg shadow-md bg-white p-4"
              >
                {/* {imageUrl && (
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )} */}

                {/* Product Details */}
                <div className="flex flex-col flex-1 px-6 text-center sm:text-left">
                  <p className="text-xl font-bold">{item.name}</p>
                  <p className="text-gray-500 text-md">
                    Category: {item.category}
                  </p>
                  <p className="text-gray-600 text-lg">
                    {currency}
                    {item.price}
                  </p>

                  {/* Size & Quantity */}
                  {Object.entries(item.sizes).map(([size, quantity]) => (
                    <div
                      key={size}
                      className="mt-2 flex justify-center sm:justify-start items-center"
                    >
                      <p className="mr-2 font-medium text-lg">Size: {size}</p>
                      <input
                        type="number"
                        min={1}
                        defaultValue={quantity}
                        onChange={(e) =>
                          updateQuantity(item._id, size, Number(e.target.value))
                        }
                        className="w-20 px-3 py-2 border rounded-md text-center text-lg"
                      />
                    </div>
                  ))}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 transition duration-300 p-2"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            )
          })}

          {/* Cart Total */}
          <CartTotal />

          {/* Proceed to Pay Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition text-base"
            >
              PROCEED TO PAY
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8">
          <p className="text-gray-600 text-lg">Your cart is empty</p>
          <img
            src={assets.shop_cart}
            alt="Empty Cart"
            className="mx-auto w-[30vw] filter brightness-110 contrast-125 mix-blend-multiply"
          />
          <button
            onClick={() => navigate('/')}
            className="bg-black text-white px-8 py-3 rounded-md mt-4 hover:bg-gray-800 transition"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
