import { createSlice } from "@reduxjs/toolkit"

type TAuthState = {
  token: string | null
}

const initialState: TAuthState = {
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.token = null
    }
  }
})

export const { logOut, setToken } = authSlice.actions;
export const selectCurrentToken = (state: any) => state.auth.token;
export default authSlice.reducer;
