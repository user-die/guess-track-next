import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotiApi = createApi({
  reducerPath: "spotiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1/",
  }),

  endpoints: (build) => ({
    search: build.query<any, object>({
      query: (obj: { artist: string; token: string }): any => ({
        url: "search",
        method: "GET",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${obj.token}`,
        },
        params: `?q=${obj.artist}&type=artist`,
      }),
    }),

    getPlaylist: build.query<any, object>({
      query: (obj: { artist: string; token: string }): any => ({
        url: "search",
        method: "GET",
        headers: {
          Authorization: `Bearer ${obj.token}`,
        },
        params: `?q=this+is+${obj.artist}&type=playlist&limit=50`,
      }),
    }),
  }),
});

export const { useSearchQuery, useGetPlaylistQuery } = spotiApi;
