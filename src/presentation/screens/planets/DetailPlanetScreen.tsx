import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { PlanetStackParamList } from "./types/types"; // Asegúrate de importar los tipos correctos

type DetailRouteProp = RouteProp<PlanetStackParamList, "DetailsPlanetScreen">; // Obtenemos el tipo correcto para la ruta

export default function DetailPlanetScreen() {
  const route = useRoute<DetailRouteProp>(); // Usamos useRoute para obtener el parámetro
  const { planet } = route.params; // Obtenemos el planeta del parámetro
  const navigation = useNavigation(); // Usamos useNavigation para acceder a la función goBack

  return (
    <View style={styles.container}>
      {/* Botón de Regresar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Función para regresar a la pantalla anterior
      >
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: planet.imageUrl }}
        style={styles.planetImage}
      />
      <Text style={styles.planetName}>{planet.name}</Text>
      <Text style={styles.planetDescription}>{planet.description || "Descripción no disponible."}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  planetImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  planetName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  planetDescription: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    zIndex: 10, // Asegura que el botón esté encima de otros elementos
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
