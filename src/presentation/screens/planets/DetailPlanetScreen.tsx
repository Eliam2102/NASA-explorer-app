import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { PlanetStackParamList } from "./types/types";
import ImageViewer from "react-native-image-zoom-viewer"; // Asegúrate de importar correctamente

type DetailRouteProp = RouteProp<PlanetStackParamList, "DetailsPlanetScreen">;

export default function DetailPlanetScreen() {
  const route = useRoute<DetailRouteProp>();
  const { planet } = route.params;
  const navigation = useNavigation();
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Botón de Regresar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>

      {/* Imagen clickeable */}
      <TouchableOpacity onPress={() => setIsImageViewerVisible(true)}>
        <Image source={{ uri: planet.imageUrl }} style={styles.planetImage} />
      </TouchableOpacity>

      {/* Modal para el zoom viewer */}
      <Modal visible={isImageViewerVisible} transparent={true}>
        <ImageViewer
          imageUrls={[{ url: planet.imageUrl  ?? '' }]}
          onClick={() => setIsImageViewerVisible(false)} // cerrar con tap
          enableSwipeDown
          onSwipeDown={() => setIsImageViewerVisible(false)}
        />
      </Modal>

      <Text style={styles.planetDescription}>Datos de la foto:</Text>
      <Text style={styles.planetName}>{planet.name}</Text>
      <Text style={styles.planetDescription}>Cámara: {planet.cameraName}</Text>
      <Text style={styles.planetDescription}>Estatus: {planet.status}</Text>
      <Text style={styles.planetDescription}>Fecha: {planet.date}</Text>
      <Text style={styles.planetDescription}>Rover: {planet.roverName}</Text>
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
