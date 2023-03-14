import UserModel from "../model/userModel.js";
import bcrypt from "bcrypt";

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!email || !userName || !password) return res.status(400).json({ "message": "Email, Username and Password are required" });

  UserModel.findOne({ $or: [{ userName }, { email }] }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (user) {
      let duplicatedItem = {};
      if (user.userName === userName) duplicatedItem["userName"] = "Your username is available";
      if (user.email === email) duplicatedItem["email"] = "Your email is available";
      return res.status(400).send({ status: "unsuccess", data: duplicatedItem });
    }

    next();
  });
};

const checkAvailableUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

  try {
    const foundUser = await UserModel.findOne({ email }).exec();
    await bcrypt.compare(password, foundUser.password);
    req.foundUser = foundUser;
    next();
  } catch (error) {
    return res.status(401).json({ "status": "unsuccess", message: "Your email or password is wrong!." }); //Unauthorized 
  }
}

export { checkDuplicateUsernameOrEmail, checkAvailableUser }