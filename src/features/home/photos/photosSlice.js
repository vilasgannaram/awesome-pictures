import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createApi } from 'unsplash-js';
const unsplash = createApi({ accessKey: process.env.REACT_APP_ACCESS_KEY });

const initialState = {
  status: 'idle',
  photos: [],

  tempPhotos: [],

  column_1: [],
  column_2: [],
  column_3: [],
};

export const fetchPhotos = createAsyncThunk(
  'home/fetchPhotos',
  async (page = 1) => {
    const result = await unsplash.photos.list({ page: page, perPage: 15 });
    const { response } = result;
    return response.results;
  }
);

export const photosSlice = createSlice({
  name: 'photos',
  initialState,

  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = 'idle';
        state.photos = [...state.photos, ...action.payload];

        state.tempPhotos = action.payload;
        const threeIndexNum = Math.floor(action.payload.length / 3);

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
      .addCase(fetchPhotos.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const selectStatus = (state) => state.photos.status;
export const selectPhotos = (state) => state.photos.photos;
export const selectColumn_1 = (state) => state.photos.column_1;
export const selectColumn_2 = (state) => state.photos.column_2;
export const selectColumn_3 = (state) => state.photos.column_3;

export const { reset } = photosSlice.actions;

export default photosSlice.reducer;
