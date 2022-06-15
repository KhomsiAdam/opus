import { apiSlice } from '@/features/api/apiSlice';

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '/projects',
      keepUnusedDataFor: 0,
    }),
    getProject: builder.query({
      query: (id) => `/projects/${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetProjectsQuery, useGetProjectQuery } = projectsApiSlice;
