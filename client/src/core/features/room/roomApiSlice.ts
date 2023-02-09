import apiSlice from "../api/apiSlice";

const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createRoom: builder.mutation({
      query: (name: string) => ({
        url: "api/room",
        method: "POST",
        body: { name }
      })
    }),
    deleteRoom: builder.mutation({
      query: (roomID: string) => ({
        url: "api/room/delete",
        method: "POST",
        body: { roomID }
      })
    }),
    editRoomName: builder.mutation({
      query: (userData: any) => ({
        url: "api/room/delete",
        method: "POST",
        body: { roomID: userData.roomID, newRoomName: userData.newRoomName }
      })
    }),
    inviteUser: builder.mutation({
      query: (userData: any) => ({
        url: "api/room/invite",
        method: "PUT",
        body: { roomID: userData.roomID, invitedUserId: userData.invitedUserId }
      })
    }),
    bannedUser: builder.mutation({
      query: (userData: any) => ({
        url: "api/room/blacklist",
        method: "PUT",
        body: { roomID: userData.roomID, bannedUserId: userData.bannedUserId }
      })
    })
  })
})

export const {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useEditRoomNameMutation,
  useInviteUserMutation,
  useBannedUserMutation
} = roomApiSlice;