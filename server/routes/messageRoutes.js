import verifyJWT from "../middleware/verifyJWT.js";
import express from "express";
import { addMessage, getAllRoomMessages, getMessage, getRoomMessages } from "../controller/messageController.js";

const messageRoutes = express.Router();

messageRoutes.use(verifyJWT);
messageRoutes.get("/msg/", getAllRoomMessages);
messageRoutes.get("/msg/:roomID", getRoomMessages);
messageRoutes.get("/msg-update/:roomID", getMessage);

messageRoutes.post("/msg/:roomID", addMessage)

export default messageRoutes