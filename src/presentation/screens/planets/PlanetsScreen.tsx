import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Planet } from "./interface/Planet";
import { PlanetStackNavigationProp } from "./types/types"; // Importa el tipo de navegación

// Datos de planetas del sistema solar
const planetsData: Planet[] = [
  { id: "1", name: "Mercurio", imageUrl: "https://example.com/mercury.jpg" },
  { id: "2", name: "Venus", imageUrl: "https://example.com/venus.jpg" },
  { id: "3", name: "Tierra", imageUrl: "https://example.com/earth.jpg" },
  { id: "4", name: "Marte", imageUrl: "https://example.com/mars.jpg" },
  { id: "5", name: "Júpiter", imageUrl: "https://example.com/jupiter.jpg" },
  { id: "6", name: "Saturno", imageUrl: "https://example.com/saturn.jpg" },
  { id: "7", name: "Urano", imageUrl: "https://example.com/uranus.jpg" },
  { id: "8", name: "Neptuno", imageUrl: "https://example.com/neptune.jpg" },
];

// Datos de exoplanetas
const exoplanetsData: Planet[] = [
  { id: "9", name: "Kepler-22b", imageUrl: "https://example.com/kepler22b.jpg" },
  { id: "10", name: "Proxima Centauri b", imageUrl: "https://example.com/proxima.jpg" },
  { id: "11", name: "TRAPPIST-1d", imageUrl: "https://example.com/trappist1d.jpg" },
];

// Datos de los últimos planetas descubiertos (ejemplo)
const latestPlanetsData: Planet[] = [
  { id: "12", name: "Planet X", imageUrl: "https://example.com/planetx.jpg" },
  { id: "13", name: "Planet Y", imageUrl: "https://example.com/planety.jpg" },
];

export default function PlanetsScreen() {
  const navigation = useNavigation<PlanetStackNavigationProp>(); // Usamos el tipo correcto para useNavigation

  const handlePlanetPress = (planet: Planet) => {
    navigation.navigate("DetailsPlanetScreen", { planet }); // Navegamos a la pantalla de detalles pasando el planeta
  };

  return (
    <ScrollView style={styles.container}>
      {/* Sección Planetas del Sistema Solar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Planetas del Sistema Solar</Text>
        <View style={styles.planetsContainer}>
          {planetsData.map((planet) => (
            <TouchableOpacity
              key={planet.id}
              style={styles.planetCard}
              onPress={() => handlePlanetPress(planet)} // Al hacer clic en un planeta, lo pasamos a la pantalla de detalles
            >
              <Image
                source={{ uri: planet.imageUrl }}
                style={styles.planetImage}
              />
              <Text style={styles.planetName}>{planet.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sección Exoplanetas Famosos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Exoplanetas Famosos</Text>
        <View style={styles.planetsContainer}>
          {exoplanetsData.map((planet) => (
            <TouchableOpacity
              key={planet.id}
              style={styles.planetCard}
              onPress={() => handlePlanetPress(planet)}
            >
              <Image
                source={{ uri: planet.imageUrl }}
                style={styles.planetImage}
              />
              <Text style={styles.planetName}>{planet.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sección Últimos Planetas Descubiertos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Últimos Planetas Descubiertos</Text>
        <View style={styles.planetsContainer}>
          {latestPlanetsData.map((planet) => (
            <TouchableOpacity
              key={planet.id}
              style={styles.planetCard}
              onPress={() => handlePlanetPress(planet)}
            >
              <Image
                source={{ uri: planet.imageUrl }}
                style={styles.planetImage}
              />
              <Text style={styles.planetName}>{planet.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  planetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  planetCard: {
    width: "45%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  planetImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  planetName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
