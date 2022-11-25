import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createApi } from 'unsplash-js';
const unsplash = createApi({ accessKey: process.env.REACT_APP_ACCESS_KEY });

const initialState = {
  status: 'idle',
  user: {},
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (username) => {
    const result = await unsplash.users.get({ username: username });
    return result.response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;

export default userSlice.reducer;
