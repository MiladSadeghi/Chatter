import jwt from "jsonwebtoken";
import UserToken from "../model/UserToken.js";

const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, userName: user.userName };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await userToken.remove();

    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return { accessToken, refreshToken }
  } catch (err) {
    return err;
  }
};

export default generateTokens;