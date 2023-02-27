import mongoose from "mongoose";
import RoomModel from "../model/roomModel.js";
import UserModel from "../model/userModel.js";
import kickUser from "../utils/kickUser.js";
const createRoom = async (req, res) => {
  const { body, userName, userID } = req;
  if (!body.name || !userName || !userID) return res.status(406).json({ status: "error", message: "something missed!" })

  try {
    const roomName = body.name;
    const ownerUser = {
      userId: userID,
      userName: userName,
      role: "1769"
    }
    const roomData = {
      users: [ownerUser],
      message: [],
      inviteList: [],
      blackList: [],
      name: roomName,
    }
    const createdRoom = await RoomModel.create(roomData);
    res.status(201).json({ ...createdRoom._doc, "status": "success", "message": "room created successfully" })
  } catch (error) {
    res.status(400).json({ status: "error", message: "try again later." })
  }
}

const deleteRoom = async (req, res) => {
  const { room } = req;
  room.delete((error, result) => {
    if (error) return res.status(408).json({ status: "error", message: "cant delete the room" })
    return res.status(200).json({ status: "success", message: "room deleted successfully" })
  })
}

const editRoomName = async (req, res) => {
  const { room, body } = req;
  room.name = body.newRoomName;
  room.save((err, result) => {
    if (err) return res.status(408).json({ status: "error", message: "cant change the room name" });
    res.status(200).json({ "status": "success", "message": "room name changed" });
  });
}

const inviteUserToRoom = async (req, res) => {
  const { room, body } = req;
  const { invitedUserId, invitedUserName } = body;

  let isUserOnInviteList = false;
  let isUserOnBlackList = false;
  let isAlreadyJoined = false;
  room.inviteList.forEach((userId) => {
    if (userId.equals(invitedUserId)) {
      isUserOnInviteList = true;
    }
  })

  if (isUserOnInviteList) {
    return res.status(406).json({ status: "error", message: "user already invited" });
  }

  room.blackList.forEach((userId) => {
    if (userId.equals(invitedUserId)) {
      isUserOnBlackList = true;
    }
  })

  if (isUserOnBlackList) {
    return res.status(406).json({ status: "error", message: "user already invited" });
  }

  room.users.forEach((user) => {
    if (user.userId === invitedUserId) {
      isAlreadyJoined = true;
    }
  })

  if (isAlreadyJoined) {
    return res.status(406).json({ status: "error", message: "user already joined" });
  }

  if (!isUserOnInviteList &&
    !isUserOnBlackList &&
    !isAlreadyJoined) {
    room.inviteList.push(invitedUserId)
    room.save((err) => {
      if (err) return res.status(408).json({ status: "error", message: "cant invite user" });
      return res.status(200).json({ status: "success", message: "user invited" });
    });
  }
}

const cancelUserInvite = (req, res) => {
  const { room, body } = req;
  const { canceledUserId } = body;

  if (room.inviteList.includes(mongoose.Types.ObjectId(canceledUserId))) {
    room.inviteList = room.inviteList.filter((invitedUser) => !invitedUser.equals(mongoose.Types.ObjectId(canceledUserId)))
    room.save();
    res.sendStatus(200);
  } else {
    res.sendStatus(404)
  }


}

const addUserToRoomBlacklist = async (req, res) => {
  const { room, body } = req;
  const { bannedUserId } = body;

  const isKicked = kickUser(room, bannedUserId);
  if (!isKicked) return res.status(408).json({ status: "error", message: "cant kick this user from the room" });
  const foundUser = await UserModel.find({ _id: bannedUserId }).select("_id name")
  room.blackList.push({ id: foundUser._id, name: foundUser.name });
  room.save((err) => {
    if (err) return res.status(408).json({ status: "error", message: "cant banned that user" });
    return res.status(200).json({ status: "success", message: "user added to black list" });
  });
}

export { createRoom, deleteRoom, editRoomName, inviteUserToRoom, addUserToRoomBlacklist, cancelUserInvite };