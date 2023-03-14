import React, { useEffect, useState } from "react";
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
  addRoomMessage,
  changeRoomName,
  deleteFromRoomInviteList,
  removeRoom,
  removeUserFromRoom,
  selectRoom,
} from "src/core/features/user/userSlice";
import { toast } from "react-toastify";
import { IMessage } from "src/ts/interfaces/message.interfaces";
import styled from "styled-components";
import RouteWrapper from "src/common/RouteWrapper";

let socket: any;

const Chat = () => {
  const selectedRoom: any = useSelector(
    (state: any) => state.user.selectedRoomID
  );
  const currentUserID = useSelector((state: any) => state.user.userID);
  const isCreateRoomModalOpen = useSelector(
    (state: any) => state.user.isCreateRoomModalShow
  );
  const dispatch = useDispatch();
  const [isRoomListOpen, setIsRoomListOpen] = useState(true);
  socket = io(String(process.env.REACT_APP_BASE_URL));

  useEffect(() => {
    document.title = "Chatter";

    socket.onAny((eventName: any, ...args: any) => {
      console.log(eventName, args);
    });
    socket.emit("setup", currentUserID);

    socket.on("user kicked", (receiveData: any) => {
      dispatch(selectRoom(null));
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
      dispatch(
        changeRoomName({
          roomID: receiveData.roomID,
          newRoomName: receiveData.newRoomName,
        })
      );
    });

    socket.on("user leave the room", (receiveData: any) => {
      dispatch(
        removeUserFromRoom({
          roomID: receiveData.roomID,
          userID: receiveData.userID,
        })
      );
    });

    socket.on("new message", (newMessageReceived: IMessage) => {
      dispatch(
        addRoomMessage({
          roomID: newMessageReceived.roomID,
          newMessage: newMessageReceived,
        })
      );
    });
  }, []);

  return (
    <RouteWrapper>
      <Wrapper>
        <LeftBars selectedRoom={selectedRoom}>
          <ProfileBar />
          <RoomList
            socket={socket}
            isRoomListOpen={isRoomListOpen}
            setIsRoomListOpen={setIsRoomListOpen}
          />
        </LeftBars>
        {selectedRoom && <ChatContainer socket={socket} />}
        <AnimatePresence>
          {isCreateRoomModalOpen && <CreateRoomModal />}
        </AnimatePresence>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`flex h-screen dark:bg-[#171821] relative z-10`;
const LeftBars = styled.div`
  ${tw`absolute left-0 z-20 flex h-full w-full md:relative md:w-[50%] lg:w-[40%] xl:w-[40%]`}
  ${({ selectedRoom }: { selectedRoom: Boolean }) =>
    selectedRoom ? tw`hidden md:flex` : tw``}
`;

export default Chat;
