
import generateTokens from "../utils/generateTokens.js";
import { createTokenOptions } from "../utils/cookies.js"

const handleLogin = async (req, res) => {
  const { foundUser } = req;
  try {
    const { accessToken, refreshToken } = await generateTokens(foundUser);
    res.cookie('jwt', refreshToken, { ...createTokenOptions(), maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ accessToken })
  } catch (error) {
    res.status(401).json({ status: "error", message: "something bad happens" });
  }
}

export default handleLogin;