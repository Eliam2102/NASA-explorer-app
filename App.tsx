// App.tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './src/components/splashScreen';
import { useState } from 'react';


import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';

export default function App() {
    const [showSplash, setShowSplash] = useState(true);
  
    if (showSplash) {
      return <SplashScreen onFinish={() => setShowSplash(false)} />;
    }
  
    return (
      <NavigationContainer>
        <DrawerNavigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }