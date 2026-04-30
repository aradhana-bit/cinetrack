import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import mediaReducer from './slices/mediaSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    media: mediaReducer,
  },
});
