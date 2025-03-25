import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SUPERVISOR_URL } from "../constants";

export const supervisorApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: SUPERVISOR_URL }),
    endpoints: (builder) => ({
        getSupervisees: builder.query({
            query: () => ({
                url: `/`,
                method: 'GET',
            }),
        }),
        getSuperviseeTasks: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
        }),
        addComment: builder.mutation({
            query: ({ taskId, comment }) => ({
                url: `/${taskId}/comment`,
                method: 'PATCH',
                body: { comment },
            }),
        }),
    }),
});

export const { 
    useGetSuperviseesQuery, 
    useGetSuperviseeTasksQuery, 
    useAddCommentMutation 
} = supervisorApiSlice;
