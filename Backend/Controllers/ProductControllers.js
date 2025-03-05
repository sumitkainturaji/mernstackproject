import ProductModel from '../Model/ProductModel.js'
import fs from 'fs'

const addProduct = async (req, res) => {
  const image_filename = req.file ? req.file.filename : 'default.jpg'

  const Product = new ProductModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    subCategory: req.body.subCategory,
    sizes: req.body.sizes,
    image: image_filename,
  })

  try {
    await Product.save()
    res.json({ success: true, message: 'product Added' })
  } catch (error) {
    console.error('Error in Product Add:', error)
    res.status(500).json({ success: false, message: 'Error Adding Product' })
  }
}

const listProduct = async (req, res) => {
  try {
    const product = await ProductModel.find({})
    res.json({ success: true, data: product })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error' })
  }
}

const removeProduct = async (req, res) => {
  try {
    console.log('Received request to delete:', req.body.id) 

   
    const food = await ProductModel.findById(req.body.id)
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' })
    }

    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.error('Error deleting image:', err)
      }
    })

    await ProductModel.findByIdAndDelete(req.body.id)

    res.json({ success: true, message: 'Food removed successfully' })
  } catch (error) {
    console.error('Error in removeProduct:', error)
    res.status(500).json({ success: false, message: 'Error removing product' })
  }
}

export { addProduct, listProduct, removeProduct }
