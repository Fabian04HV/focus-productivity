const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
  const secret = process.env.SECRET
  const options = {
    expiresIn: '1h',
  }

  const token = jwt.sign(payload, secret, options)
  return token
}

const validateToken = (req, res, next) =>{
  const authHeader = req.headers.authorization

  if(authHeader){
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if(err){
        return res.status(403).json({ message: 'Invalid Token' })
      }
      else{
        req.user = payload 
        next()
      }
    })
  }
  else{
    res.status(401).json({ message: 'Token is not provided' })
  }
}

module.exports = {
  generateToken,
  validateToken
}