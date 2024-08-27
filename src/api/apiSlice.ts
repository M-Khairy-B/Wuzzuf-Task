import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
 prepareHeaders: (headers, { getState }) => {
    headers.set("Accept", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Jobs", "Skill"],
  endpoints: builder => ({}),
});
