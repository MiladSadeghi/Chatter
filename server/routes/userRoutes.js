import express from "express";
import handleLogin from "../controller/loginController.js";
import handleRegister from "../controller/registerController.js";
import { checkAvailableUser, checkDuplicateUsernameOrEmail } from "../middleware/auth.js";

const userRoutes = express.Router();

// auth routes
userRoutes.post("/auth/register", checkDuplicateUsernameOrEmail, handleRegister);
userRoutes.post("/auth/login", checkAvailableUser, handleLogin);

export default userRoutes;