// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../theme/themeSlice';
// import offlineReducer from '../network/networkSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    // offline: offlineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;