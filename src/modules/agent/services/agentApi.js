import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { staffMapper } from "../utils/mappers";

export const agentApi = createApi({
  reducerPath: "agentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}/`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.data?.accessToken;

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStaffOwnerById: builder.query({
      query: ({ id, page }) => ({
        url: `staff/owner/${id}?page=${page-1}`,
      }),
      transformResponse: (res) => staffMapper(res.data),
    })
  }),
});

export const { useGetStaffOwnerByIdQuery } = agentApi;
