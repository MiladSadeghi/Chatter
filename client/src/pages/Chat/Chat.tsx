import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import tw from "twin.macro";
import ChatContainer from "./components/ChatContainer";
import ProfileBar from "./components/ProfileBar";
import RoomList from "./components/RoomList";
import { io } from "socket.io-client";
import CreateRoomModal from "./components/CreateRoomModal";
import { AnimatePresence } from "framer-motion";

let socket: any;

const Chat = () => {
  const selectedRoom: null | string = useSelector(
    (state: any) => state.user.selectedRoomID
  );
  const currentUserID = useSelector((state: any) => state.user.userID);
  const isCreateRoomModalOpen = useSelector(
    (state: any) => state.user.isCreateRoomModalShow
  );
  socket = io("http://localhost:3001");
  socket.onAny((eventName: any, ...args: any) => {
    console.log(eventName, args);
  });
  socket.emit("setup", currentUserID);

  useEffect(() => {
    document.title = "Chatter";
  }, []);

  return (
    <Wrapper>
      <ProfileBar />
      <RoomList />
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
