// store/themeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
    setTheme(state, action: { payload: boolean }) {
      state.isDark = action.payload;
    }, //agreo qeu esta qeu espara setear el tema con respecto  a la respuesta de epic
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;