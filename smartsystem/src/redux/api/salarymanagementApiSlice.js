import { apiSlice } from "./apiSlice";
import { SALARYMANAGEMENT_URL } from "../constants";

export const salaryManagementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get salary parameters
    getSalaryParameters: builder.query({
      query: (roleName) => ({
        url: `${SALARYMANAGEMENT_URL}/show/${roleName}`,
        method: 'GET',
      }),
    }),

    // Update salary parameters
    updateSalaryParameters: builder.mutation({
      query: (salaryParamsData) => ({
        url: `${SALARYMANAGEMENT_URL}/edit`,
        method: 'PATCH',
        body: salaryParamsData,
      }),
    }),
  }),
});

export const {
  useGetSalaryParametersQuery,
  useUpdateSalaryParametersMutation,
} = salaryManagementApiSlice;