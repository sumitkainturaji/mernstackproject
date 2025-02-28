import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../Model/user.js'

const router = express.Router()

// Register User
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ msg: 'User already exists' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = new User({ name, email, password: hashedPassword })
    await user.save()

    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' })
    res.status(201).json({ token, user: { id: user.id, name, email } })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' })
    res.json({ token, user: { id: user.id, name: user.name, email } })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

export default router
