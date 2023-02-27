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
    editRoomName: builder.mutation<any, any>({
      query: ({ roomID, newRoomName }: { roomID: string, newRoomName: string }) => ({
        url: "api/room/delete",
        method: "POST",
        body: { roomID, newRoomName }
      })
    }),
    inviteUser: builder.mutation({
      query: ({ roomID, invitedUserId }: { roomID: string, invitedUserId: string }) => ({
        url: "api/room/invite",
        method: "PUT",
        body: { roomID, invitedUserId }
      })
    }),
    bannedUser: builder.mutation({
      query: ({ roomID, bannedUserId }: { roomID: string, bannedUserId: string }) => ({
        url: "api/room/blacklist",
        method: "PUT",
        body: { roomID, bannedUserId }
      })
    }),
    cancelInvite: builder.mutation<any, any>({
      query: ({ roomID, canceledUserId }: { roomID: string, canceledUserId: string }) => ({
        url: "api/room/cancel-invite",
        method: "POST",
        body: { roomID, canceledUserId }
      }),
    })
  })
})

export const {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useEditRoomNameMutation,
  useInviteUserMutation,
  useBannedUserMutation,
  useCancelInviteMutation
} = roomApiSlice;