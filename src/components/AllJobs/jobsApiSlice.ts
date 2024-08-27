import { apiSlice } from "../../api/apiSlice";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getJobsList: builder.query<any, any>({
      query: (options) => ({
        url: "/jobs",
        params: options
      }),
      transformResponse: (response: any) => {
        return response.data.jobs;
      },
      providesTags: ['Jobs'],      
    }),
  }),
});

export const {
  useGetJobsListQuery,
} = jobsApiSlice;