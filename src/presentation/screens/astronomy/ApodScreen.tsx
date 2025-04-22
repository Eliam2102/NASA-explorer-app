import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AstronomyStackNavigationProp } from './types/types';

export default function ApodScreen() {
  const navigation = useNavigation<AstronomyStackNavigationProp>();  

  const navigateToNeows = () => {
    navigation.navigate('NeowsScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vista generica para APOd</Text>
      <Text>Desde aquí ya navegarías para ir a Neows, que son los asteroides.</Text>

      {/* Botón o área táctil para navegar */}
      <TouchableOpacity style={styles.button} onPress={navigateToNeows}>
        <Text style={styles.buttonText}>Ir a Neows</Text>
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
