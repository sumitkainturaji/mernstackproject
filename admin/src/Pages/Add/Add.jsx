import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ url }) => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'shirt',
    subCategory: '',
    sizes: '28',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('price', Number(data.price))
      formData.append('category', data.category)
      formData.append('subCategory', data.subCategory)
      formData.append('sizes', data.sizes)
      formData.append('image', image)

      const response = await axios.post(`${url}/api/product/add`, formData)

      if (response.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          category: 'shirt',
          subCategory: '',
          sizes: '',
        })
        toast.success(response.data.message)
        setImage(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      )
      toast.error('Something went wrong. Check console for details.')
    }
  }

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here..."
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
            >
              <option value="Shrit">Shrit</option>
              <option value="T-Shirt">T-Shirt</option>
              <option value="Jeans">Jeans</option>
              <option value="Trouser">Trouser</option>
              <option value="Top">Top</option>
              <option value="Skirts">Skirts</option>
              <option value="Hoddie">Hoddie</option>
            </select>
          </div>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Sizes</p>
            <select onChange={onChangeHandler} value={data.sizes} name="sizes">
              <option value="28">28</option>
              <option value="30">30</option>
              <option value="32">32</option>
              <option value="34">34</option>
              <option value="36">36</option>
              <option value="38">38</option>
              <option value="40">40</option>
              <option value="42">42</option>
            </select>
          </div>
        </div>

        <div className="add-product-description flex-col p-5">
          <p>Product Subcategory</p>
          <input
            onChange={onChangeHandler}
            value={data.subCategory}
            type="text"
            name="subCategory"
            placeholder="Enter subcategory..."
          />
          <div className="add-price flex-col p-5">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="₹399"
            />
          </div>
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here..."
            required
          ></textarea>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  )
}

export default Add
