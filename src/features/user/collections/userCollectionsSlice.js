import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createApi } from 'unsplash-js';
const unsplash = createApi({ accessKey: process.env.REACT_APP_ACCESS_KEY });

const initialState = {
  status: 'idle',
  collections: [],
};

export const fetchUserCollections = createAsyncThunk(
  'userCollections/fetchUserCollections',
  async (action) => {
    console.log('1');
    const result = await unsplash.users.getCollections({
      username: action.username,
      page: action.pageNumber,
      perPage: 15,
    });
    return result.response;
  }
);

export const userCollectionsSlice = createSlice({
  name: 'userCollections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCollections.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUserCollections.fulfilled, (state, action) => {
        state.status = 'idle';
        state.collections = [...state.collections, ...action.payload.results];
      })
      .addCase(fetchUserCollections.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const selectCollections = (state) => state.userCollections.collections;

export default userCollectionsSlice.reducer;
