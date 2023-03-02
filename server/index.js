import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middleware/credentials.js";
import { logger } from "./middleware/logEvents.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import roomRoutes from "./routes/roomRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import RoomModel from "./model/roomModel.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = new Server(server, {
  pingTimeout: 6000,
  cors: {
    origin: process.env.FRONT_END_URL
  }
})
app.use(logger)
app.use(credentials);
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.json());
app.use(cookieParser());


//routes
app.use("/api", userRoutes)

// routes need to jwt verify
app.use("/api", roomRoutes);

app.use((req, res, next) => {
  req.io = io;
  next();
})
app.use("/api", messageRoutes)


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE_NAME
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => console.log(`${error} did not connect`));

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userID) => {
    socket.join(userID);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`user joined new room with id ${room}`)
  })

  socket.on("new message", (receiveData) => {
    const users = receiveData.users;
    const message = receiveData.response;

    if (!users) return console.log("chat.users not defined");

    users.forEach(user => {
      if (user.userId !== message.senderID) {
        console.log(`i send message to ${user.userId}`)
        socket.in(user.userId).emit("message received", { ...message })
      }
    })
  })

  socket.on("send invite", (receiveData) => {
    const inviteData = receiveData.inviteData;
    const roomID = receiveData.inviteData.roomID;
    const roomName = receiveData.roomName;
    if (inviteData.id) {
      socket.in(inviteData.id).emit("get invite for user", { _id: roomID, name: roomName })
    }
  })

  socket.on("user kick", (receiveData) => {
    const { RoomID, userID } = receiveData;
    socket.in(userID).emit("user kicked", RoomID)
  })

  socket.on("remove from room invite list", async (receiveData) => {
    const { roomID, userID } = receiveData;
    const foundedRoom = await RoomModel.findOne({ _id: roomID });
    foundedRoom.users.forEach((user) => {
      if (user.userId !== userID) {
        socket.to(user.userId).emit("user removed from room invite list", { roomID, userID })
      }
    })
  })

  socket.on("user accept invite", async (receiveData) => {
    const { roomID, userID, userName } = receiveData;
    const foundedRoom = await RoomModel.findOne({ _id: roomID });
    foundedRoom.users.forEach((user) => {
      if (user.userId !== userID) {
        socket.to(user.userId).emit("user joined room", { roomID, userID, userName })
      }
    })
  })

  socket.on("admin cancel invite", (receiveData) => {
    const { roomID, userID } = receiveData;

    socket.to(userID).emit("invite canceled by admin", roomID)
  })
})

