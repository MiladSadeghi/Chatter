import {
  EllipsisVerticalIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useEffect, useRef, Fragment } from "react";
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
import { Menu, Transition } from "@headlessui/react";
import { TRoomUser } from "src/ts/types/room.types";
import {
  useDeleteRoomMutation,
  useEditRoomNameMutation,
} from "src/core/features/room/roomApiSlice";
import { changeRoomName } from "src/core/features/user/userSlice";
import { useDispatch } from "react-redux";
const ChatContainer = ({ selectedRoom, socket }: any) => {
  const userID = useSelector((state: any) => state.user.userID);
  const Room: IRoom = useSelector((state: any) => state.user.rooms).find(
    (room: IRoom) => room._id === selectedRoom
  );
  const [isModerator, setIsModerator] = useState<boolean>(false);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [getRoomMessage, { isLoading, isSuccess }] =
    useGetRoomMessageMutation();
  const [sendMessage] = useSendMessageMutation();
  const chatScroll: any = useRef();
  const [deleteRoom] = useDeleteRoomMutation();
  const [editRoomName] = useEditRoomNameMutation();
  const dispatch = useDispatch();

  const getMessages = async () => {
    try {
      const data = await getRoomMessage(selectedRoom as string).unwrap();
      setMessages(data);
    } catch (error) {
      toast.error("refresh the page!");
    }
  };

  useEffect(() => {
    document.title = `Chatter - ${Room.name}`;
    getMessages();
    socket.emit("join chat", selectedRoom);

    return () => {
      setMessages([]);
    };
  }, [selectedRoom]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived: IMessage) => {
      if (newMessageReceived.roomID === selectedRoom) {
        setMessages((prev: IMessage[]) => {
          return [...prev, newMessageReceived];
        });
      }
    });

    const userRole = Room.users.find(
      (roomUser: TRoomUser) => roomUser.userId === userID
    );
    if (userRole?.role !== "7610") {
      setIsModerator(true);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
      }, 200);
    }
  }, [messages, isSuccess]);

  const enterPressed = (e: any) => {
    if (e.keyCode === 13) {
      submit();
    }
  };

  const handleChange = (e: any) => {
    setInputValue(e.currentTarget.value);
  };

  const deleteRoomHandler = async () => {
    try {
      await deleteRoom(selectedRoom);
      socket.emit("delete room", {
        roomUsers: Room.users,
        myID: userID,
        roomID: Room._id,
        roomName: Room.name,
      });
    } catch (error) {}
  };

  const changeRoomNameHandler = async () => {
    try {
      const newName = prompt("enter new room name");
      if (newName && newName !== "") {
        await editRoomName({ roomID: selectedRoom, newRoomName: newName });
        dispatch(
          changeRoomName({ roomID: selectedRoom, newRoomName: newName })
        );
        socket.emit("change room name", {
          roomID: selectedRoom,
          newRoomName: newName,
          roomUsers: Room.users,
          myID: userID,
        });
      }
    } catch (error) {}
  };

  const submit = async () => {
    if (inputValue !== "") {
      try {
        const response: { message: IMessage } = await sendMessage({
          message: inputValue,
          roomID: selectedRoom,
        }).unwrap();
        setMessages([...messages, response.message]);
        socket.emit("new message", {
          users: Room.users,
          response: response.message,
        });
        setInputValue("");
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
                <Menu
                  as="div"
                  className="relative ml-auto inline-block text-left"
                >
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium">
                      <EllipsisVerticalIcon width={32} className="text-black" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1 px-1">
                        {isModerator ? (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <h5
                                  className={`"block text-sm" rounded-md px-4 py-2 font-Inter ${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  }`}
                                  onClick={() => changeRoomNameHandler()}
                                >
                                  rename room
                                </h5>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <h5
                                  className={`"block text-sm" rounded-md px-4 py-2 font-Inter ${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  }`}
                                  onClick={deleteRoomHandler}
                                >
                                  delete room
                                </h5>
                              )}
                            </Menu.Item>
                          </>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <h5
                                className={`"block text-sm" rounded-md px-4 py-2 font-Inter ${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                }`}
                              >
                                leave room
                              </h5>
                            )}
                          </Menu.Item>
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </ChatHeader>
              <ChatBody>
                <Messages ref={chatScroll}>
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
          <RoomBar RoomID={Room._id} socket={socket} />
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
