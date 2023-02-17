import apiSlice from "../api/apiSlice";
import { setToken } from "./authSlice";
import jwt_decode from "jwt-decode";
import { setCredentials } from "../user/userSlice";

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
      })
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
          console.log(decodedAccessToken)
          dispatch(setCredentials({ userID: decodedAccessToken._id, userName: decodedAccessToken.userName }))
          dispatch(setToken({ accessToken }))
        } catch (err) {
          console.log(err)
        }
      }
    }),
  }),
  overrideExisting: true,
})

export const {
  useSignUpMutation,
  useSignInMutation,
  useRefreshMutation
} = authApiSlice