import React, { useState } from "react";
import { IRoom } from "src/ts/interfaces/room.interfaces";
import styled from "styled-components";
import tw from "twin.macro";
import { TRoomUser } from "src/ts/types/room.types";
import { UserIcon } from "@heroicons/react/24/solid";

const Directory = ({ Room }: { Room: IRoom }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(true);
  return (
    <Wrapper isMenuOpen={isMenuOpen}>
      <DirectoryHeader>
        <DirectoryHeaderName>Directory</DirectoryHeaderName>
      </DirectoryHeader>
      <RoomMembers>
        <UserCount>
          Room Member <UserCountNumber>{Room.users.length}</UserCountNumber>
        </UserCount>
        {Room.users.map((user: TRoomUser) => (
          <RoomMember>
            <MemberAvatar />
            <MemberName>{user.userName}</MemberName>
          </RoomMember>
        ))}
      </RoomMembers>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${tw`ease-in-out duration-300 border-l flex flex-col`};
  ${({ isMenuOpen }: { isMenuOpen: Boolean }) =>
    isMenuOpen ? tw`min-w-[20%]` : tw`w-20`}
`;
const DirectoryHeader = tw.div`min-h-[80px] px-4 border-b flex items-center`;
const DirectoryHeaderName = tw.h3`font-Inter font-bold text-xl`;
const RoomMembers = tw.div`px-3 py-4 overflow-auto h-full`;
const UserCount = tw.h5`font-bold font-Inter text-sm flex items-center mb-2`;
const UserCountNumber = tw.span`bg-gray-200 rounded-full w-6 h-6 text-center ml-2 text-xs flex items-center justify-center`;
const RoomMember = tw.div`px-2 py-3 flex items-center `;
const MemberName = tw.h3`text-sm font-Inter ml-3 font-semibold`;
const MemberAvatar = tw(
  UserIcon
)`w-12 h-12 bg-slate-400 text-white rounded-xl p-2`;

export default Directory;
