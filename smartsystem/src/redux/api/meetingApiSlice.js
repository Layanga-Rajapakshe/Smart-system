import { apiSlice } from "./apiSlice";
import { MEETING_URL } from "../constants";

export const meetingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all meetings
    getMeetings: builder.query({
      query: () => ({
        url: `${MEETING_URL}/`,
        method: 'GET',
      }),
    }),

    // Get meeting by id
    getMeetingById: builder.query({
      query: (id) => ({
        url: `${MEETING_URL}/${id}`,
        method: 'GET',
      }),
    }),

    // Create a new meeting
    createMeeting: builder.mutation({
      query: (meetingData) => ({
        url: `${MEETING_URL}/`,
        method: 'POST',
        body: meetingData,
      }),
    }),

    // Update a meeting
    updateMeeting: builder.mutation({
      query: ({ id, meetingData }) => ({
        url: `${MEETING_URL}/${id}`,
        method: 'PUT',
        body: meetingData,
      }),
    }),

    // Delete a meeting
    deleteMeeting: builder.mutation({
      query: (id) => ({
        url: `${MEETING_URL}/${id}`,
        method: 'DELETE',
      }),
    }),

    // Add discussion points to a meeting
    addDiscussionPoints: builder.mutation({
      query: ({ id, discussionPoints }) => ({
        url: `${MEETING_URL}/${id}/discussion-points`,
        method: 'PATCH',
        body: { discussionPoints },
      }),
    }),

    // Get meetings by project id
    getMeetingsByProjectId: builder.query({
      query: (projectId) => ({
        url: `${MEETING_URL}/project/${projectId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetMeetingsQuery,
  useGetMeetingByIdQuery,
  useCreateMeetingMutation,
  useUpdateMeetingMutation,
  useDeleteMeetingMutation,
  useAddDiscussionPointsMutation,
  useGetMeetingsByProjectIdQuery,
} = meetingApiSlice;