import jwt from "jsonwebtoken";
import UserToken from "../model/UserToken.js";
import UserModel from "../model/userModel.js";
import generateTokens from "../utils/generateTokens.js";

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies)
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
  const userToken = await UserToken.findOne({ refreshToken }).exec();
  const foundUser = await UserModel.findOne({ _id: userToken.userId });

  if (!userToken) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
      if (err) return res.sendStatus(403);
      await userToken.delete();
    })
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
    if (err) {
      userToken.token = "";
      await userToken.save();
    }
    if (err || !foundUser._id.equals(decoded._id)) return res.sendStatus(403);

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
  })
}


export default handleRefreshToken;