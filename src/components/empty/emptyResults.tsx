import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface NoResultsScreenProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const EmptyResults: React.FC<NoResultsScreenProps> = ({
  title = "No hay resultados",
  message = "Intenta con otros filtros o vuelve a buscar.",
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Volver a intentar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
    opacity: 0.8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});