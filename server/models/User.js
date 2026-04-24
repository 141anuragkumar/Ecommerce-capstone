// ye user ka data store karne kea lea hai, jaise naam, email, password. Ye data MongoDB me store hoga. kea kea mandatory fields hain
// Jaise school ka admission form hota hai — naam, email, password fields mandatory hain, bina inke form submit nahi hoga

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)