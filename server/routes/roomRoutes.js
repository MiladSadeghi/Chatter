import express from "express";
import { addUserToRoomBlacklist, createRoom, deleteRoom, editRoomName, inviteUserToRoom } from "../controller/roomController.js";
import verifyJWT from "../middleware/verifyJWT.js";
import { isModerator, isOwner } from "../middleware/verifyRules.js";

const roomRoutes = express.Router();

roomRoutes.use(verifyJWT)
roomRoutes.post("/room", createRoom);

roomRoutes.post("/room/delete", isOwner("delete"), deleteRoom);
roomRoutes.put("/room/", isOwner("edit-room-name"), editRoomName)

roomRoutes.put("/room/invite", isModerator("invite-list"), inviteUserToRoom)
roomRoutes.put("/room/blacklist", isModerator("black-list"), addUserToRoomBlacklist)

export default roomRoutes;

