import { apiSlice } from "./apiSlice";
import { EMPLOYEE_URL } from "../constants";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all employees
    getEmployees: builder.query({
      query: () => ({
        url: `${EMPLOYEE_URL}/`,
        method: 'GET',
        Credential: 'include',
      }),
    }),

    // Get a specific employee by ID
    getEmployee: builder.query({
      query: (id) => ({
        url: `${EMPLOYEE_URL}/${id}`,
        method: 'GET',
      }),
    }),

    // Create a new employee
    createEmployee: builder.mutation({
      query: (newEmployeeData) => ({
        url: `${EMPLOYEE_URL}/`,
        method: 'POST',
        body: newEmployeeData,
      }),
    }),

    // Update an existing employee by ID
    updateEmployee: builder.mutation({
      query: ({ id, updatedEmployeeData }) => ({
        url: `${EMPLOYEE_URL}/${id}`,
        method: 'PUT',
        body: updatedEmployeeData,
      }),
    }),

    // Delete an employee by ID
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `${EMPLOYEE_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApiSlice;
