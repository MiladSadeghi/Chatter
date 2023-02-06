import { createSlice } from "@reduxjs/toolkit"



const initialState = {
  currentUser: null,
  token: null,
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { currentUser, accessToken } = action.payload
      state.currentUser = currentUser
      state.token = accessToken
    },
    setToken: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.currentUser = null
      state.token = null
    }
  }
})

export const { setCredentials, logOut, setToken } = authSlice.actions;
export default authSlice.reducer;
