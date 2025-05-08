import { apiSlice } from "./apiSlice";
import { ROLE_URL } from "../constants";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new role
    createRole: builder.mutation({
      query: (newRoleData) => ({
        url: `${ROLE_URL}/create`,
        method: 'POST',
        body: newRoleData,
      }),
    }),

    // Assign a role to an employee
    assignRoleToEmployee: builder.mutation({
      query: (roleAssignmentData) => ({
        url: `${ROLE_URL}/assign`,
        method: 'POST',
        body: roleAssignmentData,
      }),
    }),

    // Get all roles
    getRoles: builder.query({
      query: () => ({
        url: `${ROLE_URL}/`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    // Get role by id
    getRoleById: builder.query({
      query: (id) => ({
        url: `${ROLE_URL}/${id}`,
        method: 'GET',
      }),
    }),

    //update role
    updateRole: builder.mutation({
      query: (roleData) => ({
        url: `${ROLE_URL}/${id}`,
        method: 'PUT',
        body: roleData,
      }),
    }),

    // Get roles filtered by permission
    getRolesByPermission: builder.query({
      query: (permission) => ({
        url: `${ROLE_URL}/by-permission`,
        method: 'GET',
        params: { permission },
      }),
    }),

    //get all permissions
    getPermissions: builder.query({
      query: () => ({
        url: `${ROLE_URL}/permissonlist`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useAssignRoleToEmployeeMutation,
  useGetRolesQuery,
  useGetRolesByPermissionQuery,
  useGetPermissionsQuery,
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
} = roleApiSlice;
