import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Configuración</Text>
      <Text>Aqui no va a llevar ningun tipo de navegación</Text>
      <Text>Porque desde una misma pantalla se puede gestionar toda la configuración</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centrado vertical
    alignItems: "center",     // Centrado horizontal
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});