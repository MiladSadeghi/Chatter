import apiSlice from "../api/apiSlice";
import { setCredentials } from "./authSlice";
import jwt_decode from "jwt-decode";

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
          dispatch(setCredentials({ accessToken, userName: decodedAccessToken.userName }))
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