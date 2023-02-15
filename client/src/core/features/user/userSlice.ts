import { createSlice } from "@reduxjs/toolkit";
import { IRoom } from "src/ts/interfaces/room.interfaces"

// type initial state
type TIS = {
  rooms: IRoom[],
  inviteList: Array<string>,
  selectedRoomID: null | string,
  directoryIsOpen: Boolean
}

const initialState: TIS = {
  rooms: [],
  inviteList: [],
  selectedRoomID: null,
  directoryIsOpen: false,
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
    }
  }
})

export const { setRooms, setInviteList, selectRoom, setDirectory } = userSlice.actions;
export default userSlice.reducer;