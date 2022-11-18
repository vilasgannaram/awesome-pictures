import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createApi } from 'unsplash-js';
const unsplash = createApi({ accessKey: process.env.REACT_APP_ACCESS_KEY });

const initialState = {
  status: 'idle',
  user: {},
  photos: {},
  likes: {
    status: 'idle',
    photos: [],
  },
  collections: {},
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (user_name) => {
    const result = await unsplash.users.get({ username: user_name });
    return result.response;
  }
);

export const fetchUserLikes = createAsyncThunk(
  'user/fetchUserLikes',
  async (
    user_name = 'microsoft365',
    page = 1,
    perPage = 10,
    orderBy = 'latest',
    orientation = 'landscape'
  ) => {
    const result = await unsplash.users.getLikes({
      username: user_name,
      page: page,
      perPage: perPage,
      orderBy: orderBy,
      orientation: orientation,
    });
    return result.response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // user
      .addCase(fetchUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'rejected';
      })

      // user likes
      .addCase(fetchUserLikes.pending, (state) => {
        state.likes.status = 'pending';
      })
      .addCase(fetchUserLikes.fulfilled, (state, action) => {
        state.likes.status = 'idle';
        state.likes.photos = action.payload.results;
      })
      .addCase(fetchUserLikes, (state) => {
        state.likes.status = 'rejected';
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;

export default userSlice.reducer;
