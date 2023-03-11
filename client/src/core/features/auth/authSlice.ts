import { createSlice } from "@reduxjs/toolkit"

type TAuthState = {
  token: string | null,
  isAuthenticated: Boolean,
  authLoading: Boolean
}

const initialState: TAuthState = {
  token: null,
  isAuthenticated: false,
  authLoading: true
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
      state.isAuthenticated = true;
    },
    logOut: (state, action) => {
      const { token, authStatus } = action.payload;
      state.token = token
      state.isAuthenticated = authStatus
    },
    setUserAuthenticated: (state, action) => {
      state.authLoading = false;
      state.isAuthenticated = action.payload;
    }
  }
})

export const { logOut, setToken, setUserAuthenticated } = authSlice.actions;
export const selectCurrentToken = (state: any) => state.auth.token;
export const userIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const userAuthLoading = (state: any) => state.auth.authLoading;
export default authSlice.reducer;
