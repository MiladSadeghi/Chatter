import UserModel from "../model/userModel.js";
import RoomModel from "../model/roomModel.js";

const getUserJoinedChats = async (userID) => {
  const rooms = await RoomModel.find({ "users.userId": userID.toString() }).distinct("_id");
  return rooms;
}

const createTokenOptions = () => {
  if (process.env.NODE_ENV === "development") {
    return { httpOnly: false, secure: false, sameSite: "Lax" }
  } else if (process.env.NODE_ENV === "production") {
    return { httpOnly: true, secure: true, sameSite: "None" }
  }
}

export { getUserJoinedChats, createTokenOptions };