import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: String, required: true },
  image: { type: String, required: true },
})


const ProductModel =
  mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default ProductModel
