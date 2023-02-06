import apiSlice from "../api/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation({
      query: userCredentials => ({
        url: "api/auth/register",
        method: "POST",
        body: { ...userCredentials }
      })
    })
  }),
  overrideExisting: true,
})

export const {
  useSignUpMutation
} = authApiSlice