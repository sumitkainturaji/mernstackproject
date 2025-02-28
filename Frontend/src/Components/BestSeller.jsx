import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import axios from 'axios'
import ProductItem from './ProductItem'
const BestSeller = () => {
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const backendURL = import.meta.env.VITE_BACKEND_HOST_URL

        const response = await axios.get(`${backendURL}/api/product/list`)

        if (response.data.success) {
          const updatedProducts = response.data.data
            .slice(10, 15)
            .map((product) => ({
              ...product,
              image: Array.isArray(product.image)
                ? product.image.map((img) =>
                    img.startsWith('http') ? img : `${backendURL}/images/${img}`
                  )
                : `${backendURL}/images/${product.image}`,
            }))

          console.log('Fetched Products:', updatedProducts)
          setLatestProducts(updatedProducts)
        } else {
          console.error('Failed to fetch products')
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchLatestProducts()
  }, [])

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Our hottest bestsellers that everyone’s obsessing over – grab yours
          before they’re gone!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
