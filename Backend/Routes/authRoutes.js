

import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../Model/user.js'

dotenv.config() 

const router = express.Router()


const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) 
    req.user = decoded 
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Invalid or expired token' })
  }
}


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ msg: 'User already exists' })

    const salt = await bcrypt.genSalt(12) 
    const hashedPassword = await bcrypt.hash(password, salt)

    user = new User({ name, email, password: hashedPassword })
    await user.save()

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    })
    res.status(201).json({ token, user: { id: user.id, name, email } })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Internal server error' })
  }
})


router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'Invalid email or password' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ msg: 'Invalid email or password' })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    })
    res.json({ token, user: { id: user.id, name: user.name, email } })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Internal server error' })
  }
})

// Protected Profile Route
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ msg: 'User not found' })
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Internal server error' })
  }
})

export default router
