import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, signOut } from '@/features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefresh = async (args: any, api: any, options: any) => {
  let result = await baseQuery(args, api, options);
  if (result?.error?.status === 403) {
    console.log('sending refresh token');
    const refreshResult: any = await baseQuery(
      {
        url: '/refresh',
        method: 'POST',
      },
      api,
      options,
    );
    if (refreshResult) {
      const { token, role } = refreshResult?.data;
      api.dispatch(setCredentials({ token, role }));
      result = await baseQuery(args, api, options);
    } else {
      console.log('refresh token failed');
      api.dispatch(signOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({}),
});
