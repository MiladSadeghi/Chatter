import {
  CheckCircleIcon,
  UserGroupIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToInviteList,
  removeRoom,
  selectRoom,
  userJoinedRoom,
} from "src/core/features/user/userSlice";
import { AppDispatch } from "src/core/store";
import { IRoom } from "src/ts/interfaces/room.interfaces";
import { IUser } from "src/ts/interfaces/user.interfaces";
import tw from "twin.macro";
import {
  useAcceptRoomInviteMutation,
  useIgnoreRoomInviteMutation,
} from "src/core/features/user/userApiSlice";
import { toggleCreateRoomModal } from "src/core/features/user/userSlice";
import { TUserInviteList } from "src/ts/types/user.types";
import { toast } from "react-toastify";
import styled from "styled-components";

const RoomList = ({ socket }: any) => {
  const user: IUser = useSelector((state: any) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const [acceptRoomInvite] = useAcceptRoomInviteMutation();
  const [ignoreRoomInvite] = useIgnoreRoomInviteMutation();

  const roomHandler = (roomID: string) => {
    dispatch(selectRoom(roomID));
  };

  const acceptInvite = async (roomID: string) => {
    try {
      await acceptRoomInvite(roomID);
      socket.emit("remove from room invite list", {
        roomID,
        userID: user.userID,
      });
      socket.emit("user accept invite", {
        roomID,
        userID: user.userID,
        userName: user.userName,
      });
    } catch (error) {}
  };

  const ignoreInvite = async (roomID: string) => {
    await ignoreRoomInvite(roomID);
    socket.emit("remove from room invite list", {
      roomID,
      userID: user.userID,
    });
  };

  useEffect(() => {
    socket.on("get invite for user", (receivedData: any) => {
      const inviteData = {
        _id: receivedData._id,
        name: receivedData.name,
      };
      dispatch(addToInviteList(inviteData));
    });

    socket.on("user joined room", (receiveData: any) => {
      dispatch(
        userJoinedRoom({
          roomID: receiveData.roomID,
          userID: receiveData.userID,
          userName: receiveData.userName,
        })
      );
    });

    socket.on("banned by admin", (receiveData: any) => {
      dispatch(removeRoom(receiveData.roomID));
      toast.info(`you are banned from ${receiveData.roomName}`);
    });

    socket.on("remove room", (receiveData: any) => {
      console.log(receiveData);
      dispatch(removeRoom(receiveData.roomID));
      toast.info(`you are banned from ${receiveData.roomName}`);
    });
  }, []);

  return (
    <Wrapper>
      <Header>
        <HeaderText>Message</HeaderText>
        <HeaderCreateRoomLogo
          onClick={() => dispatch(toggleCreateRoomModal())}
        />
      </Header>
      {user.inviteList.length !== 0 && (
        <InviteList>
          <div className="rounded-lg bg-my-light-purple/[0.5] p-5">
            <p className="font-Inter text-base font-bold text-white">
              You Are Invited To:
            </p>
            {user.inviteList.map((invitedRoom: TUserInviteList) => (
              <InviteListRoom key={invitedRoom._id}>
                <Room className="w-full !cursor-default rounded-lg bg-white px-2 py-3">
                  <RoomImage />
                  <div className="flex w-full items-center justify-between">
                    <RoomName className="!text-black">
                      {invitedRoom.name}
                    </RoomName>
                    <div className="flex">
                      <CheckCircleIcon
                        width={24}
                        className="mr-1 cursor-pointer rounded-full bg-green-600 text-white"
                        onClick={() => acceptInvite(invitedRoom._id)}
                      />
                      <XCircleIcon
                        width={24}
                        className="cursor-pointer rounded-full bg-red-600 text-white"
                        onClick={() => ignoreInvite(invitedRoom._id)}
                      />
                    </div>
                  </div>
                </Room>
              </InviteListRoom>
            ))}
          </div>
        </InviteList>
      )}
      {user.rooms.length === 0 ? (
        <NoRoom>Join or create room!</NoRoom>
      ) : (
        <Rooms>
          {user.rooms.map((room: IRoom) => (
            <Room key={room._id} onClick={() => roomHandler(room._id)}>
              <RoomImage />
              <div className="flex flex-col items-center justify-center">
                <RoomName>{room.name}</RoomName>
              </div>
            </Room>
          ))}
        </Rooms>
      )}
    </Wrapper>
  );
};

// const Wrapper = tw.div` `;
const Wrapper = styled.div`
  ${tw`h-full border-r flex flex-col dark:bg-[#1c1d26] w-full`}
`;

const Header = tw.div`p-5 flex items-center justify-between border-b`;
const HeaderText = tw.h5`font-Inter font-semibold text-xl dark:text-white`;
const HeaderCreateRoomLogo = tw(
  PlusSmallIcon
)`h-6 w-6 p-2 bg-my-light-purple text-white cursor-pointer rounded-full box-content`;
const NoRoom = tw.h5`text-xl font-semibold font-SFPro text-slate-600 p-5 dark:text-slate-400`;
const Rooms = tw.div`p-5 flex flex-col scrollbar-thumb-my-light-purple/[.40] scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded-md`;
const Room = tw.div`flex mb-10 last:mb-0 cursor-pointer `;
const RoomImage = tw(
  UserGroupIcon
)`max-w-[32px] max-h-8 p-2 bg-slate-400 rounded-full mr-3 text-white box-content`;
const RoomName = tw.h4`font-Inter text-sm font-bold dark:text-white`;

const InviteList = tw.div`flex flex-col p-5`;
const InviteListRoom = tw.div`px-2 py-3 flex items-center `;

export default RoomList;
