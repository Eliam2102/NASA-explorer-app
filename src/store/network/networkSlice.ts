// // Redux slice ejemplo (offlineSlice.ts)
// import { createSlice } from '@reduxjs/toolkit';

// const offlineSlice = createSlice({
//   name: 'offline',
//   initialState: { isOffline: false },
//   reducers: {
//     toggleOffline: state => {
//       state.isOffline = !state.isOffline;
//     },
//     setOffline: (state, action) => {
//       state.isOffline = action.payload;
//     }
//   }
// });

// export const { toggleOffline, setOffline } = offlineSlice.actions;
// export default offlineSlice.reducer;