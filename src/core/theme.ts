// import el modulo MD3 con react-paper
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

//defino mi paleta de colores oscura
export const nasaLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#0A47A9",        
    onPrimary: "#FFFFFF",
    secondary: "#5A9BD4",      
    onSecondary: "#FFFFFF",
    background: "#F4F7FB",   
    surface: "#FFFFFF",
    onSurface: "#1F1F1F",
    error: "#FF4C4C",      
    onError: "#FFFFFF",

    // Personalizados
    textPrimary: "#1F1F1F",
    textSecondary: "#4A4A4A",
    warning: "#FFB020",        
    onWarning: "#FFFFFF",
    border: "#D6DEE9",      

    card: "#FFFFFF",
    text: "#1F1F1F",
    notification: "#FF4C4C",
  },
};


export const nasaDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#4C91F0",      
    onPrimary: "#000000",
    secondary: "#8AB4F8",
    onSecondary: "#000000",
    background: "#121212",     
    surface: "#1D1D1D",        
    onSurface: "#E0E0E0",
    error: "#FF6B6B",           
    onError: "#000000",

    // Personalizados
    textPrimary: "#E0E0E0",
    textSecondary: "#9E9E9E",
    warning: "#FFB020",
    onWarning: "#000000",
    border: "#2F2F2F",

    card: "#1D1D1D",
    text: "#E0E0E0",
    notification: "#FF6B6B",
  },
};