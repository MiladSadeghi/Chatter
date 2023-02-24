import { PaperAirplaneIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IRoom } from "src/ts/interfaces/room.interfaces";
import tw from "twin.macro";
import RoomBar from "./RoomBar";

import {
  useGetRoomMessageMutation,
  useSendMessageMutation,
} from "src/core/features/message/messageApiSlice";
import { IMessage } from "src/ts/interfaces/message.interfaces";
import { toast } from "react-toastify";
import ChatLoader from "src/common/ChatLoader";
const ChatContainer = ({ selectedRoom, socket }: any) => {
  const userID = useSelector((state: any) => state.user.userID);
  const Room = useSelector((state: any) => state.user.rooms).find(
    (room: IRoom) => room._id === selectedRoom
  );
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [getRoomMessage, { isLoading, isSuccess }] =
    useGetRoomMessageMutation();
  const [sendMessage] = useSendMessageMutation();

  const getMessages = async () => {
    try {
      const data = await getRoomMessage(selectedRoom as string).unwrap();
      setMessages(data);
    } catch (error) {
      toast.error("refresh the page!");
    }
  };

  useEffect(() => {
    getMessages();
    socket.emit("join chat", selectedRoom);
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived: IMessage[]) => {
      setMessages(newMessageReceived);
    });
  }, []);

  const enterPressed = (e: any) => {
    if (e.keyCode === 13) {
      submit();
    }
  };

  const handleChange = (e: any) => {
    setInputValue(e.currentTarget.value);
  };

  const submit = async () => {
    if (inputValue !== "") {
      try {
        const response: { message: IMessage } = await sendMessage({
          message: inputValue,
          roomID: selectedRoom,
        }).unwrap();
        setMessages([...messages, response.message]);
      } catch (error) {
        toast.error("cant send message");
      }
    }
  };

  return (
    <>
      {Room && isLoading && <ChatLoader />}
      {Room && isSuccess && (
        <>
          <Wrapper>
            <Chat>
              <ChatHeader>
                <ChatHeaderImg />
                <ChatHeaderName>{Room.name}</ChatHeaderName>
              </ChatHeader>
              <ChatBody>
                <Messages>
                  {messages.map((message: IMessage) => {
                    if (message.senderID === userID) {
                      return (
                        <MyMessage key={message._id}>
                          <MessageBody>{message.message}</MessageBody>
                        </MyMessage>
                      );
                    } else {
                      return (
                        <MemberMessage key={message._id}>
                          <SenderMessage>{message.senderName}</SenderMessage>
                          <MessageBody>{message.message}</MessageBody>
                        </MemberMessage>
                      );
                    }
                  })}
                </Messages>
              </ChatBody>
              <ChatInputWrapper>
                <ChatInput
                  placeholder="Type a message"
                  value={inputValue}
                  onChange={handleChange}
                  onKeyDown={enterPressed}
                />
                <MessageSendIcon onClick={submit} />
              </ChatInputWrapper>
            </Chat>
          </Wrapper>
          <RoomBar RoomID={Room._id} />
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
const ChatBody = tw.div` flex flex-col h-full`;
const Messages = tw.div`h-full flex flex-col scrollbar-thumb-my-light-purple/[.40] scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded-md flex-[1_1_0] px-6 pb-0 pt-3`;
const MyMessage = tw.div` py-3 px-5 text-white  bg-my-light-purple text-sm self-end rounded-2xl max-w-[50%] mb-4 last:mb-0`;
const MemberMessage = tw.div`max-w-[50%] py-3 px-5 text-black bg-gray-300 rounded-2xl self-start mb-4 last:mb-0`;
const SenderMessage = tw.h5`text-xs font-bold mb-2`;
const MessageBody = tw.p`font-Inter`;
const ChatInputWrapper = tw.div`w-full relative px-6 py-4`;
const ChatInput = tw.input`w-full border-solid border-2 rounded-xl border-gray-200 px-5 h-12 pr-14 font-Inter text-sm cursor-text`;
const MessageSendIcon = tw(
  PaperAirplaneIcon
)`absolute right-[2.6rem] top-1/2 -translate-y-1/2 w-6 h-6 text-my-light-purple -rotate-45 cursor-pointer`;

export default ChatContainer;
