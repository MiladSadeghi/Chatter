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
  let result = await baseQuery(args, api, extraOptions);
  console.log(result)
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(setToken(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery('auth/logout', api, extraOptions);
      api.dispatch(logOut());
    }
  }
  return result;
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
  tagTypes: ["User", "Auth"],
  keepUnusedDataFor: 5
})

export default apiSlice;