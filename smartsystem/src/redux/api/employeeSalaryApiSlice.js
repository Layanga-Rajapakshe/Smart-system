import { apiSlice } from './apiSlice';

export const employeeSalaryHistoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeSalaryHistory: builder.query({
      query: (employeeId) => `/employees/${employeeId}/salary-history`,
      transformResponse: (response) => {
        // Transform the dates to proper format and sort by date
        return response.map(item => ({
          ...item,
          paymentDate: item.paymentDate ? new Date(item.paymentDate).toLocaleDateString() : null
        })).sort((a, b) => {
          if (a.year !== b.year) return b.year - a.year;
          return b.month - a.month;
        });
      }
    }),
  }),
});

export const {
  useGetEmployeeSalaryHistoryQuery,
} = employeeSalaryHistoryApiSlice;