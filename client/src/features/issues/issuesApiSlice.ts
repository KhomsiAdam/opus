import { apiSlice } from '@/features/api/apiSlice';

export const issuesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIssues: builder.query({
      query: () => '/issues',
      keepUnusedDataFor: 0,
    }),
    getIssue: builder.query({
      query: (id) => `/issues/${id}`,
      keepUnusedDataFor: 0,
    }),
    createIssue: builder.mutation({
      query: (fields) => ({
        url: `/issues`,
        method: 'POST',
        body: { ...fields },
      }),
    }),
    updateIssue: builder.mutation({
      query: ({ id, fields }) => ({
        url: `/issues/${id}`,
        method: 'PATCH',
        body: { ...fields },
      }),
    }),
    deleteIssue: builder.mutation({
      query: (id) => ({
        url: `/issues/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetIssuesQuery, useGetIssueQuery, useCreateIssueMutation, useUpdateIssueMutation, useDeleteIssueMutation } = issuesApiSlice;
