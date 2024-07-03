import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import 'path';

import User from '../models/User.js';

dotenv.config();

const maxAge = 168 * 60 * 60;

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

  if (req.file) {
    user.userImage = req.file.path;
  } else {
    user.userImage = 'public/default.svg';
  }

  const accessToken = jwt.sign(
    { user: user._id },
    '' + process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('jwt', accessToken, {
    maxAge: maxAge * 1000,
    httpOnly: true,
  });

  user.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userImage: user.userImage,
      token: accessToken,
    });
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
  if (!foundUser) return res.sendStatus(404);

  const matchPwd = bcrypt.compare(password, foundUser.password);
  if (matchPwd) {
    const accessToken = jwt.sign(
      { user: foundUser._id },
      '' + process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('jwt', accessToken, {
      maxAge: maxAge * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      _id: foundUser._id,
      email: foundUser.email,
      token: accessToken,
    });
  } else {
    res.sendStatus(401);
  }
};

//GET User
const reqUser = async (req, res) => {
  const id = req.params['id'];
  if (!id) return res.sendStatus(404);

  try {
    const user = await User.findOne({ _id: id });
    res.json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userImage: user.userImage,
      password: user.password,
    });
  } catch (error) {
    console.error;
  }
};

const createDemoUser = async (req, res) => {

  const demoEmail = `demo${Math.random().toString(36).substr(2,9)}@email.com`

  const demoUser = {
    firstName: 'Demo',
    lastName: 'User',
    email: demoEmail,
    password: 'demo',
  }

  const duplicate = await User.findOne({ email: demoUser.email });
  if (duplicate) return res.sendStatus(409);

  const hashedPwd = await bcrypt.hash(demoUser.password, 10);

  try {
    const user = await User.create({
      firstName: demoUser.firstName,
      lastName: demoUser.lastName,
      email: demoUser.email,
      password: hashedPwd,
      userImage: './default.svg'
    });

    const accessToken = jwt.sign(
      { user: user._id },
      '' + process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '1d'}
      )

      res.cookie('jwt', accessToken, {
        maxAge: maxAge * 1000,
        httpOnly: true,
      })

      user.save()

      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userImage: user.userImage,
        token: accessToken,
      })
  } catch (error) {
    res.status(500).json({message: error.message });
  }

}

const editUser = async (req, res) => {
  const { email, firstName, lastName } = req.body;

  let updatedUser = {
    email,
    firstName,
    lastName,
    userImage: req.file?.path.replace('frontend\\public\\', './'),
  };
  console.log(`req.file: ${updatedUser.userImage}`);
  console.log(req.file);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, updatedUser, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User updated.', user });
  } catch (error) {
    res.status(400).json({
      error: 'Edit unsuccessful, please try again.',
      message: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const id = req.params.id;

  const foundUser = await User.findOne({ _id: id });
  if (!foundUser) return res.sendStatus(404);

  const matchPwd = await bcrypt.compare(oldPassword, foundUser.password);

  if (!matchPwd) {
    return res.status(401).json({ error: 'Old password is incorrect' });
  }

  const hashedPwd = await bcrypt.hash(newPassword, 10);

  foundUser.password = hashedPwd;

  await foundUser.save();
  res.status(200).json({
    message: 'Password updated.',
    foundUser,
  });
};

const UserController = {
  signup,
  authenticateUser,
  createDemoUser,
  reqUser,
  editUser,
  updatePassword,
};

export default UserController;
