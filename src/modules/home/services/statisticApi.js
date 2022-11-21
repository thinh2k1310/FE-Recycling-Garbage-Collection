import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { statisticCollectMapper, statisticRedeemMapper } from "../utils/mappers";

export const statisticApi = createApi({
  reducerPath: "statisticApi",
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
    getStatisticCollect: builder.query({
      query: ({ id, criteriaGarbage }) => ({
        url: `statistics/collect/${id}?criteria=${criteriaGarbage.toUpperCase()}`,
      }),
      transformResponse: (res) => statisticCollectMapper(res.data),
    }),
    getStatisticRedeem: builder.query({
      query: ({ id, criteriaGift }) => ({
        url: `statistics/redeem/${id}?criteria=${criteriaGift.toUpperCase()}`,
      }),
      transformResponse: (res) => statisticRedeemMapper(res.data),
    }),
    // Admin
    getStatisticAccount: builder.query({
      query: ({ id }) => ({
        url: `statistics/account/${id}`,
      }),
      transformResponse: (res) => res.data,
    }),
    getStatisticOrder: builder.query({
      query: ({ id }) => ({
        url: `statistics/order/${id}`,
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useGetStatisticCollectQuery, useGetStatisticRedeemQuery, useGetStatisticAccountQuery, useGetStatisticOrderQuery} = statisticApi;
