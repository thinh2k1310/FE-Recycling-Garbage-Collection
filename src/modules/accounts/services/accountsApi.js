import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { customerDetailsMapper, accountsMapper, agentMapper } from '../utils/mappers';

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}/`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.data?.accessToken;

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: ({ role, page }) => ({
        url: `getAllAccount?role=${role.toUpperCase()}&page=${page -1}`,
      }),
      transformResponse: (res) => accountsMapper(res),
    }),
    getAllAgent: builder.query({
      query: () => ({
        url: `all-agent`,
      }),
      transformResponse: (res) => agentMapper(res),
    }),
    getCustomerById: builder.query({
      query: (id) => ({
        url: `/${id}/`,
      }),
      transformResponse: (res) => customerDetailsMapper(res.data),
    }),
    deleteCustomerById: builder.mutation({
      query: (id) => ({
        url: `/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAllAgentQuery,
  useGetCustomerByIdQuery,
  useDeleteCustomerByIdMutation,
} = accountsApi;
