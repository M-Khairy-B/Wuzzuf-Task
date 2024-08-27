import { apiSlice } from "../../api/apiSlice";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSkill: builder.query<any, any>({
      query: (jobId) => ({
        url: `/skill/${jobId}`,
      }),
      transformResponse: (response: any) => {
        
        return response.data.skill;
      },
      providesTags: ['Jobs'],
    }),
  }),
});

export const {useGetSkillQuery} = jobsApiSlice;