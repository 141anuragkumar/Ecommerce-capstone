const express = require('express')
const router = express.Router()
const { signup, login } = require('../controllers/authController')
const verifyToken = require('../middleware/authMiddleware') // apna middleware import kar

router.post('/signup', signup)
router.post('/login', login)

// Ye add kar
router.get('/profile', verifyToken, (req, res) => {
  res.json({ success: true, user: req.user })
})

module.exports = router