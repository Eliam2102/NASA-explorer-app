// NewsDetailScreen.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { BreakingNewStackParamList } from "./types/types";
import { New } from "./interface/New";

// Tipado para las propiedades de la pantalla
type NewsDetailScreenRouteProp = RouteProp<BreakingNewStackParamList, 'DetailNewScreen'>;

export default function NewsDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<NewsDetailScreenRouteProp>(); // Usamos useRoute para obtener los parámetros
  const { news } = route.params; // Aquí obtenemos la noticia

  const handleGoBack = () => {
    navigation.goBack(); // Función para regresar a la pantalla anterior
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.date}>{news.link ? `Fuente: ${news.link}` : 'Fecha desconocida'}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.body}>{news.description || "No hay descripción disponible."}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Fuente: NASA</Text>
      </View>
      {/* Botón de regresar */}
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Text style={styles.goBackText}>Regresar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Fondo del tema
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Borde sutil
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: '#333', // Título de la noticia
  },
  date: {
    fontSize: 14,
    fontWeight: "400",
    color: '#777', // Fecha en gris
    marginTop: 5,
  },
  contentContainer: {
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    color: '#333', // Cuerpo de la noticia
    lineHeight: 24,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Borde superior sutil
    paddingVertical: 10,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: '#777', // Pie de página
  },
  goBackButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  goBackText: {
    color: 'white',
    fontSize: 16,
  },
});
