import { apiSlice } from "../../api/apiSlice";

export const jobsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchJob: builder.query<any, any>({
            query: (title) => ({
                url: `/jobs/search?query=${title}`,
            }),
            transformResponse: (response: any) => {
                return response?.data.jobs;
            },
            providesTags: ['Jobs'],
        }),
        
    }),
});

export const { useSearchJobQuery } = jobsApiSlice;
