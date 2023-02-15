import { IRoom } from "src/ts/interfaces/room.interfaces";
import apiSlice from "../api/apiSlice";
import { setInviteList, setRooms } from "./userSlice";

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
      })
    })
  })
})

export const { useGetInviteListMutation, useGetUserRoomsMutation, useAcceptRoomInviteMutation } = userApiSlice;