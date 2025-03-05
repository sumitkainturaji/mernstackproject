

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProducts from '../Components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [reviews, setReviews] = useState(0)
  const [stars, setStars] = useState(0)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const backendURL = import.meta.env.VITE_BACKEND_HOST_URL
        const response = await axios.get(`${backendURL}/api/product/list`)

        if (response.data.success) {
          const product = response.data.data.find(
            (item) => item._id === productId
          )
          if (product) {
            setProductData({
              ...product,
              image: Array.isArray(product.image)
                ? product.image.map((img) =>
                    img.startsWith('http') ? img : `${backendURL}/images/${img}`
                  )
                : [`${backendURL}/images/${product.image}`],
              sizes: product.sizes
                .replace(/[\[\]'""]/g, '')
                .split(',')
                .map((size) => size.trim()), 
            })
            setImage(product.image[0])
            setReviews(Math.floor(Math.random() * 200) + 50) 
            setStars(Math.floor(Math.random() * 5) + 1) 
          }
        }
      } catch (error) {
        console.error('Error fetching product details:', error)
      }
    }

    fetchProductData()
  }, [productId])

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            {productData.image.map((item, index) => (
              <img className="w-full h-auto" src={item} key={index} />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(stars)].map((_, index) => (
              <img
                src={assets.star_icon}
                alt=""
                className="w-3.5"
                key={index}
              />
            ))}
            {[...Array(5 - stars)].map((_, index) => (
              <img
                src={assets.star_dull_icon}
                alt=""
                className="w-3.5"
                key={index}
              />
            ))}
            <p className="pl-2">{reviews}</p>
          </div>
          <p className="mt-5 text-3xl font-medium ">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? 'border-purple-500' : ''
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews {reviews}</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
        </div>
      </div>
      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  )
}

export default Product
