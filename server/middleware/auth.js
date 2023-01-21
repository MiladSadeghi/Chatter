import UserModel from "../model/userModel.js";

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

export { checkDuplicateUsernameOrEmail }