import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductItem from './ProductItem'
import Title from './Title'

const RelatedProducts = ({ category }) => {
  const [related, setRelated] = useState([])

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const backendURL = import.meta.env.VITE_BACKEND_HOST_URL
        const response = await axios.get(`${backendURL}/api/product/list`)

        if (response.data.success) {
          const filteredProducts = response.data.data
            .filter((item) => item.category === category)
            .slice(0, 5)
            .map((product) => ({
              ...product,
              image: Array.isArray(product.image)
                ? product.image.map((img) =>
                    img.startsWith('http') ? img : `${backendURL}/images/${img}`
                  )
                : `${backendURL}/images/${product.image}`,
            }))

          setRelated(filteredProducts)
        }
      } catch (error) {
        console.error('Error fetching related products:', error)
      }
    }

    if (category) {
      fetchRelatedProducts()
    }
  }, [category])

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      {related.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {related.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No related products found.</p>
      )}
    </div>
  )
}

export default RelatedProducts
