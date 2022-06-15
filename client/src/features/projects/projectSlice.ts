import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'project',
  initialState: {},
  reducers: {
    setProject: async (state, action) => {
      const { project } = action.payload;
      state = project;
    },
  },
});

export const { setProject } = projectSlice.actions;

export default projectSlice.reducer;

export const selectCurrentProject = (state: any) => state.project;
