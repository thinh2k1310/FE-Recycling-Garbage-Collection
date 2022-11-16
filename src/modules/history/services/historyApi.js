import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { historyMapper } from "../utils/mappers";

export const historyApi = createApi({
  reducerPath: "historyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}/history/garbage`,
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
        url: `/${id}`,
      }),
      transformResponse: (res) => historyMapper(res.data),
    })
  }),
});

export const { useGetGarbageHistoryByIdQuery } = historyApi;
