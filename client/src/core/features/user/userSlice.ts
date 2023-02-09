import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  inviteList: [],
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.rooms = action.payload.rooms;
    },
    setInviteList: (state, action) => {
      state.inviteList = action.payload.inviteList;
    }
  }
})

export const { setRoom, setInviteList } = userSlice.actions;
export default userSlice.reducer;