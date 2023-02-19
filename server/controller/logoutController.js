import UserToken from "../model/UserToken.js";

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: "Lax", secure: true });
  res.sendStatus(200);
}

export default handleLogout;