import express from 'express'
import cors from 'cors'
import { connectDB } from './Config/DB.js'
import ProductRoute from './Routes/ProductRoute.js'
import path from 'path'
import payment from './Routes/payment.js'
import authRoutes from './Routes/authRoutes.js'

// App Config
const app = express()
const port = 2000

// Middleware
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')))

// DB Connection
connectDB()

// API Endpoints
app.use('/api/product', ProductRoute)
app.use('/api/payment', payment)
app.use('/api/auth', authRoutes) // Add authentication routes
app.use('/images', express.static('uploads'))

// Root Endpoint
app.get('/', (req, res) => {
  res.send('API Working Sumit')
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
