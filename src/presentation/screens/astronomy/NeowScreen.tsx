import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AstronomyStackNavigationProp } from './types/types';  // Asegúrate de que el tipo esté correctamente importado

export default function NeowsScreen() {
  const navigation = useNavigation<AstronomyStackNavigationProp>();  // Usamos el tipo correcto para la navegación

  const goBack = () => {
    navigation.goBack();  // Regresar a la pantalla anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vista generica para NEOSWS noticias "meteoritos"</Text>
      <Text>A esta pantalla llegaré desde APODScreen</Text>

      {/* Botón para regresar */}
      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Text style={styles.buttonText}>Volver a Apod</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
