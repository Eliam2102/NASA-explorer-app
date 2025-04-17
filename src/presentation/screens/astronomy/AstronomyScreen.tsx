import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AstronomyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de AStronomia</Text>
      <Text style={styles.text}>Aqui va los tabs</Text>
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