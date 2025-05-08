import React, { useEffect, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useTechTransferViewModel } from '../../viewmodels/explorer/techport/techportViewModel';

export default function TechportScreen() {
  const params = useMemo(() => ({
    query: 'robot',
    page: 1,
  }), []); // El array vacío asegura que solo se cree una vez

  const { projects, loading, error } = useTechTransferViewModel(params);

  // No necesitas useEffect aquí si no haces nada

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando proyectos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No se encontraron proyectos.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={projects}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.nombre}</Text>
          <Text>Detalle: {item.detalle}</Text>
          <Text>URL: {item.url}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
  item: {
    backgroundColor: '#e0f7fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});