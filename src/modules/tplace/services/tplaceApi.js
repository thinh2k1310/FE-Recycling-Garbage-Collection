import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tplaceMapper from "../utils/mappers/tplaceMapper";

export const tplaceApi = createApi({
  reducerPath: "tplaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}/tplace/`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.data?.accessToken;

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTPlace: builder.query({
      query: ({ id, page }) => ({
        url: `get/${id}?criteria=None&page=${page-1}`,
      }),
      transformResponse: (res) => tplaceMapper(res.data),
    })
  }),
});

export const { useGetTPlaceQuery } = tplaceApi;
