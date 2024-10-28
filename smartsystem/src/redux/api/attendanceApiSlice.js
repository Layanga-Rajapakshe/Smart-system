import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const attendanceApiSlice = createApi({
  reducerPath: 'attendanceApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/attendance' }), // Adjust your base URL as necessary
  endpoints: (builder) => ({
    // Endpoint for uploading attendance Excel sheet
    uploadAttendanceSheet: builder.mutation({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),
    // Endpoint for uploading holidays Excel sheet
    uploadHolidaySheet: builder.mutation({
      query: (formData) => ({
        url: '/uploadholidays',
        method: 'POST',
        body: formData,
      }),
    }),
    // Endpoint for adding a holiday
    addHoliday: builder.mutation({
      query: (holidayData) => ({
        url: '/addholiday',
        method: 'POST',
        body: holidayData,
      }),
    }),
    // Endpoint for deleting a holiday by date
    removeHoliday: builder.mutation({
      query: (date) => ({
        url: `/deleteholiday/${date}`,
        method: 'DELETE',
      }),
    }),
    // Endpoint for getting a specific holiday by date
    getHoliday: builder.query({
      query: (date) => `/getholiday/${date}`,
    }),
    // Endpoint for getting holidays by year
    getHolidays: builder.query({
      query: (year) => `/getholidays/${year}`,
    }),
    // Endpoint for adding a salary month
    addSalMonth: builder.mutation({
      query: (month) => ({
        url: `/addsalmonth/${month}`,
        method: 'POST',
      }),
    }),
    // Endpoint for getting attendance details for a specific user and month
    getAttendanceDetails: builder.query({
      query: ({ userId, month }) => `/getattendancedetails/${userId}/${month}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useUploadAttendanceSheetMutation,
  useUploadHolidaySheetMutation,
  useAddHolidayMutation,
  useRemoveHolidayMutation,
  useGetHolidayQuery,
  useGetHolidaysQuery,
  useAddSalMonthMutation,
  useGetAttendanceDetailsQuery,
} = attendanceApiSlice;

export default attendanceApiSlice.reducer;
