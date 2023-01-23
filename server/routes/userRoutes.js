import express from "express";
import handleLogin from "../controller/loginController.js";
import handleRefreshToken from "../controller/refreshTokenController.js";
import handleRegister from "../controller/registerController.js";
import { checkAvailableUser, checkDuplicateUsernameOrEmail } from "../middleware/auth.js";

const userRoutes = express.Router();

// auth routes
userRoutes.post("/auth/register", checkDuplicateUsernameOrEmail, handleRegister);
userRoutes.post("/auth/login", checkAvailableUser, handleLogin);
userRoutes.get("/auth/refresh", handleRefreshToken);

export default userRoutes;