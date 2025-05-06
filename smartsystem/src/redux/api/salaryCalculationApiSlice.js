import { apiSlice } from "./apiSlice";
import { SALARYCALCULATION_URL } from "../constants";

export const salaryManagementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Calculate salary (POST /sketch)
    calculateSalary: builder.mutation({
      query: (salaryData) => ({
        url: `${SALARYCALCULATION_URL}/sketch`,
        method: 'POST',
        body: salaryData,
      }),
    }),

    // Show salary sheet (GET /showsal)
    getSalarySheet: builder.query({
      query: ({userId, month}) => ({
        url: `${SALARYCALCULATION_URL}/showsal/${userId}/${month}`,
        method: 'GET',
      }),
    }),

    // Get salary history (GET /history)
    getSalaryHistory: builder.query({
      query: (userId) => ({
        url: `${SALARYCALCULATION_URL}/history/${userId}`,
        method: 'GET',
      }),
    }),

    // Send complaint (POST /send)
    sendComplaint: builder.mutation({
      query: (complaintData) => ({
        url: `${SALARYCALCULATION_URL}/send`,
        method: 'POST',
        body: complaintData,
      }),
    }),

    // Reply to complaint (POST /reply)
    replyToComplaint: builder.mutation({
      query: (replyData) => ({
        url: `${SALARYCALCULATION_URL}/reply`,
        method: 'POST',
        body: replyData,
      }),
    }),

    // Get chat history (GET /:complaintId/history)
    getChatHistory: builder.query({
      query: (complaintId) => ({
        url: `${SALARYCALCULATION_URL}/${complaintId}/history`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        return response.messages || [];
      }
    }),

    // Get salary summary (GET /summary/:Etype/:Month)
    getSalarySummary: builder.query({
      query: ({employeeType, month}) => ({
        url: `${SALARYCALCULATION_URL}/summary/${employeeType}/${month}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCalculateSalaryMutation,
  useGetSalarySheetQuery,
  useGetSalaryHistoryQuery,
  useSendComplaintMutation,
  useReplyToComplaintMutation,
  useGetChatHistoryQuery,
  useGetSalarySummaryQuery,
} = salaryManagementApiSlice;