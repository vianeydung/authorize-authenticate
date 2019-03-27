const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  phone: {type: Number, required: true},
  usertype: {type: String, default: "admin"},
})

const User = mongoose.model('User', UserSchema)

module.exports = {User, UserSchema}