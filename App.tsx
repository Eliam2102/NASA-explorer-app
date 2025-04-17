// App.tsx
import { StatusBar } from 'expo-status-bar';


import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';

export default function App() {

    return (
      <NavigationContainer>
        <DrawerNavigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }