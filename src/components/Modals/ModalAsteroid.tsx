import React from "react";
import { Modal, Text, View, ScrollView, StyleSheet, Pressable, Linking } from "react-native";
import { AsteroidModal } from "../interfaces/modalAsteroid";

const ModalAsteroid = ({ visible, onClose, asteroid }: AsteroidModal) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Nombre: <Text>{asteroid.name}</Text></Text>
            <Text style={styles.label}>ID: <Text style={styles.value}>{asteroid.id}</Text></Text>
            <Text style={styles.label}>Magnitud absoluta: <Text style={styles.value}>{asteroid.absoluteMagnitude}</Text></Text>
            <Text style={styles.label}>¿Es peligroso?: <Text style={styles.value}>{asteroid.isHazardous ? "Sí" : "No"}</Text></Text>
            <Text style={styles.label}>Diámetro (km): <Text style={styles.value}>{asteroid.diameterKm.min} - {asteroid.diameterKm.max}</Text></Text>
            <Text style={styles.label}>NASA URL:{" "}<Text style={[styles.value, styles.link]}onPress={() => Linking.openURL(asteroid.nasaUrl)}>{asteroid.nasaUrl}</Text></Text>

            <Text style={styles.subTitle}>Aproximaciones cercanas:</Text>
            {asteroid.closeApproaches.map((approach, index) => (
              <View key={index} style={styles.approachContainer}>
                <Text>Fecha: {approach.date}</Text>
                <Text>Velocidad (km/s): {approach.velocityKmPerSecond}</Text>
                <Text>Distancia mínima (km): {approach.missDistanceKm}</Text>
                <Text>Cuerpo orbitado: {approach.orbitingBody}</Text>
              </View>
            ))}

            {asteroid.orbitData && (
              <>
                <Text style={styles.subTitle}>Datos orbitales:</Text>
                <Text>Excentricidad: {asteroid.orbitData.eccentricity}</Text>
                <Text>Inclinación: {asteroid.orbitData.inclination}</Text>
                <Text>Período orbital: {asteroid.orbitData.orbitalPeriod}</Text>
              </>
            )}
          </ScrollView>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  contentContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontWeight: "600",
    marginTop: 5,
  },
  value: {
    fontWeight: "400",
  },
  subTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  approachContainer: {
    marginTop: 5,
    padding: 8,
    backgroundColor: "#f4f4f4",
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default ModalAsteroid;
