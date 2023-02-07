import apiSlice from "../api/apiSlice";

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
  }),
  overrideExisting: true,
})

export const {
  useSignUpMutation,
  useSignInMutation
} = authApiSlice