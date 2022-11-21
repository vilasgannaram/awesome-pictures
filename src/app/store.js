import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import userPhotosReducer from '../features/user/photos/userPhotosSlice';
import userLikesReducer from '../features/user/likes/userLikesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    userPhotos: userPhotosReducer,
    userLikes: userLikesReducer,
  },
});
