import {
  CheckCircleIcon,
  UserGroupIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectRoom } from "src/core/features/user/userSlice";
import { AppDispatch } from "src/core/store";
import { IRoom } from "src/ts/interfaces/room.interfaces";
import { IUser } from "src/ts/interfaces/user.interfaces";
import { TRoomInviteList } from "src/ts/types/room.types";
import tw from "twin.macro";
import {
  useAcceptRoomInviteMutation,
  useIgnoreRoomInviteMutation,
} from "src/core/features/user/userApiSlice";

const RoomList = () => {
  const user: IUser = useSelector((state: any) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const [acceptRoomInvite] = useAcceptRoomInviteMutation();
  const [ignoreRoomInvite] = useAcceptRoomInviteMutation();

  const roomHandler = (roomID: string) => {
    dispatch(selectRoom(roomID));
  };

  const acceptInvite = async (roomID: string) => {
    await acceptRoomInvite(roomID);
  };

  const ignoreInvite = async (roomID: string) => {
    await ignoreRoomInvite(roomID);
  };

  return (
    <Wrapper>
      <Header>
        <HeaderText>Message</HeaderText>
        <HeaderCreateRoomLogo />
      </Header>
      {user.inviteList.length !== 0 && (
        <InviteList>
          <div className="rounded-lg bg-my-light-purple/[0.5] p-5">
            <p className="font-Inter text-base font-bold text-white">
              You Are Invited To:
            </p>
            {user.inviteList.map((invitedRoom: TRoomInviteList) => (
              <InviteListRoom key={invitedRoom._id}>
                <Room className="w-full rounded-lg bg-white px-2 py-3">
                  <RoomImage />
                  <div className="flex w-full items-center justify-between">
                    <RoomName>{invitedRoom.name}</RoomName>
                    <div className="flex">
                      <CheckCircleIcon
                        width={24}
                        className="mr-1 rounded-full bg-green-600 text-white"
                        onClick={() => acceptInvite(invitedRoom._id)}
                      />
                      <XCircleIcon
                        width={24}
                        className="rounded-full bg-red-600 text-white"
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
        <NoRoom>Create A Room</NoRoom>
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

const Wrapper = tw.div`min-w-[20%] h-full border-r flex flex-col`;
const Header = tw.div`p-5 flex items-center justify-between border-b`;
const HeaderText = tw.h5`font-Inter font-semibold text-xl`;
const HeaderCreateRoomLogo = tw(PlusCircleIcon)`h-12 w-12 text-my-light-purple`;
const NoRoom = tw.h5`text-xl font-bold text-slate-600`;
const Rooms = tw.div`p-5 flex flex-col scrollbar-thumb-my-light-purple/[.40] scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded-md`;
const Room = tw.div`flex mb-10 last:mb-0 cursor-pointer`;
const RoomImage = tw(
  UserGroupIcon
)`w-10 h-10 p-2 bg-slate-400 rounded-full mr-3 text-white`;
const RoomName = tw.h4`font-Inter text-sm font-bold`;

const InviteList = tw.div`flex flex-col p-5`;
const InviteListRoom = tw.div`px-2 py-3 flex items-center `;

export default RoomList;
