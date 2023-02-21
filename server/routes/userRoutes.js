import express from "express";
import handleLogin from "../controller/loginController.js";
import handleLogout from "../controller/logoutController.js";
import handleRefreshToken from "../controller/refreshTokenController.js";
import handleRegister from "../controller/registerController.js";
import { getUserInviteList, getUserRooms, userAcceptInvite, userIgnoreInvite, userSearch } from "../controller/userController.js";
import { checkAvailableUser, checkDuplicateUsernameOrEmail } from "../middleware/auth.js";
import verifyJWT from "../middleware/verifyJWT.js";

const userRoutes = express.Router();

// auth routes
userRoutes.post("/auth/register", checkDuplicateUsernameOrEmail, handleRegister);
userRoutes.post("/auth/login", checkAvailableUser, handleLogin);
userRoutes.get("/auth/refresh", handleRefreshToken);
userRoutes.get("/auth/logout", handleLogout);

userRoutes.use(verifyJWT)
userRoutes.get("/user/invited-list", getUserInviteList);
userRoutes.get("/user/rooms", getUserRooms);
userRoutes.post("/user/accept-invite", userAcceptInvite);
userRoutes.post("/user/ignore-invite", userIgnoreInvite);
userRoutes.post("/user/search", userSearch)

export default userRoutes;