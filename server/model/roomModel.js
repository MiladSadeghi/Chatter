import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  users: {
    type: Array,
    ref: "User"
  },
  messages: {
    type: Array,
  },
  inviteList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User"
  },
  blackList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User"
  },
  name: {
    type: String,
    require: true
  }
})

const RoomModel = mongoose.model("Room", RoomSchema);
export default RoomModel;

