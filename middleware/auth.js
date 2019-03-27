const jwt = require('jsonwebtoken')
const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {

      const bearer = header.split(' ');
      if(bearer[0] !== 'Bearer')
        return res.status(403).json({error: "Forbidden 1"})
      const token = bearer[1];

      req.token = token;

      next();
  } else {
      //If header is undefined return Forbidden (403)
      return res.status(403).json({error: "Forbidden 2"})
  }
}
function authorizing(userType){
  return (req, res, next) => {
      if(req.user.usertype === userType) return next()
      return res.status(400).json({error: "Not authorization"})
  }
}
const authenticate = (req, res, next) => {
  console.log("token: " + req.token)
  jwt.verify(req.token, 'abcxyz', (err, payload) => {
    if(err){
      return res.status(403).json({error: "Forbidden 3"})
    } else {
        req.user = payload
        next()
    }
  })
}
module.exports = {checkToken, authorizing, authenticate}