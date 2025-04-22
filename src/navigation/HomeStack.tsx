// src/navigation/HomeStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../presentation/screens/home/HomeScreen";
// import AstronomyStackNavigator from "./AstronomyStack";
// import MultimediaTabsNavigator from "./MultimediaTabs";
// import NewScreen from "../presentation/screens/news/NewsScreen";
// import PlanetsScreen from "../presentation/screens/planets/PlanetsScreen";
// import MoreExlporerScreen from "../presentation/screens/explorer/MoreExplorerScreen";

// Tipado de las rutas del stack que se usará dentro del Drawer
export type RootStackParamList = {
  Home: undefined;
  AstronomyScreen: undefined;
  MultimediaScreen: undefined;
  NoticiasScreen: undefined;
  PlanetasScreen: undefined;
  ExplorarScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Este stack se usará como pantalla principal en el Drawer (pantalla de Inicio)
export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="AstronomyScreen" component={AstronomyStackNavigator} />
      <Stack.Screen name="MultimediaScreen" component={MultimediaTabsNavigator} />
      <Stack.Screen name="NoticiasScreen" component={NewScreen} />
      <Stack.Screen name="PlanetasScreen" component={PlanetsScreen} />
      <Stack.Screen name="ExplorarScreen" component={MoreExlporerScreen} /> */}
    </Stack.Navigator>
  );
}
