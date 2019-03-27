// import package
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {checkToken, authenticate, authorizing} = require('../middleware/auth')
// load model
const {User} = require('../models/users');
const router = express.Router()
// routes: /api/user/register
// desc:    Register a new user
// access:  PUBLIC
router.post('/register', (req, res) => {
  const {username, password, phone, usertype} = req.body
  User.find({username})
    .then(user => {
      if(user) {
        return res.status(400).json("User name exists")
      }
      const newUser = new User({
        username, password, phone, usertype
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash
          newUser.save()
          .then(user => res.status(200).json(user))
          .catch(console.log)
        })
      })
      
    })
    .catch()
})



router.get('/current-user', 
    
      checkToken, authenticate, authorizing("admin")
    ,    
    (req, res) => {
        
        // admin
        return res.status(200).json(req.user)
})



router.post('/signin', (req, res) => {
  const {username, password} = req.body;
  User.findOne({username: 'nctdung'})
    .then(user => {
      if(!user) {
          return res.status(404).json("user name don't match")
      }
      console.log('username: ' + user.password)
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(404).json("user name or password don't match")
          // === create jwt ===
            const payload = {
              id: user._id,
              usertype: user.usertype
            }
            jwt.sign(payload, 'abcxyz', {expiresIn: '1h'}, (err, token) => {
              res.status(200).json({
                  success: "Login successfully",
                  token: "Bearer " + token
              })
          })
        })
        .catch(console.log)
    })
    .catch(console.log)
})
module.exports = router