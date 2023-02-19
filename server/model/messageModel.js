import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  roomID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },
  senderName: {
    type: String,
    ref: "User",
    required: true
  },
}, {
  timestamps: true
})

const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;