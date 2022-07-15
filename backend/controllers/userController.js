import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import User from '../models/User.js';

dotenv.config();

// const maxAge = 168 * 60 * 60;

// CREATE user for registration
const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({ message: 'All fields are required.' });

  const duplicate = await User.findOne({ email: email });
  if (duplicate) return res.sendStatus(409);

    const hashedPwd = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPwd,
    });

    // const accessToken = jwt.sign(
    //   { 'user': user._id },
    //   '' + process.env.ACCESS_TOKEN_SECRET,
    //   { expiresIn: '7d' }
    // );

    // res.cookie('jwt', accessToken, {
    //   maxAge:  maxAge * 1000,
    // });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.sendStatus(400);
    }

   
};

//User authentication or LOGIN
const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.sendStatus(400).json({ message: 'All fields are required.' });

  const foundUser = await User.findOne({ email: email });
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  const matchPwd = await bcrypt.compare(password, foundUser.password);
  if (matchPwd) {
    // const accessToken = jwt.sign(
    //   { 'user': foundUser._id },
    //   '' + process.env.ACCESS_TOKEN_SECRET,
    //   { expiresIn: '7d' }
    // );

    // res.cookie('jwt', accessToken, {
    //   maxAge:  maxAge * 1000,
    //   sameSite: 'none',
    // });

    res
      .status(200)
      .json({
        _id: foundUser._id,
        email: foundUser.email,
        token: generateToken(foundUser._id),
      });
  } else {
    res.sendStatus(401);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, '' + process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
};

const UserController = {
  signup,
  authenticateUser,
};

export default UserController;
