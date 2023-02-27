import React, { useState, useEffect, useRef } from "react";
import { IRoom } from "src/ts/interfaces/room.interfaces";
import tw from "twin.macro";
import {
  TRoomBlackList,
  TRoomInviteList,
  TRoomSearchUser,
  TRoomUser,
} from "src/ts/types/room.types";
import { UserIcon } from "@heroicons/react/24/solid";
import styled from "styled-components";
import { IUser } from "src/ts/interfaces/user.interfaces";
import { useSelector } from "react-redux";
import { useUserSearchMutation } from "src/core/features/user/userApiSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlass, Oval } from "react-loader-spinner";
import { UserPlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import {
  useCancelInviteMutation,
  useInviteUserMutation,
} from "src/core/features/room/roomApiSlice";
import {
  addUserToRoomInviteList,
  deleteFromRoomInviteList,
} from "src/core/features/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const RoomBar = ({ RoomID }: { RoomID: string }) => {
  const dispatch = useDispatch();
  const Room = useSelector((state: any) => state.user.rooms).find(
    (room: IRoom) => room._id === RoomID
  );
  const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(true);
  const [isModerator, setIsModerator] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(1);
  const listsOverflow = useRef<any>();
  const user: IUser = useSelector((state: any) => state.user);
  const [userSearch, { data, isLoading, isError, error, isUninitialized }] =
    useUserSearchMutation();
  const [inviteUser, { isLoading: inviteUserLoading, originalArgs }] =
    useInviteUserMutation();
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [userSearchData, setUserSearchData] = useState<
    unknown | TRoomInviteList[]
  >();
  const [cancelInvite] = useCancelInviteMutation();

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

  useEffect(() => {
    setUserSearchData(data);
  }, [data]);

  const changeTab = (tabNumber: number) => setTab(tabNumber);

  const handleSearch = async () => {
    if (searchInputValue !== "") {
      try {
        await userSearch({
          query: searchInputValue,
          roomID: Room._id,
        }).unwrap();
      } catch (error) {}
    }
  };

  const handleInvite = async (userID: string, userName: string) => {
    try {
      await inviteUser({ roomID: Room._id, invitedUserId: userID }).unwrap();
      dispatch(
        addUserToRoomInviteList({
          id: userID,
          name: userName,
          roomID: Room._id,
        })
      );
      setUserSearchData((userSearch: any) => {
        return userSearch.filter((user: any) => user._id !== userID);
      });
      toast.success("User invited successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const cancelInviteHandler = async (userID: string) => {
    try {
      await cancelInvite({ roomID: RoomID, canceledUserId: userID });
      dispatch(deleteFromRoomInviteList({ roomID: RoomID, userID }));
    } catch (error) {
      toast.error("Sorry! try again later.");
    }
  };

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
              <Search>
                <SearchInput
                  type="text"
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                  placeholder="search..."
                />
                <SearchButton onClick={handleSearch} />
                {!isUninitialized && (
                  <SearchResponse>
                    {isLoading ? (
                      <SearchRLoading>
                        <MagnifyingGlass
                          height="80"
                          width="80"
                          color="#625BF7"
                        />
                      </SearchRLoading>
                    ) : isError ? (
                      <SearchErrorMessage>{error.data}</SearchErrorMessage>
                    ) : (
                      (userSearchData as TRoomSearchUser[]) && (
                        <>
                          {(userSearchData as TRoomSearchUser[]).map(
                            (user: TRoomSearchUser) => (
                              <RoomMember key={user._id}>
                                <MemberAvatar />
                                <MemberName>{user.userName}</MemberName>
                                {inviteUserLoading &&
                                originalArgs?.invitedUserId === user._id ? (
                                  <Oval
                                    width={24}
                                    height={24}
                                    strokeWidth={6}
                                    strokeWidthSecondary={6}
                                    color="#625BF7"
                                    secondaryColor="#8ba3af"
                                    wrapperClass="ml-auto mr-2"
                                  />
                                ) : (
                                  <UserPlusIcon
                                    className="ml-auto mr-2 w-6 cursor-pointer font-bold text-gray-800"
                                    onClick={() =>
                                      handleInvite(user._id, user.userName)
                                    }
                                  />
                                )}
                              </RoomMember>
                            )
                          )}
                        </>
                      )
                    )}
                  </SearchResponse>
                )}
              </Search>
              {Room.inviteList.length === 0 ? (
                <Clear>Nope!</Clear>
              ) : (
                <RoomMembers>
                  <Count>
                    Invite List{" "}
                    <CountNumber>{Room.inviteList.length}</CountNumber>
                  </Count>
                  {Room.inviteList.map((user: TRoomInviteList) => (
                    <RoomMember key={user.id}>
                      <MemberAvatar />
                      <MemberName>{user.name}</MemberName>
                      <XCircleIcon
                        className="ml-auto w-6 cursor-pointer rounded-full bg-red-500 text-white"
                        onClick={() => cancelInviteHandler(user.id)}
                      />
                    </RoomMember>
                  ))}
                </RoomMembers>
              )}
            </InviteList>
            <BlackList>
              {Room.blackList.length === 0 ? (
                <Clear>Nope!</Clear>
              ) : (
                <RoomMembers>
                  <Count>
                    Black List{" "}
                    <CountNumber>{Room.blackList.length}</CountNumber>
                  </Count>
                  {Room.blackList.map((user: TRoomBlackList) => (
                    <RoomMember key={user.id}>
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

const RoomMembers = tw.div`overflow-auto h-full`;
const RoomMember = tw.div`px-2 py-3 flex items-center `;
const MemberName = tw.h3`text-sm font-Inter ml-3 font-semibold`;
const MemberAvatar = tw(
  UserIcon
)`w-12 h-12 bg-slate-400 text-white rounded-xl p-2`;

const ContentWrapper = tw.div`relative flex h-full w-full overflow-hidden scroll-smooth`;
const Directory = tw.div`absolute h-full w-full left-full px-3 py-4`;
const InviteList = tw.div`absolute h-full w-full left-0 -order-1 flex flex-col px-3 py-4`;
const BlackList = tw.div`absolute h-full w-full left-[200%] px-3 py-4`;

const Clear = tw.div`h-full w-full flex items-center justify-center font-bold text-xl font-Inter text-slate-400`;

const Search = tw.div` mb-4 flex items-center flex-col relative`;
const SearchInput = tw.input`px-2 py-1 border border-gray-200 border-solid rounded w-full cursor-text`;
const SearchButton = tw(
  MagnifyingGlassIcon
)`w-5 h-5 absolute right-3 top-[7px] text-gray-400 cursor-pointer`;
const SearchResponse = tw.div`w-full rounded bg-my-light-purple/[0.5] mt-4 `;
const SearchRLoading = tw.div`py-4  flex items-center justify-center`;
const SearchErrorMessage = tw.p`font-semibold text-xl text-black text-center px-4 py-2 font-Inter`;

export default RoomBar;
