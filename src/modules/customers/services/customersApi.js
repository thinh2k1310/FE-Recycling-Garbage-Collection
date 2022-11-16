import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { customerDetailsMapper, accountsMapper } from '../utils/mappers';

export const customersApi = createApi({
  reducerPath: 'customersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}/getAllAccount`,
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
      query: ({ page }) => ({
        url: `?role=NONE&page=${page -1}`,
      }),
      transformResponse: (res) => accountsMapper(res),
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
  useGetCustomerByIdQuery,
  useDeleteCustomerByIdMutation,
} = customersApi;
