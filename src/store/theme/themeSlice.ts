// store/themeSlice.ts
import { createSlice } from '@reduxjs/toolkit';
//import el modulo del stoarege service
import { StorageService } from '../../data/service/storage/storageService';
//creo la KEY para guardar el tema en el async
const THEME_KEY = 'APP_THEME';

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
      StorageService.set(THEME_KEY, state.isDark);
    },
    setTheme(state, action: { payload: boolean }) {
      state.isDark = action.payload;
      StorageService.set(THEME_KEY, action.payload);
    }, //agreo qeu esta qeu espara setear el tema con respecto  a la respuesta de epic
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;