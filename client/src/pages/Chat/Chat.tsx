import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import tw from "twin.macro";
import ChatContainer from "./components/ChatContainer";
import ProfileBar from "./components/ProfileBar";
import RoomList from "./components/RoomList";
import socketIOClient from "socket.io-client";

let socket: any;

const Chat = () => {
  const selectedRoom: null | string = useSelector(
    (state: any) => state.user.selectedRoomID
  );
  const currentUserID = useSelector((state: any) => state.user.userID);

  useEffect(() => {
    socket = socketIOClient("http://localhost:3001");
    socket.emit("setup", currentUserID);
  }, []);

  return (
    <Wrapper>
      <ProfileBar />
      <RoomList />
      {selectedRoom && (
        <ChatContainer selectedRoom={selectedRoom} socket={socket} />
      )}
    </Wrapper>
  );
};

const Wrapper = tw.div`flex h-screen`;

export default Chat;
