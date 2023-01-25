import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 5,
      max: 35,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;