import { apiSlice } from '@/features/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
