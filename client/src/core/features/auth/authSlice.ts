import { createSlice } from "@reduxjs/toolkit"

type TAuthState = {
  currentUser: null | any,
  token: string | null
}

const initialState: TAuthState = {
  currentUser: null,
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userName, accessToken } = action.payload
      state.currentUser = userName
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
export const selectCurrentToken = (state: any) => state.auth.token;
export default authSlice.reducer;
