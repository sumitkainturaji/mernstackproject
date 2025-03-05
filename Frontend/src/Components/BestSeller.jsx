import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState([])

  useEffect(() => {
    const fetchBestSellerProducts = async () => {
      try {
        const backendURL = import.meta.env.VITE_BACKEND_HOST_URL

        const response = await axios.get(`${backendURL}/api/product/list`)

        if (response.data.success) {
          let products = response.data.data

          for (let i = products.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[products[i], products[j]] = [products[j], products[i]]
          }

          const updatedProducts = products.slice(0, 8).map((product) => ({
            ...product,
            image: Array.isArray(product.image)
              ? product.image.map((img) =>
                  img.startsWith('http') ? img : `${backendURL}/images/${img}`
                )
              : `${backendURL}/images/${product.image}`,
          }))

          console.log('Fetched Best Sellers:', updatedProducts)
          setBestSellerProducts(updatedProducts)
        } else {
          console.error('Failed to fetch products')
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchBestSellerProducts()
  }, [])

  return (
    <div className="my-10">
      {/* Title Section */}
      <div className="text-center py-8 text-3xl">
        <div className="text-center text-3xl pt-10 border-t font-bold">
          <Title text1={'BEST'} text2={'SELLERS'} />
        </div>
        <p className="w-3/4 m-auto text-base sm:text-sm md:text-base text-gray-900">
          Discover our top-rated products that customers love the most!
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {bestSellerProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={Array.isArray(item.image) ? item.image[0] : item.image}
            name={item.name}
            price={item.price}
            subCategory={item.subCategory}
          />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
