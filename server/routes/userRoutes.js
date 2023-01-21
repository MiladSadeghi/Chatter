import express from "express";
import handleRegister from "../controller/registerController.js";
import { checkDuplicateUsernameOrEmail } from "../middleware/auth.js";

const userRoutes = express.Router();

// auth routes
userRoutes.post("/auth/register", checkDuplicateUsernameOrEmail, handleRegister);

export default userRoutes;