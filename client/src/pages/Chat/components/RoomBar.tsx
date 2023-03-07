import React, { useState, useEffect, useRef, Fragment } from "react";
import { IRoom } from "src/ts/interfaces/room.interfaces";
import tw from "twin.macro";
import {
  TRoomBlackList,
  TRoomInviteList,
  TRoomSearchUser,
  TRoomUser,
} from "src/ts/types/room.types";
import { EllipsisVerticalIcon, UserIcon } from "@heroicons/react/24/solid";
import styled from "styled-components";
import { IUser } from "src/ts/interfaces/user.interfaces";
import { useSelector } from "react-redux";
import { useUserSearchMutation } from "src/core/features/user/userApiSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlass, Oval } from "react-loader-spinner";
import { UserPlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import {
  useKickUserMutation,
  useCancelInviteMutation,
  useInviteUserMutation,
  useBannedUserMutation,
  useUnBannedRoomUserMutation,
} from "src/core/features/room/roomApiSlice";
import {
  addUserToBlackList,
  addUserToRoomInviteList,
  deleteFromRoomInviteList,
  ignoreInvite,
  removeUserFromBlacklist,
} from "src/core/features/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Menu, Transition } from "@headlessui/react";

const RoomBar = ({ RoomID, socket }: { RoomID: string; socket: any }) => {
  const dispatch = useDispatch();
  const Room: IRoom = useSelector((state: any) => state.user.rooms).find(
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
  const [kickUser] = useKickUserMutation();
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [userSearchData, setUserSearchData] = useState<
    unknown | TRoomInviteList[]
  >();
  const [cancelInvite] = useCancelInviteMutation();
  const [bannedUser] = useBannedUserMutation();
  const [unBannedRoomUser] = useUnBannedRoomUserMutation();

  useEffect(() => {
    const userRole = Room.users.find(
      (roomUser: TRoomUser) => roomUser.userId === user.userID
    );
    if (userRole?.role !== "7610") {
      setIsModerator(true);
    }

    socket.on("invite canceled by admin", (roomID: string) => {
      dispatch(ignoreInvite(roomID));
    });
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
      const inviteData = { id: userID, name: userName, roomID: Room._id };
      dispatch(addUserToRoomInviteList(inviteData));
      socket.emit("send invite", {
        users: Room.users,
        inviteData,
        roomName: Room.name,
      });
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
      socket.emit("admin cancel invite", { roomID: RoomID, userID });
    } catch (error) {
      toast.error("Sorry! try again later.");
    }
  };

  const kickHandler = async (userID: string) => {
    try {
      await kickUser({ roomID: RoomID, kickedUserID: userID });
      socket.emit("user kick", { RoomID, userID });
    } catch (error) {}
  };

  const banHandler = async ({ userID, userName, roomID }: any) => {
    try {
      await bannedUser({ roomID, bannedUserId: userID });
      dispatch(addUserToBlackList({ userID, userName, roomID }));
      socket.emit("ban user", { roomID: RoomID, userID, roomName: Room.name });
    } catch (error) {}
  };

  const unbanHandler = async (userID: any) => {
    try {
      await unBannedRoomUser({ roomID: RoomID, userID });
      dispatch(removeUserFromBlacklist({ roomID: RoomID, userID }));
    } catch (error) {}
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
            {Room.users.map((roomUser: TRoomUser) => (
              <RoomMember key={roomUser.userId}>
                <MemberAvatar />
                <MemberName>{roomUser.userName}</MemberName>
                {isModerator && roomUser.userId !== user.userID && (
                  <Menu
                    as="div"
                    className="relative ml-auto inline-block text-left"
                  >
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-500 bg-gray-200 px-2 py-2 text-sm font-medium shadow-sm  hover:bg-gray-300">
                        <EllipsisVerticalIcon className="h-5 w-5 text-black" />
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
                          <Menu.Item>
                            {({ active }) => (
                              <h5
                                className={`"block text-sm" cursor-pointer rounded-md px-4 py-2 font-Inter ${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                }`}
                                onClick={() => kickHandler(roomUser.userId)}
                              >
                                Kick
                              </h5>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <h5
                                className={`"block text-sm" cursor-pointer rounded-md px-4 py-2 font-Inter ${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                }`}
                                onClick={() =>
                                  banHandler({
                                    userID: roomUser.userId,
                                    userName: roomUser.userName,
                                    roomID: Room._id,
                                  })
                                }
                              >
                                Ban
                              </h5>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
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
                                    className="ml-auto mr-2 w-6 cursor-pointer font-bold text-gray-800 dark:text-white"
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
                    <RoomMember key={user._id}>
                      <MemberAvatar />
                      <MemberName>{user.name}</MemberName>
                      <XCircleIcon
                        className="ml-auto w-6 cursor-pointer rounded-full bg-red-500 text-white"
                        onClick={() => cancelInviteHandler(user._id)}
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
                    <RoomMember key={user._id}>
                      <MemberAvatar />
                      <MemberName>{user.name}</MemberName>
                      <XCircleIcon
                        className="ml-auto w-6 cursor-pointer rounded-full bg-red-500 text-white"
                        onClick={() => unbanHandler(user._id)}
                      />
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
  ${tw`font-Inter font-bold transition-none ease-in-out duration-200 transition-[color, font-size] cursor-pointer text-gray-500 text-xs`} ${({
    tabNumber,
    tabState,
  }: {
    tabNumber: number;
    tabState: number;
  }) => tabNumber === tabState && tw`!text-xl !text-black dark:!text-white`}
`;

const Count = tw.h5`font-bold font-Inter text-sm flex items-center mb-2 dark:text-white`;
const CountNumber = tw.span`bg-gray-200 rounded-full w-6 h-6 text-center ml-2 text-xs flex items-center justify-center text-black`;

const RoomMembers = tw.div`overflow-auto h-full`;
const RoomMember = tw.div`px-2 py-3 flex items-center `;
const MemberName = tw.h3`text-sm font-Inter ml-3 font-semibold dark:text-white`;
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
const SearchErrorMessage = tw.p`font-semibold text-xl text-black text-center px-4 py-2 font-Inter dark:text-white`;

export default RoomBar;
