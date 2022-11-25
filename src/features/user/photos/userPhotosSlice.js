import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const fetchUserPhotos = createAsyncThunk(
  'userPhotos/fetchUserPhotos',
  async (action) => {
    const result = await unsplash.users.getPhotos({
      username: action.username,
      page: action.pageNumber,
      perPage: 9,
      orderBy: 'latest',
      // orientation: 'landscape',
    });
    const { response } = result;
    return response;
  }
);

export const userPhotosSlice = createSlice({
  name: 'userPhotos',
  initialState,

  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPhotos.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUserPhotos.fulfilled, (state, action) => {
        state.status = 'idle';
        state.totalPhotos = action.payload.total;
        state.photos = [...state.photos, ...action.payload.results];

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
      .addCase(fetchUserPhotos.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const selectStatus = (state) => state.userPhotos.status;
export const selectPhotos = (state) => state.userPhotos.photos;
export const selectTotalPhotos = (state) => state.userPhotos.totalPhotos;

export const selectColumn_1 = (state) => state.userPhotos.column_1;
export const selectColumn_2 = (state) => state.userPhotos.column_2;
export const selectColumn_3 = (state) => state.userPhotos.column_3;

export const { reset } = userPhotosSlice.actions;

export default userPhotosSlice.reducer;
