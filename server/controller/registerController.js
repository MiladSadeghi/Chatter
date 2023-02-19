import bcrypt from "bcrypt";
import UserModel from "../model/userModel.js";

const handleRegister = async (req, res) => {
  const { email, userName, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      userName,
      email,
      password: hashedPassword,
    })
    res.status(201).json({ "status": "success", "message": "new user created" });
  } catch (error) {
    res.status(500).json({ "status": "unsuccess", "message": error.message })
  }

}

export default handleRegister;