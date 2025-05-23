import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ url }) => {
  const [image, setImage] = useState(null)
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Shirt',
    subCategory: '',
    sizes: [],
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    if (name === 'sizes') {
      setData((prevData) => ({
        ...prevData,
        sizes: prevData.sizes.includes(value)
          ? prevData.sizes.filter((size) => size !== value)
          : [...prevData.sizes, value],
      }))
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('price', Number(data.price))
      formData.append('category', data.category)
      formData.append('subCategory', data.subCategory)
      formData.append('sizes', JSON.stringify(data.sizes))
      formData.append('image', image)

      const response = await axios.post(`${url}/api/product/add`, formData)

      if (response.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Shirt',
          subCategory: '',
          sizes: [],
        })
        toast.success(response.data.message)
        setImage(null)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      )
      toast.error('Something went wrong.')
    }
  }

  return (
    <div className="w-[90vw] h-full overflow-hidden relative top-[20vh] left-1/2 transform -translate-x-1/2 justify-center z-10">
      <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
        <div className="flex flex-col items-center gap-2">
          <p className="font-semibold">Upload Image</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload"
              className="w-24 h-24 object-cover border rounded-lg"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div>
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Type here..."
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="flex flex-wrap gap-5">
          <div>
            <p>Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="w-full p-2 border rounded-lg"
            >
              {[
                'Shirt',
                'T-Shirt',
                'Jeans',
                'Trouser',
                'Top',
                'Skirts',
                'Hoodie',
                'Jacket',
                'Pants',
                'Sweater',
                'Shorts',
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p>Product Sizes</p>
            <div className="flex gap-2">
              {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
                <label key={size} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="sizes"
                    value={size}
                    checked={data.sizes.includes(size)}
                    onChange={onChangeHandler}
                    className="mr-2"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p>Subcategory</p>
          <input
            type="text"
            name="subCategory"
            value={data.subCategory}
            onChange={onChangeHandler}
            placeholder="Enter subcategory..."
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <p>Price</p>
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={onChangeHandler}
            placeholder="₹399"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <p>Description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows="4"
            placeholder="Write content here..."
            className="w-full p-2 border rounded-lg"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default Add

// import React, { useEffect, useState } from 'react'
// import { assets } from '../../assets/assets'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const Add = ({ url }) => {
//   const [image, setImage] = useState(null)
//   const [data, setData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: 'Shirt',
//     subCategory: '',
//     sizes: [],
//   })

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target
//     if (name === 'sizes') {
//       setData((prevData) => ({
//         ...prevData,
//         sizes: prevData.sizes.includes(value)
//           ? prevData.sizes.filter((size) => size !== value)
//           : [...prevData.sizes, value],
//       }))
//     } else {
//       setData((prevData) => ({ ...prevData, [name]: value }))
//     }
//   }

//   const onSubmitHandler = async (event) => {
//     event.preventDefault()
//     try {
//       const formData = new FormData()
//       formData.append('name', data.name)
//       formData.append('description', data.description)
//       formData.append('price', Number(data.price))
//       formData.append('category', data.category)
//       formData.append('subCategory', data.subCategory)
//       formData.append('sizes', JSON.stringify(data.sizes))
//       formData.append('image', image)

//       const response = await axios.post(`${url}/api/product/add`, formData)

//       if (response.data.success) {
//         setData({
//           name: '',
//           description: '',
//           price: '',
//           category: 'Shirt',
//           subCategory: '',
//           sizes: [],
//         })
//         toast.success(response.data.message)
//         setImage(null)
//       } else {
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       console.error(
//         'Error:',
//         error.response ? error.response.data : error.message
//       )
//       toast.error('Something went wrong.')
//     }
//   }

//   return (
//     <div className="w-[90vw] h-full overflow-hidden relative top-[20vh] left-1/2 transform -translate-x-1/2 justify-center z-10">
//       <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
//         <div className="flex flex-col items-center gap-2">
//           <p className="font-semibold">Upload Image</p>
//           <label htmlFor="image" className="cursor-pointer">
//             <img
//               src={image ? URL.createObjectURL(image) : assets.upload_area}
//               alt="Upload"
//               className="w-24 h-24 object-cover border-2 rounded-lg"
//             />
//           </label>
//           <input
//             type="file"
//             id="image"
//             hidden
//             required
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </div>

//         <div>
//           <p>Product Name</p>
//           <input
//             type="text"
//             name="name"
//             value={data.name}
//             onChange={onChangeHandler}
//             placeholder="Type here..."
//             className="w-full p-3 border rounded-s  "
//           />
//         </div>

//         <div className="flex flex-wrap gap-5">
//           <div>
//             <p>Category</p>
//             <select
//               name="category"
//               value={data.category}
//               onChange={onChangeHandler}
//               className="w-full p-2 border rounded-s"
//             >
//               {[
//                 'Shirt',
//                 'T-Shirt',
//                 'Jeans',
//                 'Trouser',
//                 'Top',
//                 'Skirts',
//                 'Hoodie',
//                 'Jacket',
//                 'Pants',
//                 'Sweater',
//                 'Shorts',
//               ].map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <p>Product Sizes</p>
//             <div className="flex gap-2">
//               {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
//                 <label key={size} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     name="sizes"
//                     value={size}
//                     checked={data.sizes.includes(size)}
//                     onChange={onChangeHandler}
//                     className="mr-2"
//                   />
//                   {size}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div>
//           <p>Subcategory</p>
//           <input
//             type="text"
//             name="subCategory"
//             value={data.subCategory}
//             onChange={onChangeHandler}
//             placeholder="Enter subcategory..."
//             className="w-full p-2 border rounded-s"
//           />
//         </div>

//         <div>
//           <p>Price</p>
//           <input
//             type="number"
//             name="price"
//             value={data.price}
//             onChange={onChangeHandler}
//             placeholder="₹"
//             className="w-full p-2 border rounded-s"
//           />
//         </div>

//         <div>
//           <p>Description</p>
//           <textarea
//             name="description"
//             value={data.description}
//             onChange={onChangeHandler}
//             rows="4"
//             placeholder="Write content here..."
//             className="w-full p-2 border rounded-s"
//             required
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800"
//         >
//           Add Product
//         </button>
//       </form>
//     </div>
//   )
// }

// export default Add
