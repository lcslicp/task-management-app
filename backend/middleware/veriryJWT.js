import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyJWT = async (req, res, next) => {
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
     token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, '' + process.env.ACCESS_TOKEN_SECRET)

      req.user = await User.findById(decoded.id)

      next()
    } catch (error) {
      console.log(error)
      res.sendStatus(401)
    }
  }
  if(!token) {
    res.sendStatus(401)
  }
}

export default verifyJWT;
