// DrawerNavigation.tsx
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';

import HomeStack from "./HomeStack";
import AstronomyStackNavigator from "./AstronomyStack";
import MultimediaTabsNavigator from "./MultimediaTabs";
import SettingsScreen from "../presentation/screens/config/SettingsScreen";
import PlanetStackNavigator from "./PlanetsStack";
import ExploreNavigator from "./XploreMore";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { colors } = useTheme(); // colores dinámicos según tema

  return (
    <Drawer.Navigator 
      initialRouteName="index"
      detachInactiveScreens={true}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        //modifique la interface de rect theme para poder implementar el onPrimary,
        //ya que solo aceptaba el primary, si no es recomenado simplemento ajusto 
        //por otro color que quede dentro
      //   interface NativeTheme {
      //     dark: boolean;
      //     colors: {
      //         onPrimary: string;
      //         primary: string;
      //         background: string;
      //         card: string;
      //         text: string;
      //         border: string;
      //         notification: string;
      //     };
      //     fonts: {
      //         regular: FontStyle;
      //         medium: FontStyle;
      //         bold: FontStyle;
      //         heavy: FontStyle;
      //     };
      // }
      headerTintColor: colors.onPrimary || colors.card,
        drawerStyle: {
          backgroundColor: colors.background,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
      }}
    >
      <Drawer.Screen
        name="index"
        component={HomeStack}
        options={{
          title: 'Inicio',
          drawerIcon: ({ size }) => (
            <FontAwesome5 name="space-shuttle" size={size} color={colors.primary} />
          ),
        }}
      />
       <Drawer.Screen
        name="astronomy"
        component={AstronomyStackNavigator}
        options={{
          title: 'Astronomía',
          drawerIcon: ({ size }) => (
            <FontAwesome5 name="meteor" size={size} color={colors.primary} />
          ),
        }}
      />
      <Drawer.Screen
        name="media"
        component={MultimediaTabsNavigator}
        options={{
          title: 'Multimedia',
          drawerIcon: ({ size }) => (
            <FontAwesome5 name="satellite-dish" size={size} color={colors.primary} />
          ),
        }}
      />

      
      <Drawer.Screen
        name="planets"
        component={PlanetStackNavigator}
        options={{
          title: 'Marte',
          drawerIcon: ({ size }) => (
            <FontAwesome5 name="globe" size={size} color={colors.primary} />
          ),
        }}
      />
      <Drawer.Screen
        name="explore"
        component={ExploreNavigator}
        options={{
          title: 'Explorar más',
          drawerIcon: ({ size }) => (
            <FontAwesome5 name="rocket" size={size} color={colors.primary} />
          ),
        }}
      /> 
      <Drawer.Screen
        name="setting"
        component={SettingsScreen}
        options={{
          title: 'Configuración',
          drawerIcon: ({ size }) => (
            <FontAwesome5 name="flask" size={size} color={colors.primary} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}