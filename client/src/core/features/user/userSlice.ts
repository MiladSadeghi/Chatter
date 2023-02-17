import { createSlice } from "@reduxjs/toolkit";
import { IRoom } from "src/ts/interfaces/room.interfaces"

// type initial state
type TIS = {
  rooms: IRoom[],
  inviteList: Array<string>,
  selectedRoomID: null | string,
  directoryIsOpen: Boolean,
  userName: string,
  userID: string
}

const initialState: TIS = {
  rooms: [],
  inviteList: [],
  selectedRoomID: null,
  directoryIsOpen: false,
  userName: "",
  userID: ""
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setInviteList: (state, action) => {
      state.inviteList = action.payload.inviteList;
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
    }
  }
})

export const { setRooms, setInviteList, selectRoom, setDirectory, setCredentials } = userSlice.actions;
export default userSlice.reducer;