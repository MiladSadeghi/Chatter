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

  const rooms = await RoomModel.find({ "users.userId": userID }).lean();
  const users = await UserModel.find();
  if (!rooms) res.sendStatus(404);
  rooms.forEach(room => {
    const inviteList = [];
    users.forEach((user) => {
      room.inviteList.forEach((invitedUser, index) => {
        if (invitedUser.equals(user._id)) {
          inviteList.push({
            id: user._id,
            name: user.userName
          })
        }
      })
      room.users.forEach(roomUser => {
        if (mongoose.Types.ObjectId(roomUser.userId).equals(user._id)) {
          roomUser.userName = user.userName;
        }
        if (roomUser.userID === user._id && roomUser.role !== "7610") {
          delete room._doc.inviteList;
          delete room._doc.blackList;
        }
      })
    })
    room.inviteList = inviteList;
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

const userSearch = async (req, res) => {
  const { body, userID } = req;
  if (!body.query || !body.roomID || !userID) return res.status(406).json({ status: "error", message: "something missed!" });
  const inInviteListUsersID = await RoomModel.find({ _id: body.roomID }).distinct("inviteList");
  const inRoomUsersID = await RoomModel.find({ _id: body.roomID }).distinct("users.userId");
  const getInRoomUsersName = await UserModel.find().where('_id').in([...inInviteListUsersID, ...inRoomUsersID]).distinct("userName").exec();
  const foundedUsers = await UserModel.find({ $and: [{ userName: new RegExp(body.query, 'i') }, { userName: { $not: { $in: getInRoomUsersName } } }] }).select("userName _id");

  if (foundedUsers.length === 0) {
    return res.sendStatus(404);
  }
  return res.status(201).json(foundedUsers);
}

export { getUserInviteList, getUserRooms, userAcceptInvite, userIgnoreInvite, userSearch }