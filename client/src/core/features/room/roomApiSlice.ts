import { toast } from "react-toastify";
import apiSlice from "../api/apiSlice";
import { addRoom, addUserToBlackList, removeRoom, removeUserFromRoom } from "../user/userSlice";

const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createRoom: builder.mutation({
      query: (name: string) => ({
        url: "api/room",
        method: "POST",
        body: { name }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addRoom(data.room))
        } catch (error) {

        }
      },
    }),
    deleteRoom: builder.mutation({
      query: (roomID: string) => ({
        url: "api/room/delete",
        method: "POST",
        body: { roomID }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(removeRoom(arg));
      }
    }),
    editRoomName: builder.mutation<any, any>({
      query: ({ roomID, newRoomName }: { roomID: string, newRoomName: string }) => ({
        url: "api/room/name",
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
    }),
    kickUser: builder.mutation({
      query: ({ roomID, kickedUserID }: { roomID: string, kickedUserID: string }) => ({
        url: "api/room/kick-user",
        method: "POST",
        body: { roomID, kickedUserID }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(removeUserFromRoom({ roomID: arg.roomID, userID: arg.kickedUserID }))
          toast.success("user kicked successfully")
        } catch (error) {
          toast.success("cant kick user! try again later")
        }
      },
    }),
    unBannedRoomUser: builder.mutation({
      query: ({ roomID, userID }: { roomID: string, userID: string }) => ({
        url: "api/room/unban-user",
        method: "POST",
        body: { bannedUserId: userID, roomID }
      })
    }),
    userLeaveRoom: builder.mutation({
      query: ({ roomID, userID }: { roomID: string, userID: string }) => ({
        url: "api/room/leave",
        method: "POST",
        body: { roomID, userID }
      })
    })
  })
})

export const {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useEditRoomNameMutation,
  useInviteUserMutation,
  useBannedUserMutation,
  useCancelInviteMutation,
  useKickUserMutation,
  useUnBannedRoomUserMutation,
  useUserLeaveRoomMutation
} = roomApiSlice;