import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { garbageHistoryMapper, giftHistoryMapper, pointHistoryMapper } from "../utils/mappers";

export const historyApi = createApi({
  reducerPath: "historyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}/history/`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.data?.accessToken;

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGarbageHistoryById: builder.query({
      query: ({ id , page }) => ({
        url: `garbage/${id}?page=${page-1}`,
      }),
      transformResponse: (res) => garbageHistoryMapper(res.data),
    }),
    getGiftHistoryById: builder.query({
      query: ({ id , page }) => ({
        url: `gift/${id}?page=${page-1}`,
      }),
      transformResponse: (res) => giftHistoryMapper(res.data),
    }),
    getPointHistoryById: builder.query({
      query: ({ id , page }) => ({
        url: `point/${id}?page=${page-1}`,
      }),
      transformResponse: (res) => pointHistoryMapper(res.data),
    })
  }),
});

export const { useGetGarbageHistoryByIdQuery, useGetGiftHistoryByIdQuery, useGetPointHistoryByIdQuery } = historyApi;
