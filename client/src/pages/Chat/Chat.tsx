import React from "react";
import tw from "twin.macro";
import ChatContainer from "./components/ChatContainer";
import ProfileBar from "./components/ProfileBar";
import RoomList from "./components/RoomList";

const Chat = () => {
  return (
    <Wrapper>
      <ProfileBar />
      <RoomList />
      <ChatContainer />
    </Wrapper>
  );
};

const Wrapper = tw.div`flex h-screen`;

export default Chat;
