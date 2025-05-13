import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View, StyleSheet } from 'react-native';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { StorageService } from './src/data/service/storage/storageService';
import { store, RootState } from './src/store/global/store';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { nasaDarkTheme, nasaLightTheme } from './src/core/theme';
import { useEpicViewModel } from './src/presentation/viewmodels/epic/epicThemeViewModel';
import { setTheme } from './src/store/theme/themeSlice';

// key para el tema
const THEME_KEY = 'APP_THEME';

const AppContent = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? nasaDarkTheme : nasaLightTheme;

  const { fetchEpicImages } = useEpicViewModel();

  useEffect(() => {
    const initTheme = async () => {
      const savedTheme = await StorageService.get<boolean>(THEME_KEY);
      console.log("🌗 Tema guardado:", savedTheme);

      if (savedTheme !== null) {
        console.log("🔁 Usando tema desde storage");
        dispatch(setTheme(savedTheme));
      } else {
        console.log("🌅 No hay tema guardado, usando hora + EPIC");
        await fetchEpicImages();
        const currentHour = new Date().getHours();
        const isNight = currentHour < 6 || currentHour >= 18;
        dispatch(setTheme(isNight));
        await StorageService.set(THEME_KEY, isNight);
        console.log("💾 Tema nuevo guardado:", isNight);
      }
    };
    initTheme();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <DrawerNavigation />
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <ReduxProvider store={store}>
      <AppContent />
    </ReduxProvider>
  );
}