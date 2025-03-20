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

  }),
});

export const {
  useCalculateSalaryMutation,
  useGetSalarySheetQuery,
  useUpdateSalaryParametersMutation,
} = salaryManagementApiSlice;