// store/network/offlineSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const offlineSlice = createSlice({
  name: 'offline',
  initialState: { isOffline: false, isManual: false },
  reducers: {
    setOffline: (state, action) => {
      state.isOffline = action.payload;
    },
    setManualOffline: (state, action) => {
      state.isManual = action.payload;
    },
  },
});

export const { setOffline, setManualOffline } = offlineSlice.actions;
export default offlineSlice.reducer;