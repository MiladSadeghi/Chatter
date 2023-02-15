import { PaperAirplaneIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IRoom } from "src/ts/interfaces/room.interfaces";
import tw from "twin.macro";
import Directory from "./Directory";

const ChatContainer = () => {
  const selectedRoom: null | string = useSelector(
    (state: any) => state.user.selectedRoomID
  );

  const rooms = useSelector((state: any) => state.user.rooms);
  const [Room, setRoom] = useState<IRoom | null>(null);

  useEffect((): any => {
    setRoom(() => rooms.find((room: IRoom) => room._id === selectedRoom));
  }, [selectedRoom]);

  return (
    <>
      {Room && selectedRoom && (
        <>
          <Wrapper>
            <Chat>
              <ChatHeader>
                <ChatHeaderImg />
                <ChatHeaderName>{Room.name}</ChatHeaderName>
              </ChatHeader>
              <ChatBody>
                <Messages></Messages>
                <MessageInputWrapper>
                  <MessageInput placeholder="Type a message" />
                  <MessageSendIcon />
                </MessageInputWrapper>
              </ChatBody>
            </Chat>
          </Wrapper>
          <Directory Room={Room} />
        </>
      )}
    </>
  );
};

const Wrapper = tw.div`min-w-0 w-full h-full`;
const Chat = tw.div`flex flex-col h-full`;
const ChatHeader = tw.div`flex border-b min-h-[80px] px-4 items-center`;
const ChatHeaderImg = tw(
  UserGroupIcon
)`w-10 h-10 p-2 bg-slate-400 rounded-full mr-3 text-white`;
const ChatHeaderName = tw.h3`font-Inter font-bold text-xl`;
const ChatBody = tw.div`p-7 flex flex-col h-full`;
const Messages = tw.div`h-full overflow-y-auto`;
const MessageInputWrapper = tw.div`w-full relative`;
const MessageInput = tw.input`w-full border-solid border-2 rounded-xl border-gray-200 px-5 h-12 pr-14 font-Inter text-sm`;
const MessageSendIcon = tw(
  PaperAirplaneIcon
)`absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-my-light-purple -rotate-45`;

export default ChatContainer;
