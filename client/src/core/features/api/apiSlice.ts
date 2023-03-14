import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { logOut, setToken } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers: any, { getState }: any) => {
    const token = getState().auth.token;
    if (token) headers.set("authorization", `Bearer ${token}`)
    return headers;
  },
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result: any = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    const refreshResult = await baseQuery(`api/auth/refresh`, api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(setToken(refreshResult?.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery(`api/auth/logout`, api, extraOptions);
      api.dispatch(logOut({ token: null, authStatus: false }))
    }
  }
  return result;
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
  tagTypes: ["User", "Auth", "Room", "Message"],
  keepUnusedDataFor: 5
})

export default apiSlice;