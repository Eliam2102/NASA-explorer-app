import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { PlanetStackParamList } from "./types/types";
import ImageViewer from "react-native-image-zoom-viewer";
import { useTheme } from "react-native-paper";
import { color } from "framer-motion";

type DetailRouteProp = RouteProp<PlanetStackParamList, "DetailsPlanetScreen">;

export default function DetailPlanetScreen() {
  const theme = useTheme();
  const route = useRoute<DetailRouteProp>();
  const { planet } = route.params;
  const navigation = useNavigation();
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {/* Botón de Regresar */}
      <TouchableOpacity style={[styles.backButton, {backgroundColor: theme.colors.surface}]} onPress={() => navigation.goBack()}>
        <Text style={[styles.backButtonText, {color: theme.colors.onSurface}]}>Regresar</Text>
      </TouchableOpacity>

      {/* Imagen clickeable */}
      <TouchableOpacity onPress={() => setIsImageViewerVisible(true)}>
        <Image source={{ uri: planet.imageUrl }} style={styles.planetImage} />
      </TouchableOpacity>

      {/* Modal para el zoom viewer */}
      <Modal visible={isImageViewerVisible} transparent={true}>
        <ImageViewer
          imageUrls={[{ url: planet.imageUrl  ?? '' }]}
          onClick={() => setIsImageViewerVisible(false)}
          enableSwipeDown
          onSwipeDown={() => setIsImageViewerVisible(false)}
        />
      </Modal>

      <Text style={[styles.planetDescription, {color: theme.colors.onBackground}]}>Datos de la foto:</Text>
      <Text style={[styles.planetName, {color: theme.colors.onBackground}]}>{planet.name}</Text>
      <Text style={[styles.planetDescription, {color: theme.colors.onBackground}]}>Cámara: {planet.cameraName}</Text>
      <Text style={[styles.planetDescription, {color: theme.colors.onBackground}]}>Estatus: {planet.status}</Text>
      <Text style={[styles.planetDescription, {color: theme.colors.onBackground}]}>Fecha: {planet.date}</Text>
      <Text style={[styles.planetDescription, {color: theme.colors.onBackground}]}>Rover: {planet.roverName}</Text>
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
