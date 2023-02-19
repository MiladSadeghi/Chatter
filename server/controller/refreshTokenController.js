import jwt from "jsonwebtoken";
import UserToken from "../model/UserToken.js";
import UserModel from "../model/userModel.js";
import generateTokens from "../utils/generateTokens.js";

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })
      const foundUser = await UserModel.findOne({ _id: decoded._id, userName: decoded.userName }).exec();

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

      const { accessToken } = await generateTokens(foundUser);

      res.status(201).json({ accessToken });
    }
  )
}


export default handleRefreshToken;