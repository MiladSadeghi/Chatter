
import generateTokens from "../utils/generateTokens.js";

const handleLogin = async (req, res) => {
  const { foundUser } = req;
  try {
    const { accessToken, refreshToken } = await generateTokens(foundUser);
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: "Lax", secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ accessToken })
  } catch (error) {
    res.sendStatus(401);
  }
}

export default handleLogin;