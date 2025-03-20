import { apiSlice } from "./apiSlice";
import { ATTENDANCE_URL } from "../constants";

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Upload attendance Excel sheet
    uploadAttendance: builder.mutation({
      query: (file) => ({
        url: `${ATTENDANCE_URL}/upload`,
        method: 'POST',
        body: file,
      }),
    }),

    // Upload holidays Excel sheet
    uploadHolidays: builder.mutation({
      query: (file) => ({
        url: `${ATTENDANCE_URL}/uploadholidays`,
        method: 'POST',
        body: file,
      }),
    }),

    // Remove a holiday
    removeHoliday: builder.mutation({
      query: (date) => ({
        url: `${ATTENDANCE_URL}/deleteholiday/${date}`,
        method: 'DELETE',
      }),
    }),

    // Get holiday by date
    getHoliday: builder.query({
      query: (date) => ({
        url: `${ATTENDANCE_URL}/getholiday/${date}`,
        method: 'GET',
      }),
    }),

    // Get holidays by year
    getHolidays: builder.query({
      query: (year) => ({
        url: `${ATTENDANCE_URL}/getholidays/${year}`,
        method: 'GET',
      }),
    }),

    // Add salary month
    addSalMonth: builder.mutation({
      query: (month) => ({
        url: `${ATTENDANCE_URL}/addsalmonth/${month}`,
        method: 'POST',
      }),
    }),

    // Get attendance details
    getAttendanceDetails: builder.query({
      query: ({ userId, month }) => ({
        url: `${ATTENDANCE_URL}/getattendancedetails/${userId}/${month}`,
        method: 'GET',
      }),
    }),

    // Edit attendance details - Updated to match the route path
    editAttendanceDetails: builder.mutation({
      query: (data) => ({
        url: `${ATTENDANCE_URL}/editAttendanceRec`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useUploadAttendanceMutation,
  useUploadHolidaysMutation,
  useRemoveHolidayMutation,
  useGetHolidayQuery,
  useGetHolidaysQuery,
  useAddSalMonthMutation,
  useGetAttendanceDetailsQuery,
  useEditAttendanceDetailsMutation,
} = attendanceApiSlice;