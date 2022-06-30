import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

dotenv.config();

// CREATE user for registration
const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne( { email: email });

    if(userExists) {
      throw 'User already exists.'
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });
  
    await user.save();

    res.status(201).json('Account created successfully.');
  } catch (error) {
    res.status(400).json({
      error: 'Something went wrong on sign up.',
      message: error.message,
    });
  }
};

//User authentication
const authenticateUser = async (req, res) => {
  const {  email, password } = req.body;

  
  try {
    const user = await User.findOne( { email: email });

    if (user === null) {
      return res.status(400).json({
        error: 'User does not exist.',
      })
    }

    if (password !== user.password) {
      return res.status(400).json({
        error: 'Invalid email/password.',
      })
    }

    const accesstoken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.json( { acessToken: accesstoken, refreshToken: refreshToken })

    const generateAccessToken= (user) => {
      return jwt.sign(user , process.env.ACESS_TOKEN_SECRET, { expiresIn: '2d'})
    }

    const authenticateToken = (req, res, next) => {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
      if (token == null) return res.sendStatus(401)

      jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.sendStatus(403)
        req.user = user
        next()
      })
    }


    res.status(201).json({
      message: 'You are now logged in.',
    token,
  });
  } catch (error) {
    res.status(400).json({
      error: 'Something went wrong on login, please try again.',
      message: error.message,
    });
  }
};

const UserController = {
  signup,
  authenticateUser,

};

export default UserController;


//continue: https://www.youtube.com/watch?v=mbsmsi7l3r4&t=879s , 10-min mark