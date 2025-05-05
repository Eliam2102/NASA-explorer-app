// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import { store, RootState } from './src/store/global/store';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { nasaDarkTheme, nasaLightTheme } from './src/core/theme';

const AppContent = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? nasaDarkTheme : nasaLightTheme;

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