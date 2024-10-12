import { apiSlice } from "./apiSlice";
import { COMPANY_URL } from "../constants";

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all companies
    getCompanies: builder.query({
      query: () => ({
        url: `${COMPANY_URL}`,
        method: 'GET',
      }),
    }),

    // Get a specific company by ID
    getCompany: builder.query({
      query: (id) => ({
        url: `${COMPANY_URL}/${id}`,
        method: 'GET',
      }),
    }),

    // Create a new company
    createCompany: builder.mutation({
      query: (newCompanyData) => ({
        url: `${COMPANY_URL}/`,
        method: 'POST',
        body: newCompanyData,
      }),
    }),

    // Update an existing company by ID
    updateCompany: builder.mutation({
      query: ({ id, updatedCompanyData }) => ({
        url: `${COMPANY_URL}/${id}`,
        method: 'PUT',
        body: updatedCompanyData,
      }),
    }),

    // Delete a company by ID
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `${COMPANY_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApiSlice;
