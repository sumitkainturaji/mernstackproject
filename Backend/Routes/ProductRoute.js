import express from 'express'
import {
  addProduct,
  removeProduct,
  listProduct,
} from '../Controllers/ProductControllers.js'
import multer from 'multer'

// Image storage system
const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`)
  },
})


const upload = multer({ storage: Storage })

const foodRouter = express.Router()


foodRouter.post('/add', upload.single('image'), addProduct)
foodRouter.get('/list', listProduct)
foodRouter.post('/remove', removeProduct)

export default foodRouter
