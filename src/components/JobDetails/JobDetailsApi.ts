import { apiSlice } from "../../api/apiSlice";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getJobById: builder.query<any, any>({
      query: (jobId) => ({
        url: `/job/${jobId}`,
      }),
      transformResponse: (response: any) => {
        
        return response.data.job;
      },
    }),
    
  }),
});

export const {
  useGetJobByIdQuery
} = jobsApiSlice;