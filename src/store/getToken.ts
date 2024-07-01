import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const data = {
  id: "a0b12e2325914386adf27fd5312d5f59",
  secret: "7b7cac440dd9433c9d5c62833b8c8910",
};

export const getToken = createApi({
  reducerPath: "getToken",
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://accounts.spotify.com/api/",
    prepareHeaders: (headers) => {
      if (data.id) {
        headers.set(
          "Authorization",
          `Basic ${btoa(data.id + ":" + data.secret)}`
        );
        headers.set("Content-type", "application/x-www-form-urlencoded");
      }

      return headers;
    },
  }),

  endpoints: (build) => ({
    getToken: build.query({
      query: () => ({
        url: "token",
        method: "POST",
        body: "grant_type=client_credentials",
      }),
    }),
  }),
});

export const { useGetTokenQuery } = getToken;
