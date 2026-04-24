const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express() //server ko banane kea lea hai ye

// Middleware
app.use(cors()) //react ko server se baat karne ke lea
app.use(express.json()) //User ka bheja hua data (JSON) samajh payega server

// Test route
app.get('/', (req, res) => {
  res.send('server is running!')//browser me local host open karne kea lea
})

// Auth routes
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

const productRoutes = require('./routes/productRoutes')
app.use('/api/products', productRoutes)

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!')
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => console.log(err))