import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { giftMapper } from "../utils/mappers";

export const giftApi = createApi({
  reducerPath: "giftApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}/gift/`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.data?.accessToken;

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGiftOwnerById: builder.query({
      query: ({ id, criteria, page }) => ({
        url: `get/owner/${id}?criteria=${criteria.toUpperCase()}&page=${page-1}`,
      }),
      transformResponse: (res) => giftMapper(res.data),
    })
  }),
});

export const { useGetGiftOwnerByIdQuery } = giftApi;
