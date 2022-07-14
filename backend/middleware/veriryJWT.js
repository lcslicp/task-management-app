import jwt from 'jsonwebtoken';
import User from '../models/User';

const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) res.json({ status: true, user: user._id});
        else res.json({ status: false });
        next();
      } 
    })
  } else {
    res.json({ status: false });
    next();
};
}

export default verifyJWT;
