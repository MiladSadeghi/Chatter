import jwt from "jsonwebtoken";
import UserToken from "../model/UserToken.js";

const verifyRefreshToken = (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN;
  UserToken.findOne({ token: refreshToken }, async (err, doc) => {
    if (!doc) throw new Error({ error: true, message: "Invalid refresh token" });
    jwt.verify(refreshToken, privateKey, async (err, tokenDetails) => {
      if (err)
        throw new Error({ error: true, message: "Invalid refresh token" });
      return ({
        tokenDetails,
        error: false,
        message: "Valid refresh token",
      });
    });
  });
};

export default verifyRefreshToken;