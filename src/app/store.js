import { configureStore } from '@reduxjs/toolkit';

import {
  photosReducer,

  // user
  userReducer,
  userPhotosReducer,
  userLikesReducer,
} from '../features';

export const store = configureStore({
  reducer: {
    photos: photosReducer,

    // user
    user: userReducer,
    userPhotos: userPhotosReducer,
    userLikes: userLikesReducer,
  },
});
