import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import userPhotosReducer from '../features/user/userPhotosSlice';
import userLikesReducer from '../features/user/userLikesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    userPhotos: userPhotosReducer,
    userLikes: userLikesReducer,
  },
});
