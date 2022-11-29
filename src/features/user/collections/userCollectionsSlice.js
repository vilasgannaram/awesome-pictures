import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createApi } from 'unsplash-js';
const unsplash = createApi({ accessKey: process.env.REACT_APP_ACCESS_KEY });

const initialState = {
  status: 'idle',
  collections: [],
  total_collections: undefined,
};

export const fetchUserCollections = createAsyncThunk(
  'userCollections/fetchUserCollections',
  async (action) => {
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
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCollections.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUserCollections.fulfilled, (state, action) => {
        state.status = 'idle';
        state.collections = [...state.collections, ...action.payload.results];
        state.total_collections = action.payload.total;
      })
      .addCase(fetchUserCollections.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const selectCollections = (state) => state.userCollections.collections;
export const selectTotalCollections = (state) =>
  state.userCollections.total_collections;
export const selectStatus = (state) => state.userCollections.status;

export const { reset } = userCollectionsSlice.actions;
export default userCollectionsSlice.reducer;
