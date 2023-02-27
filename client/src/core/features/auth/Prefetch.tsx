import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ChatLoader from "src/common/ChatLoader";
import { useGetRoomsMessageMutation } from "../message/messageApiSlice";
import {
  useGetInviteListMutation,
  useGetUserRoomsMutation,
} from "../user/userApiSlice";

const Prefetch = () => {
  const [
    getUserRooms,
    { isLoading: isLoadingToGetUserRooms, status: getUserRoomsStatus },
  ] = useGetUserRoomsMutation();
  const [
    getInviteList,
    {
      isLoading: isLoadingToGetUserInviteList,
      status: getUserInviteListStatus,
    },
  ] = useGetInviteListMutation();
  const [
    getRoomsMessage,
    { isLoading: isLoadingToGetRoomsMessage, status: getRoomsMessageStatus },
  ] = useGetRoomsMessageMutation();

  useEffect(() => {
    getUserRooms();
    getInviteList();
    getRoomsMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content: any;
  if (
    isLoadingToGetUserRooms &&
    isLoadingToGetUserInviteList &&
    isLoadingToGetRoomsMessage
  ) {
    content = <ChatLoader />;
  } else if (
    (getUserRoomsStatus && getUserInviteListStatus && getRoomsMessageStatus) ===
    "fulfilled"
  ) {
    content = <Outlet />;
  }

  return content;
};

export default Prefetch;
