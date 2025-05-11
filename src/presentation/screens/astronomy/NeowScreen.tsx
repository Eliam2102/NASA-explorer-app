import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Linking, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // <- nuevo import
import { neowsViewModel, useInitialDateRange } from '../../viewmodels/astronmy/neows/neowsViewModel'; 
import CardAsteroid from '../../../components/Cards/CardAsteroid';
import LoadingOverlay from '../../../components/loading/Loading';
import LoadingAnimation  from '../../../../assets/LoadingAnimation.json'
import ModalAsteroid from '../../../components/Modals/ModalAsteroid';
import { Asteroid } from '../../../domain/entidades/astronomy/neows/asteroid';
import { showMessage } from 'react-native-flash-message';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AsteroidsScreen() {
  const navigation = useNavigation();
  //instancia del hook de thema de paper
  const theme = useTheme();
  //metodo del viewmodel
  const { asteroids, loading, err, fecthAsteroidItems } = neowsViewModel();
  // estados para las fechas
  const { initialStartDate, initialEndDate } = useInitialDateRange();
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  //para manejar el modal  y su estado
  const [modalVisible, setModalVisible] = useState(false);
const [selectedAsteroid, setSelectedAsteroid] = useState<Asteroid | null>(null);

//cerar modalf
const handleCloseModal = () => {
  setModalVisible(false);
  setSelectedAsteroid(null);
};

  useEffect(() => {
    loadAsteroids();
  }, []);

  useEffect(() => {
    if (err) {
      showMessage({
        message: "Error al obtener asteroides",
        description: err,
        type: "danger",
        duration: 4000,
      });
    }
  }, [err]);

  // función para cargar asteroides
  //formateando primero la fecha start_date: fecha inicio
  //end_date: fecha final par ael rango
  const loadAsteroids = () => {
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];
    fecthAsteroidItems(startStr, endStr);
  };

  //si esta cargando se muestra el loading
  if (loading) {
    return (
      <>
      <LoadingOverlay visible={true} animationSource={LoadingAnimation} />
      </>
    );
  }

  if (!asteroids) {
    return (
      <View style={styles.centered}>
        <Text>No se encontraron asteroides</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.colors.onBackground }]}>
            Objetos Cercanos a la Tierra
          </Text>
         <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.colors.surface }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>
        </View>

      {/* Botones para seleccionar fechas */}
      <View style={styles.dateSelectors}>
          <View style={styles.buttonItem}>
            <TouchableOpacity
              style={[styles.customButton, { backgroundColor: theme.colors.surface }]}
              onPress={() => setShowStartPicker(true)}
            >
              <Text style={[styles.customButtonText, { color: theme.colors.onSurface }]}>
                📅 Inicio
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonItem}>
            <TouchableOpacity
              style={[styles.customButton, { backgroundColor: theme.colors.surface }]}
              onPress={() => setShowEndPicker(true)}
            >
              <Text style={[styles.customButtonText, { color: theme.colors.onSurface }]}>
                📅 Fin
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonItem}>
            <TouchableOpacity
              style={[styles.customButton, { backgroundColor: theme.colors.surface }]}
              onPress={loadAsteroids}
            >
              <Text style={[styles.customButtonText, { color: theme.colors.onSurface }]}>
              Buscar
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      {/* Pickers de fecha */}
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}

        <ScrollView style={{ marginTop: 16 }}>
          {asteroids.map((asteroid) => (
            <CardAsteroid
              key={asteroid.id}
              asteroid={asteroid}
              onPress={() => {
                setSelectedAsteroid(asteroid);
                setModalVisible(true);
              }}
            />
          ))}
        </ScrollView>

        {selectedAsteroid && (
          <ModalAsteroid
            visible={modalVisible}
            onClose={handleCloseModal}
            asteroid={selectedAsteroid}
          />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  asteroidCard: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  asteroidTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  asteroidInfo: {
    fontSize: 14,
    marginBottom: 4,
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  approachCard: {
    marginTop: 6,
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
  },
  approachInfo: {
    fontSize: 13,
  },
  link: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  dateSelectors: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10, // si tu versión de RN no soporta `gap`, usa marginHorizontal en buttonItem
  },
  
  buttonItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  
  customButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#ffffff10',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  customButtonText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
},
headerTitle: {
  fontSize: 18,
  fontWeight: 'bold',
},
backButton: {
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 8,
  elevation: 2,
},
backButtonText: {
  fontSize: 14,
  fontWeight: '600',
},
});