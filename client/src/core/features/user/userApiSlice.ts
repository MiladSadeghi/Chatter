import { toast } from "react-toastify";
import { IRoom } from "src/ts/interfaces/room.interfaces";
import apiSlice from "../api/apiSlice";
import { acceptInvite, setInviteList, setRooms } from "./userSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getInviteList: builder.mutation<any, void>({
      query: () => ({
        url: "api/user/invited-list",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: inviteList }: { data: Array<string> } = await queryFulfilled;
          dispatch(setInviteList(inviteList));
        } catch (error) {
        }
      }
    }),
    getUserRooms: builder.mutation<any, void>({
      query: () => ({
        url: "api/user/rooms",
        method: "GET"
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: rooms }: { data: IRoom } = await queryFulfilled;
          dispatch(setRooms(rooms))
        } catch (error) {
        }
      }
    }),
    acceptRoomInvite: builder.mutation({
      query: (roomID: string) => ({
        url: "api/user/accept-invite",
        method: "POST",
        body: { roomID }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(acceptInvite({ room: data.room, roomID: data.room._id }))
        } catch (error) {
          toast.error("cant accept the invite")
        }
      }
    }),
    ignoreRoomInvite: builder.mutation({
      query: (roomID: string) => ({
        url: "/user/ignore-invite",
        method: "POST",
        body: { roomID }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(acceptInvite({ room: data.room, roomID: data.room._id }))
        } catch (error) {
          toast.error("cant accept the invite")
        }
      }
    })
  })
})

export const { useGetInviteListMutation, useGetUserRoomsMutation, useAcceptRoomInviteMutation, useIgnoreRoomInviteMutation } = userApiSlice;