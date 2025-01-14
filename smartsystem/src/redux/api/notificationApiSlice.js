import { apiSlice } from "./apiSlice";
import { NOTIFICATIONS_URL } from "../constants";

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get notifications for the logged-in user
    getNotifications: builder.query({
      query: () => ({
        url: `${NOTIFICATIONS_URL}`,
        method: 'GET',
      }),
      providesTags: ['Notification'],
    }),

    // Mark notifications as read
    markNotificationsAsRead: builder.mutation({
      query: () => ({
        url: `${NOTIFICATIONS_URL}/mark-read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationsAsReadMutation,
} = notificationsApiSlice;