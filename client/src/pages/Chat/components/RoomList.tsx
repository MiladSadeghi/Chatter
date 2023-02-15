import { UserGroupIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectRoom } from "src/core/features/user/userSlice";
import { AppDispatch } from "src/core/store";
import { IRoom } from "src/ts/interfaces/room.interfaces";
import tw from "twin.macro";

const RoomList = () => {
  const rooms: IRoom[] = useSelector((state: any) => state.user.rooms);
  const dispatch: AppDispatch = useDispatch();

  const roomHandler = (roomID: string) => {
    dispatch(selectRoom(roomID));
  };

  return (
    <Wrapper>
      <Header>
        <HeaderText>Message</HeaderText>
        <HeaderCreateRoomLogo />
      </Header>
      {rooms.length === 0 ? (
        <NoRoom>Create A Room</NoRoom>
      ) : (
        <Rooms>
          {rooms.map((room: IRoom) => (
            <Room key={room._id} onClick={() => roomHandler(room._id)}>
              <RoomImage />
              <div className="flex flex-col items-center">
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

export default RoomList;
