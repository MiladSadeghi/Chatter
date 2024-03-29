import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "src/ts/interfaces/user.interfaces";
import { TRoomInviteList, TRoomUser } from "src/ts/types/room.types";
import { IRoom } from "src/ts/interfaces/room.interfaces";
import { TUserInviteList } from "src/ts/types/user.types";

const initialState: IUser = {
  rooms: [],
  inviteList: [],
  selectedRoomID: null,
  directoryIsOpen: false,
  userName: null,
  userID: null,
  isCreateRoomModalShow: false,
  messages: []
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setInviteList: (state, action) => {
      state.inviteList = action.payload;
    },
    selectRoom: (state, action) => {
      state.selectedRoomID = action.payload;
    },
    setDirectory: (state, action) => {
      state.directoryIsOpen = action.payload;
    },
    setCredentials: (state, action) => {
      const { payload } = action;
      state.userName = payload.userName;
      state.userID = payload.userID;
    },
    acceptInvite: (state, action) => {
      const { payload } = action;
      const inviteList = state.inviteList.filter((invite: TUserInviteList) => invite._id !== payload.roomID);
      state.rooms.push(payload.room);
      state.inviteList = inviteList;
    },
    ignoreInvite: (state: IUser, action) => {
      const { payload } = action;
      state.inviteList = state.inviteList.filter((invite: TUserInviteList) => invite._id !== payload);
    },
    addUserToRoomInviteList: (state, action) => {
      const { payload } = action;
      const roomIndex = state.rooms.findIndex((room: IRoom) => room._id === payload.roomID);
      state.rooms[roomIndex].inviteList = [...state.rooms[roomIndex].inviteList, { _id: payload.id, name: payload.name }]
    },
    deleteFromRoomInviteList: (state, action) => {
      const { payload } = action;
      const roomIndex = state.rooms.findIndex((room: IRoom) => room._id === payload.roomID);
      state.rooms[roomIndex].inviteList = state.rooms[roomIndex].inviteList.filter((invitedUser: TRoomInviteList) => invitedUser._id !== payload.userID);
    },
    toggleCreateRoomModal: (state) => {
      state.isCreateRoomModalShow = !state.isCreateRoomModalShow;
    },
    addRoom: (state, action) => {
      state.rooms.push(action.payload)
    },
    addToInviteList: (state, action) => {
      const isInvited = state.inviteList.find((invite: TUserInviteList) => invite._id === action.payload._id);
      if (!isInvited) {
        state.inviteList = [...state.inviteList, action.payload]
      }
    },
    removeUserFromRoom: (state, action) => {
      const { payload } = action;
      const roomIndex = state.rooms.findIndex((room: IRoom) => room._id === payload.roomID);
      state.rooms[roomIndex].users = state.rooms[roomIndex].users.filter((user: TRoomUser) => user.userId !== payload.userID)
    },
    removeRoom: (state, action) => {
      const { payload } = action;
      state.rooms = state.rooms.filter((room: IRoom) => room._id !== payload)
    },
    userJoinedRoom: (state, action) => {
      const { payload } = action;
      const roomIndex = state.rooms.findIndex((room: IRoom) => room._id === payload.roomID);
      state.rooms[roomIndex].inviteList = state.rooms[roomIndex].inviteList.filter((invitedUser: TRoomInviteList) => invitedUser._id !== payload.userID);
      state.rooms[roomIndex].users.push({ role: "7610", userId: payload.userID, userName: payload.userName })
    },
    addUserToBlackList: (state, action) => {
      const { payload } = action;
      const roomIndex = state.rooms.findIndex((room: IRoom) => room._id === payload.roomID);
      state.rooms[roomIndex].blackList.push({ _id: payload.userID, name: payload.userName });
      state.rooms[roomIndex].users = state.rooms[roomIndex].users.filter((user: TRoomUser) => user.userId !== payload.userID)
    },
    removeUserFromBlacklist: (state, action) => {
      const { payload } = action;
      const roomIndex = state.rooms.findIndex((room: IRoom) => room._id === payload.roomID);
      state.rooms[roomIndex].blackList = state.rooms[roomIndex].blackList.filter((bannedUser) => bannedUser._id !== payload.userID)
    },
    changeRoomName: (state, action) => {
      const { payload } = action;
      const roomIndex = state.rooms.findIndex((room: IRoom) => room._id === payload.roomID);
      state.rooms[roomIndex].name = payload.newRoomName;
    },
    setRoomMessages: (state, action) => {
      const { payload } = action;
      const roomIndex = state.rooms.findIndex((room: IRoom) => room._id === payload.roomID);
      state.rooms[roomIndex].messages = payload.messages;
    },
    addRoomMessage: (state, action) => {
      const { payload } = action;
      const roomIndex = state.rooms.findIndex((room: IRoom) => room._id === payload.roomID);
      state.rooms[roomIndex].messages.push(payload.newMessage)
    },
  }
})

export const { setRooms, setInviteList, selectRoom, setDirectory, setCredentials, acceptInvite, ignoreInvite, addUserToRoomInviteList, deleteFromRoomInviteList, toggleCreateRoomModal, addRoom, addToInviteList, removeUserFromRoom, removeRoom, userJoinedRoom, addUserToBlackList, removeUserFromBlacklist, changeRoomName, setRoomMessages, addRoomMessage } = userSlice.actions;
export default userSlice.reducer;