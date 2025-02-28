import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../Components/Title'
import ProductItem from '../Components/ProductItem'
import { ShopContext } from '../Context/ShopContext'

const Collection = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [sortType, setSortType] = useState('relevant')
  const [showFilter, setShowFilter] = useState(false)
  const { search } = useContext(ShopContext)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendURL = import.meta.env.VITE_BACKEND_HOST_URL
        const response = await axios.get(`${backendURL}/api/product/list`)
        if (response.data.success) {
          const updatedProducts = response.data.data.map((product) => ({
            ...product,
            image: Array.isArray(product.image)
              ? product.image.map((img) =>
                  img.startsWith('http') ? img : `${backendURL}/images/${img}`
                )
              : `${backendURL}/images/${product.image}`,
          }))
          setProducts(updatedProducts)
          setFilteredProducts(updatedProducts)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]
    if (categories.length > 0) {
      filtered = filtered.filter((item) => categories.includes(item.category))
    }
    if (subCategories.length > 0) {
      filtered = filtered.filter((item) =>
        subCategories.includes(item.subCategory)
      )
    }
    if (search.trim()) {
      const lowerSearch = search.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearch) ||
          item.category.toLowerCase().includes(lowerSearch) ||
          (item.subCategory &&
            item.subCategory.toLowerCase().includes(lowerSearch))
      )
    }
    setFilteredProducts(filtered)
  }, [categories, subCategories, search, products])

  useEffect(() => {
    let sorted = [...filteredProducts]
    if (sortType === 'low-high') {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortType === 'high-low') {
      sorted.sort((a, b) => b.price - a.price)
    }
    setFilteredProducts(sorted)
  }, [sortType])

  const toggleCategory = (e) => {
    const value = e.target.value
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((cat) => cat !== value)
        : [...prev, value]
    )
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategories((prev) =>
      prev.includes(value)
        ? prev.filter((sub) => sub !== value)
        : [...prev, value]
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTER
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Hoddie', 'Jeans', 'Trouser', 'Top', 'T-Shirt'].map((cat) => (
              <label key={cat} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                />{' '}
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection
