import { apiSlice } from '@/features/api/apiSlice';

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => '/comments',
      keepUnusedDataFor: 0,
    }),
    getComment: builder.query({
      query: (id) => `/comments/${id}`,
      keepUnusedDataFor: 0,
    }),
    createComment: builder.mutation({
      query: (body) => ({
        url: `/comments`,
        method: 'POST',
        body,
      }),
    }),
    updateComment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/comments/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetCommentsQuery, useGetCommentQuery, useCreateCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } = commentsApiSlice;
