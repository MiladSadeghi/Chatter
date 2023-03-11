import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import ChatLoader from "src/common/ChatLoader";
import { useGetRoomsMessageMutation } from "../message/messageApiSlice";
import {
  useGetInviteListMutation,
  useGetUserRoomsMutation,
} from "../user/userApiSlice";
import { userAuthLoading, userIsAuthenticated } from "./authSlice";

const Prefetch = () => {
  const navigate = useNavigate();
  const isUpdated = useRef(false);
  const isAuthenticated = useSelector(userIsAuthenticated);
  const isAuthLoading = useSelector(userAuthLoading);

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
    if (!isAuthLoading) {
      if (isAuthenticated) {
        getUserRooms();
        getInviteList();
        getRoomsMessage();
      } else {
        console.log(isAuthenticated, isAuthLoading);
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthLoading]);

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
