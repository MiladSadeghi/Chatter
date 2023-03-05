import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import tw from "twin.macro";
import ChatContainer from "./components/ChatContainer";
import ProfileBar from "./components/ProfileBar";
import RoomList from "./components/RoomList";
import { io } from "socket.io-client";
import CreateRoomModal from "./components/CreateRoomModal";
import { AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  changeRoomName,
  deleteFromRoomInviteList,
  removeRoom,
} from "src/core/features/user/userSlice";
import { toast } from "react-toastify";

let socket: any;

const Chat = () => {
  const selectedRoom: null | string = useSelector(
    (state: any) => state.user.selectedRoomID
  );
  const currentUserID = useSelector((state: any) => state.user.userID);
  const isCreateRoomModalOpen = useSelector(
    (state: any) => state.user.isCreateRoomModalShow
  );
  const dispatch = useDispatch();
  socket = io("http://localhost:3001");

  useEffect(() => {
    document.title = "Chatter";

    socket.onAny((eventName: any, ...args: any) => {
      console.log(eventName, args);
    });
    socket.emit("setup", currentUserID);

    socket.on("user kicked", (receiveData: any) => {
      dispatch(removeRoom(receiveData));
      toast.info("you are kicked from a room");
    });

    socket.on("user removed from room invite list", (receiveData: any) => {
      dispatch(
        deleteFromRoomInviteList({
          roomID: receiveData.roomID,
          userID: receiveData.userID,
        })
      );
    });

    socket.on("room name changed", (receiveData: any) => {
      console.log(receiveData);
      dispatch(
        changeRoomName({
          roomID: receiveData.roomID,
          newRoomName: receiveData.newRoomName,
        })
      );
    });
  }, []);

  return (
    <Wrapper>
      <ProfileBar />
      <RoomList socket={socket} />
      {selectedRoom && (
        <ChatContainer selectedRoom={selectedRoom} socket={socket} />
      )}
      <AnimatePresence>
        {isCreateRoomModalOpen && <CreateRoomModal />}
      </AnimatePresence>
    </Wrapper>
  );
};

const Wrapper = tw.div`flex h-screen`;

export default Chat;
