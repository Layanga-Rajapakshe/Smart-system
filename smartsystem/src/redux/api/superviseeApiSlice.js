import { apiSlice } from "./apiSlice";
import { SUPERVISEE_URL } from "../constants";

export const superviseeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get list of supervisees
    getSupervisees: builder.query({
      query: () => ({
        url: `${SUPERVISEE_URL}/`,
        method: 'GET',
      }),
    }),

    // Get tasks for a specific supervisee
    getSuperviseeTasksById: builder.query({
      query: (id) => ({
        url: `${SUPERVISEE_URL}/${id}`,
        method: 'GET',
      }),
    }),

    // Add comment to a task
    addTaskComment: builder.mutation({
      query: ({ taskId, commentData }) => ({
        url: `${SUPERVISEE_URL}/${taskId}/comment`,
        method: 'PATCH',
        body: commentData,
      }),
    }),
  }),
});

export const {
  useGetSuperviseesQuery,
  useGetSuperviseeTasksByIdQuery,
  useAddTaskCommentMutation,
} = superviseeApiSlice;