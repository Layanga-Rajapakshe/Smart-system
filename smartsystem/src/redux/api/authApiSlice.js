import { apiSlice } from "./apiSlice";
import { AUTH_URL } from "../constants";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
              url: `${AUTH_URL}/logout`,
              method: "POST",
            }),
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/update-password`,
                method: 'POST',
                body: data,
            }),
        }),
    }),

})

export const {
    useLoginMutation,
    useLogoutMutation,
    useUpdatePasswordMutation
  } = authApiSlice;