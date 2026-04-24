const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check karo user pehle se hai kya
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered!' })
    }

    // Password encrypt karo
    const hashedPassword = await bcrypt.hash(password, 10)

    // User banao
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    // Token banao
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // User dhundo
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Email not found!' })
    }

    // Password check karo
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password!' })
    }
    // authController.js mein profile function
    const getProfile = async (req, res) => {
      const user = await User.findById(req.user.id).select('-password')
      res.json({ success: true, user })
    }

    // Token banao
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { signup, login }