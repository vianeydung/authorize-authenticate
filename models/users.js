const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  phone: {type: Number, required: true},
  usertype: {type: String, default: "admin"},
})

const Users = mongoose.model('Users', UsersSchema)

module.exports = {Users, UsersSchema}