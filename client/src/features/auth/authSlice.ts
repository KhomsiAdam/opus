import storage from '@/shared/helpers/storage';
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    role: null,
    persist: (storage.get('persist') === 'true' && 'true') || 'false',
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, role } = action.payload;
      state.token = token;
      state.role = role;
    },
    setPersist: (state, action) => {
      const { persist } = action.payload;
      state.persist = persist;
    },
    signOut: (state) => {
      state.token = null;
      state.role = null;
      state.persist = 'false';
    },
  },
});

export const { setCredentials, setPersist, signOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: any) => state.auth.token;
export const selectCurrentRole = (state: any) => state.auth.role;
export const selectPersistStatus = (state: any) => state.auth.persist;