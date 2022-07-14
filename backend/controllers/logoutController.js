import User from '../models/User.js';

const LogoutController = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const accessToken = cookies.jwt;

  const foundUser = await User.findOne({ accessToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt');
    return res.sendStatus(204);
  }

  foundUser.refreshToken = '';
  await foundUser.save();

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.sendStatus(204);
};

export default LogoutController;
