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
import { TouchableOpacity } from "react-native";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { colors } = useTheme(); 

  return (
    <Drawer.Navigator
      initialRouteName="index"
      detachInactiveScreens={true}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.text || colors.card,
        drawerStyle: {
          backgroundColor: colors.background,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
      })}
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