import { url } from "inspector";
import apiSlice from "../api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getInviteList: builder.mutation<any, void>({
      query: () => ({
        url: "api/user/invited-list",
        method: "GET",
      })
    }),
    getUserRooms: builder.mutation<any, void>({
      query: () => ({
        url: "api/user/rooms",
        method: "GET"
      })
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