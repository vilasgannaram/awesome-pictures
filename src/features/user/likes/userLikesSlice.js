import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createApi } from 'unsplash-js';
const unsplash = createApi({ accessKey: process.env.REACT_APP_ACCESS_KEY });

const initialState = {
  status: 'idle',
  photos: [],
  totalPhotos: undefined,
  tempPhotos: [],

  column_1: [],
  column_2: [],
  column_3: [],
};

export const fetchUserLikes = createAsyncThunk(
  'userLikes/fetchUserLikes',
  async (action) => {
    const result = await unsplash.users.getLikes({
      username: action.username,
      page: action.pageNumber,
      perPage: 10,
      orderBy: 'latest',
      // orientation: 'landscape',
    });

    const { response } = result;
    return response;
  }
);

const userLikesSlice = createSlice({
  name: 'userLikes',
  initialState,

  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLikes.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUserLikes.fulfilled, (state, action) => {
        state.status = 'idle';
        state.photos = [...state.photos, ...action.payload.results];
        state.totalPhotos = action.payload.total;

        state.tempPhotos = action.payload.results;
        const threeIndexNum = Math.floor(action.payload.results.length / 3);

        state.column_3 = [
          ...state.column_3,
          ...state.tempPhotos.splice(-threeIndexNum),
        ];

        state.column_2 = [
          ...state.column_2,
          ...state.tempPhotos.splice(-threeIndexNum),
        ];

        state.column_1 = [...state.column_1, ...state.tempPhotos.splice(0)];
      })
      .addCase(fetchUserLikes.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const selectStatus = (state) => state.userLikes.status;
export const selectPhotos = (state) => state.userLikes.photos;
export const selectTotalPhotos = (state) => state.userLikes.totalPhotos;
export const selectColumn_1 = (state) => state.userLikes.column_1;
export const selectColumn_2 = (state) => state.userLikes.column_2;
export const selectColumn_3 = (state) => state.userLikes.column_3;

export const { reset } = userLikesSlice.actions;

export default userLikesSlice.reducer;
