
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    const fetchLatestProducts = async () => {
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
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <div />
        <p className="w-3/4 m-auto text-base sm:text-sm md:text-base text-gray-900">
          Stay ahead of the trend with our newest collection—fresh, stylish, and
          made just for you!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {latestProducts.map((item, index) => (
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

export default LatestCollection
