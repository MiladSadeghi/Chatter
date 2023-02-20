import React, { useState, useEffect, useRef } from "react";
import { IRoom } from "src/ts/interfaces/room.interfaces";
import tw from "twin.macro";
import {
  TRoomBlackList,
  TRoomInviteList,
  TRoomUser,
} from "src/ts/types/room.types";
import { UserIcon } from "@heroicons/react/24/solid";
import styled from "styled-components";
import { IUser } from "src/ts/interfaces/user.interfaces";
import { useSelector } from "react-redux";

const RoomBar = ({ Room }: { Room: IRoom }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(true);
  const [isModerator, setIsModerator] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(1);
  const listsOverflow = useRef<any>();
  const user: IUser = useSelector((state: any) => state.user);

  useEffect(() => {
    const userRole = Room.users.find(
      (roomUser: TRoomUser) => roomUser.userId === user.userID
    );
    if (userRole?.role !== "7610") {
      setIsModerator(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    listsOverflow.current.scrollLeft = listsOverflow.current.clientWidth * tab;
  }, [tab]);

  const changeTab = (tabNumber: number) => setTab(tabNumber);

  return (
    <Wrapper isMenuOpen={isMenuOpen}>
      <Headers>
        <HeaderName tabNumber={1} tabState={tab} onClick={() => changeTab(1)}>
          Directory
        </HeaderName>
        {isModerator && (
          <>
            <HeaderName
              tabNumber={0}
              tabState={tab}
              onClick={() => changeTab(0)}
              className="-order-1 flex"
            >
              Invite List
            </HeaderName>
            <HeaderName
              tabNumber={2}
              tabState={tab}
              onClick={() => changeTab(2)}
            >
              Black List
            </HeaderName>
          </>
        )}
      </Headers>
      <ContentWrapper ref={listsOverflow}>
        <Directory>
          <RoomMembers>
            <Count>
              Room Member <CountNumber>{Room.users.length}</CountNumber>
            </Count>
            {Room.users.map((user: TRoomUser) => (
              <RoomMember key={user.userId}>
                <MemberAvatar />
                <MemberName>{user.userName}</MemberName>
              </RoomMember>
            ))}
          </RoomMembers>
        </Directory>
        {isModerator && (
          <>
            <InviteList>
              {Room.inviteList.length === 0 ? (
                <Clear>Clear</Clear>
              ) : (
                <RoomMembers>
                  <Count>
                    Invite List{" "}
                    <CountNumber>{Room.inviteList.length}</CountNumber>
                  </Count>
                  {Room.inviteList.map((user: TRoomInviteList) => (
                    <RoomMember key={user._id}>
                      <MemberAvatar />
                      <MemberName>{user.name}</MemberName>
                    </RoomMember>
                  ))}
                </RoomMembers>
              )}
            </InviteList>
            <BlackList>
              {Room.blackList.length === 0 ? (
                <Clear>Clear</Clear>
              ) : (
                <RoomMembers>
                  <Count>
                    Black List{" "}
                    <CountNumber>{Room.blackList.length}</CountNumber>
                  </Count>
                  {Room.blackList.map((user: TRoomBlackList) => (
                    <RoomMember key={user._id}>
                      <MemberAvatar />
                      <MemberName>{user.name}</MemberName>
                    </RoomMember>
                  ))}
                </RoomMembers>
              )}
            </BlackList>
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${tw`ease-in-out duration-300 border-l flex flex-col `};
  ${({ isMenuOpen }: { isMenuOpen: Boolean }) =>
    isMenuOpen ? tw`min-w-[20%]` : tw`w-20`}
`;

const Headers = tw.div`flex items-center justify-between w-full min-h-[80px] border-b px-4`;

const HeaderName = styled.h3`
  ${tw`font-Inter font-bold transition-none ease-in-out duration-200 transition-[color, font-size] cursor-pointer`} ${({
    tabNumber,
    tabState,
  }: {
    tabNumber: number;
    tabState: number;
  }) =>
    tabNumber === tabState ? tw`text-xl text-black` : tw`text-gray-500 text-xs`}
`;

const Count = tw.h5`font-bold font-Inter text-sm flex items-center mb-2`;
const CountNumber = tw.span`bg-gray-200 rounded-full w-6 h-6 text-center ml-2 text-xs flex items-center justify-center`;

const RoomMembers = tw.div`px-3 py-4 overflow-auto h-full`;
const RoomMember = tw.div`px-2 py-3 flex items-center `;
const MemberName = tw.h3`text-sm font-Inter ml-3 font-semibold`;
const MemberAvatar = tw(
  UserIcon
)`w-12 h-12 bg-slate-400 text-white rounded-xl p-2`;

const ContentWrapper = tw.div`relative flex h-full w-full overflow-hidden scroll-smooth`;
const Directory = tw.div`absolute h-full w-full left-full`;
const InviteList = tw.div`absolute h-full w-full left-0 -order-1 flex`;
const BlackList = tw.div`absolute h-full w-full left-[200%]`;

const Clear = tw.div`h-full w-full flex items-center justify-center font-bold text-xl font-Inter text-slate-400`;

export default RoomBar;
