import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { store, RootState } from './src/store/global/store';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { nasaDarkTheme, nasaLightTheme } from './src/core/theme';
import { useEpicViewModel } from './src/presentation/viewmodels/epic/epicThemeViewModel';
import { setTheme } from './src/store/theme/themeSlice';
import FlashMessage from 'react-native-flash-message';

const AppContent = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? nasaDarkTheme : nasaLightTheme;
  const { fetchEpicImages } = useEpicViewModel();

  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const initTheme = async () => {
      await fetchEpicImages();
      const currentHour = new Date().getHours();
      const isNight = currentHour < 6 || currentHour >= 18;
      dispatch(setTheme(isNight));
      setThemeReady(true);
    };

    initTheme();
  }, []);

  if (!themeReady) return null; // evita render antes de aplicar tema

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <DrawerNavigation />
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
      </NavigationContainer>
      <FlashMessage position="top" />
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