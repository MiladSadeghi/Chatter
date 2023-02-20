import RoomModel from "../model/roomModel.js";
import mongoose from "mongoose";
import UserModel from "../model/userModel.js";

const getUserInviteList = async (req, res) => {
  const { userID } = req;
  const invitedRooms = await RoomModel.find({ "inviteList": { "$in": [mongoose.Types.ObjectId(userID)] } }).select("name _id");
  if (invitedRooms.length === 0) return res.sendStatus(404);
  return res.status(200).json(invitedRooms);
}

const getUserRooms = async (req, res) => {
  const { userName, userID } = req;
  if (!userName || !userID) return res.status(406).json({ status: "error", message: "something missed!" })

  const rooms = await RoomModel.find({ "users.userId": userID });
  const user = await UserModel.find({ "_id": userID });
  if (!rooms) res.sendStatus(404);
  rooms.forEach(room => {
    room.users.forEach(roomUser => {
      roomUser.userName = user[0].userName;
      if (roomUser.userId === userID) {
        if (roomUser.role !== "1769" && roomUser.role !== "2561") {
          delete room._doc.inviteList;
          delete room._doc.blackList;
        }
      }
    })
  })

  res.status(200).json(rooms)
}

const userAcceptInvite = async (req, res) => {
  const { body, userID } = req;
  if (!body.roomID || !userID) return res.status(406).json({ status: "error", message: "something missed!" });

  const isUserInRoom = await RoomModel.find({ "users.userId": mongoose.Types.ObjectId(body.userID) });
  if (isUserInRoom[0]) return res.status(404).json({ status: "error", message: "user already joined" });
  const invitedRoom = await RoomModel.find({ _id: mongoose.Types.ObjectId(body.roomID) });
  if (!invitedRoom[0]) return res.status(404).json({ status: "error", message: "not found any room with this id" });
  await invitedRoom[0]._doc.inviteList.remove([userID])
  const userData = {
    userId: userID,
    role: "7610"
  }
  invitedRoom[0].users.push(userData)
  invitedRoom[0].save((err) => {
    if (err) return res.status(408).json({ status: "error", message: "cant accept invite!" });
    res.status(200).json({ "status": "success", "message": "you accept the invite", room: invitedRoom[0] });
  });
}

const userIgnoreInvite = async (req, res) => {
  const { body, userID } = req;
  if (!body.roomID || !userID) return res.status(406).json({ status: "error", message: "something missed!" });
  const invitedRoom = await RoomModel.find({ _id: mongoose.Types.ObjectId(body.roomID) });
  if (!invitedRoom) return res.status(404).json({ status: "error", message: "not found any room with this id" });
  await invitedRoom[0]._doc.inviteList.remove([userID]);
  invitedRoom[0].save((err) => {
    if (err) return res.status(408).json({ status: "error", message: "cant accept invite!" });
    res.sendStatus(200);
  });
}

export { getUserInviteList, getUserRooms, userAcceptInvite, userIgnoreInvite }