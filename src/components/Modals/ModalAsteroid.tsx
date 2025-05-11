import React from "react";
import { Modal, Text, View, ScrollView, StyleSheet, Pressable, Linking } from "react-native";
import { AsteroidModal } from "../interfaces/modalAsteroid";
import { useTheme } from "react-native-paper";
import { color } from "framer-motion";

const ModalAsteroid = ({ visible, onClose, asteroid }: AsteroidModal) => {
  const theme = useTheme();
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, {backgroundColor: theme.colors.surface}]}>
          <ScrollView contentContainerStyle={[styles.contentContainer, {backgroundColor: theme.colors.surface}]}>
            <Text style={[styles.title, {color: theme.colors.onSurface}]}>Nombre: <Text>{asteroid.name}</Text></Text>
            <Text style={[styles.label,  {color: theme.colors.onSurface}]}>ID: <Text style={[styles.value,  {color: theme.colors.onSurface}]}>{asteroid.id}</Text></Text>
            <Text style={[styles.label,  {color: theme.colors.onSurface}]}>Magnitud absoluta: <Text style={[styles.value,  {color: theme.colors.onSurface}]}>{asteroid.absoluteMagnitude}</Text></Text>
            <Text style={[styles.label,  {color: theme.colors.onSurface}]}>¿Es peligroso?: <Text style={[styles.value,  {color: theme.colors.onSurface}]}>{asteroid.isHazardous ? "Sí" : "No"}</Text></Text>
            <Text style={[styles.label,  {color: theme.colors.onSurface}]}>Diámetro (km): <Text style={[styles.value, {color: theme.colors.onSurface}]}>{asteroid.diameterKm.min} - {asteroid.diameterKm.max}</Text></Text>
            <Text style={[styles.label, {color: theme.colors.onSurface}]}>NASA URL:{" "}<Text style={[styles.value, styles.link]}onPress={() => Linking.openURL(asteroid.nasaUrl)}>{asteroid.nasaUrl}</Text></Text>

            <Text style={[styles.subTitle,  {color: theme.colors.onSurface}]}>Aproximaciones cercanas:</Text>
            {asteroid.closeApproaches.map((approach, index) => (
              <View key={index} style={[styles.approachContainer, {backgroundColor: theme.colors.surface}]}>
                <Text style={[styles.label, {color: theme.colors.onSurface}]}>Fecha: {approach.date}</Text>
                <Text style={[styles.label, {color: theme.colors.onSurface}]}>Velocidad (km/s): {approach.velocityKmPerSecond}</Text>
                <Text style={[styles.label, {color: theme.colors.onSurface}]}>Distancia mínima (km): {approach.missDistanceKm}</Text>
                <Text style={[styles.label, {color: theme.colors.onSurface}]}>Cuerpo orbitado: {approach.orbitingBody}</Text>
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

          <Pressable onPress={onClose} style={styles.topRightCloseButton}>
            <Text style={styles.topRightCloseText}>X</Text>
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
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  topRightCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16, // circular
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRightCloseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ModalAsteroid;
