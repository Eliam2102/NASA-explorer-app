import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
// Importar tema
import { nasaLightTheme } from "../core/themeLight";
// Módulo de iconos de FontAwesome5
import { FontAwesome5 } from '@expo/vector-icons';
import HomeStack from "./HomeStack";
import AstronomyStackNavigator from "./AstronomyStack";
import MultimediaTabsNavigator from "./MultimediaTabs";
import BreakingNewsStackNavigator from "./NewsStack";
import SettingsScreen from "../presentation/screens/config/SettingsScreen";
import PlanetStackNavigator from "./PlanetsStack";
import ExploreNavigator from "./XploreMore";

// Crea una instancia del drawer navigator
const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator 
      initialRouteName="index"
      detachInactiveScreens={true} 
      screenOptions={{
        headerStyle: {
          backgroundColor: nasaLightTheme.primary,  
        },
        headerTintColor: nasaLightTheme.onPrimary,  // Color del texto en el encabezado
        drawerStyle: {
          backgroundColor: nasaLightTheme.background,  // Fondo del Drawer
        },
        drawerActiveTintColor: nasaLightTheme.primary,  // Color de los ítems activos en el Drawer
        drawerInactiveTintColor: nasaLightTheme.textSecondary,  // Color de los ítems inactivos en el Drawer
      }}
    >
      {/* Región para ítem de Inicio */}
      <Drawer.Screen
        name="index"
        component={HomeStack}
        options={{
          title: 'Inicio',
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="space-shuttle" color={nasaLightTheme.secondary} size={size} />
          ),
        }}
      />

      {/* Región para ítem de Astronomía */}
      <Drawer.Screen
        name="astronomy"
        component={AstronomyStackNavigator}
        options={{
          title: 'Astronomía',
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="meteor" color={nasaLightTheme.secondary} size={size} />
          ),
        }}
      />

      {/* Región para el ítem de Multimedia */}
      <Drawer.Screen
        name="media"
        component={MultimediaTabsNavigator}
        options={{
          title: 'Multimedia',
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="satellite-dish" color={nasaLightTheme.secondary} size={size} />
          ),
        }}
      />

      {/* Región para ítem de Noticias */}
      <Drawer.Screen
        name="news"
        component={BreakingNewsStackNavigator}
        options={{
          title: 'Noticias',
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="satellite" color={nasaLightTheme.secondary} size={size} />
          ),
        }}
      />

      {/* Región para ítem de Planetas */}
      <Drawer.Screen
        name="planets"
        component={PlanetStackNavigator}
        options={{
          title: 'Planetas',
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="globe" color={nasaLightTheme.secondary} size={size} />
          ),
        }}
      />

      {/* Región para ítem de Explorar más */}
      <Drawer.Screen
        name="explore"
        component={ExploreNavigator}
        options={{
          title: 'Explorar más',
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="rocket" color={nasaLightTheme.secondary} size={size} />
          ),
        }}
      />

      {/* Región para ítem de Configuración */}
      <Drawer.Screen
        name="setting"
        component={SettingsScreen}
        options={{
          title: 'Configuración',
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="flask" color={nasaLightTheme.secondary} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}