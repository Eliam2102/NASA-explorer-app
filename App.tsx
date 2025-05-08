import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import { store, RootState } from './src/store/global/store';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { nasaDarkTheme, nasaLightTheme } from './src/core/theme';

import { useEpicViewModel } from './src/presentation/viewmodels/epic/epicThemeViewModel';
import { setTheme } from './src/store/theme/themeSlice';

const AppContent = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? nasaDarkTheme : nasaLightTheme;

  const { fetchEpicImages } = useEpicViewModel();

  const checkIfNight = (dateString: string): boolean => {
    const hour = new Date(dateString).getHours(); // local time
    return hour < 6 || hour >= 18;
  };

  useEffect(() => {
    const getEpicAndSetTheme = async () => {
      const images = await fetchEpicImages();
      if (images && images.length > 0) {
        const isNight = checkIfNight(images[0].date);
        dispatch(setTheme(isNight));
      }
    };
    getEpicAndSetTheme();
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