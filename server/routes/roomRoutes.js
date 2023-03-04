import express from "express";
import { addUserToRoomBlacklist, cancelUserInvite, createRoom, deleteRoom, editRoomName, inviteUserToRoom, kickUserFromRoom, unBanUser } from "../controller/roomController.js";
import verifyJWT from "../middleware/verifyJWT.js";
import { isModerator, isOwner } from "../middleware/verifyRules.js";

const roomRoutes = express.Router();

roomRoutes.use(verifyJWT)
roomRoutes.post("/room", createRoom);

roomRoutes.post("/room/delete", isOwner("delete"), deleteRoom);
roomRoutes.put("/room/", isOwner("edit-room-name"), editRoomName)

roomRoutes.put("/room/invite", isModerator("invite-list"), inviteUserToRoom);
roomRoutes.put("/room/blacklist", isModerator("black-list"), addUserToRoomBlacklist);
roomRoutes.post("/room/cancel-invite", isModerator("cancel-invite-list"), cancelUserInvite);
roomRoutes.post("/room/kick-user", isModerator("kick-user"), kickUserFromRoom);
roomRoutes.post("/room/unban-user", isModerator("black-list"), unBanUser);

export default roomRoutes;

