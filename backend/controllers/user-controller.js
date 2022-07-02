import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import User from '../models/User.js';

dotenv.config();

// CREATE user for registration
const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({ message: 'All fields are required.' });

  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPwd,
    });

    res.status(201).json({ Success: 'Successfully created Doowit account.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//User authentication
const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.sendStatus(400).json({ message: 'All fields are required.' });
  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  const matchPwd = await bcrypt.compare(password, foundUser.password);
  if (matchPwd) {
    const accessToken = jwt.sign(
      { 'email': foundUser.email },
      '' + process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      '' + process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 168 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

const UserController = {
  signup,
  authenticateUser,
};

export default UserController;
