const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie('jwt', createTokenOptions());
  res.sendStatus(200);
}

export default handleLogout;