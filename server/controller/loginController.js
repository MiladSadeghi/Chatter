
import generateTokens from "../utils/generateTokens.js";

const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  const { foundUser } = req;
  try {
    const { accessToken, refreshToken } = await generateTokens(foundUser);
    if (cookies?.jwt) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
    }
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ accessToken })
  } catch (error) {
    res.sendStatus(401);
  }
}

export default handleLogin;