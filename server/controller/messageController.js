import MessageModel from "../model/messageModel.js";
import RoomModel from "../model/roomModel.js";
import { getUserJoinedChats } from "../utils/user.js";
import mongoose from "mongoose";
import { getFormattedMessages } from "../utils/messages.js";

const getAllRoomMessages = async (req, res) => {
  const { userID } = req;
  const userRooms = await getUserJoinedChats(userID);
  if (!userRooms.length === 0) return res.status(404).json({ status: "error", message: 'first joined a room!' });

  const messages = await MessageModel.find({ 'roomID': { $in: userRooms } });
  if (!messages) return res.status(404).json({ status: "error", message: 'no message' });
  return res.status(201).json(messages);
}

const getRoomMessages = async (req, res) => {
  const { roomID } = req.params;
  if (!roomID) return res.status(406).json({ status: "error", message: "something missed!" })
  const messages = await MessageModel.find({ "roomID": roomID });
  if (!messages) return res.status(404).json({ status: "error", message: "no message found!" });
  return res.status(200).json(messages)
}

const getMessage = async (req, res) => {
  const { roomID } = req.params;
  if (!roomID) return res.status(406).json({ status: "error", message: "something missed!" });
  const message = await MessageModel.find({
    roomID: mongoose.Types.ObjectId(roomID),
  }).sort({ updatedAt: 1 });
  if (!message) return res.status(404).json({ status: "error", message: "no message found!" });
  const projectedMessages = getFormattedMessages(message);

  return res.status(200).json(projectedMessages)
}

const addMessage = async (req, res) => {
  const { body, userID: senderID, userName } = req;
  const { roomID } = req.params;
  if (!roomID || !userName || !body.message || !senderID) return res.status(406).json({ status: "error", message: "something missed!" });

  const isUserInRoom = await RoomModel.find({ "users.userId": senderID, "_id": roomID });

  if (isUserInRoom.length === 0) return res.status(403).json({ status: "error", message: "you aren't on this room!" });
  const saveMessage = await MessageModel.create({
    message: body.message,
    senderID,
    senderName: userName,
    roomID,
  })

  if (!saveMessage) return res.status(500).json({ status: "error", message: "cant send the message" });
  return res.status(201).json({ status: "success", message: saveMessage });

}

export { getAllRoomMessages, getRoomMessages, getMessage, addMessage }