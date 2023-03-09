import apiSlice from "../api/apiSlice";
import { logOut, setToken } from "./authSlice";
import jwt_decode from "jwt-decode";
import { setCredentials } from "../user/userSlice";
import { toast } from "react-toastify";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation({
      query: userCredentials => ({
        url: "api/auth/register",
        method: "POST",
        body: { ...userCredentials }
      })
    }),
    signIn: builder.mutation({
      query: userCredentials => ({
        url: "api/auth/login",
        method: "POST",
        body: { ...userCredentials }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data
          dispatch(setToken({ accessToken }))
          const decodedAccessToken: any = jwt_decode(accessToken);
          dispatch(setCredentials({ userID: decodedAccessToken._id, userName: decodedAccessToken.userName }))
        } catch (err) {
          toast.error("Sorry! something bad happened! try again later.")
        }
      }
    }),
    refresh: builder.mutation<any, void>({
      query: () => ({
        url: "api/auth/refresh",
        method: "GET"
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data
          const decodedAccessToken: any = jwt_decode(accessToken);
          dispatch(setCredentials({ userID: decodedAccessToken._id, userName: decodedAccessToken.userName }))
          dispatch(setToken({ accessToken }))
        } catch (err) {
          toast.error("Sorry! you must login again!.")
        }
      }
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: "api/auth/logout",
        method: "GET"
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut())
          toast.success("logged out successfully")
        } catch (error) { }
      }
    })
  }),
  overrideExisting: true,
})

export const {
  useSignUpMutation,
  useSignInMutation,
  useRefreshMutation,
  useLogoutMutation
} = authApiSlice