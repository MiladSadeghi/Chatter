import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log(authHeader, req.headers)
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN,
    (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid toke
      req.userID = decoded._id;
      req.userName = decoded.userName;
      next();
    }
  );
}

export default verifyJWT;