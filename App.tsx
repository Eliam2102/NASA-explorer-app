// App.tsx
import { StatusBar } from 'react-native';2
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