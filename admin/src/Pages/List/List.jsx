// import React, { useEffect, useState } from 'react'
// import './List.css'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import deleteimg from '../../assets/delete.svg'

// const List = ({ url }) => {
//   const [list, setList] = useState([])

//   const fetchList = async () => {
//     const response = await axios.get(`${url}/api/product/list`)

//     if (response.data.success) {
//       setList(response.data.data)
//     } else {
//       toast.error('Error')
//     }
//   }

//   useEffect(() => {
//     fetchList()
//   }, [])

//   const removeFood = async (FoodID) => {
//     console.log(FoodID)

//     const response = await axios.post(`${url}/api/product/remove`, {
//       id: FoodID,
//     })

//     await fetchList()
//     if (response.data.success) {
//       toast.success(response.data.message)
//     } else {
//       toast.error('Error')
//     }
//   }

//   return (
//     <div className="list add flex-col">
//       <p> All Products List </p>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b></b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>SubCategory</b>
//           <b>Price</b>
//           <b>Sizes</b>
//           <b>Action</b>
//         </div>
//         {list.map((item, index) => {
//           return (
//             <div key={index} className="list-table-format">
//               <img src={`${url}/images/` + item.image} alt="" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>{item.subCategory}</p>
//               <p>₹{item.price}</p>
//               <p>{item.sizes}</p>
//               <p onClick={() => removeFood(item._id)} className="cursor">
//                 <img src={deleteimg} alt="" id="my_delete_bin" />
//               </p>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default List

import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import deleteimg from '../../assets/delete.svg'

const List = ({ url }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error('Error fetching products')
      }
    } catch (error) {
      toast.error('Failed to fetch products')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(`${url}/api/product/remove`, {
        id: productId,
      })
      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      } else {
        toast.error('Error removing product')
      }
    } catch (error) {
      toast.error('Failed to remove product')
    }
  }

  return (
    <div className="list add flex-col">
      <p> All Products List </p>
      <div className="list-table">
        <div className="list-table-format title">
          <b></b>
          <b>Name</b>
          <b>Category</b>
          <b>SubCategory</b>
          <b>Price</b>
          <b>Sizes</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.subCategory}</p>
            <p>₹{item.price}</p>
            <p>{item.sizes}</p>
            <p onClick={() => removeProduct(item._id)} className="cursor">
              <img src={deleteimg} alt="Delete" id="my_delete_bin" />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
