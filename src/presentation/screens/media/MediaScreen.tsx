import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MediaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de multimedia</Text>
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