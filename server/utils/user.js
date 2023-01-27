import UserModel from "../model/userModel.js";
import RoomModel from "../model/roomModel.js";

const getUserJoinedChats = async (userID) => {
  const rooms = await RoomModel.find({ "users.userId": userID.toString() }).distinct("_id");
  return rooms;
}

export { getUserJoinedChats };