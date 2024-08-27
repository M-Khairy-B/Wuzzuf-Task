import { apiSlice } from "../../api/apiSlice";

export const skilssApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSkillById: builder.query<any, any>({
      query: (skillId) => ({
        url: `/skill/${skillId}`,
      }),
      transformResponse: (response: any) => {
        return response.data.skill;
      }
    }),
  }),
});

export const {
  useGetSkillByIdQuery
} = skilssApiSlice;