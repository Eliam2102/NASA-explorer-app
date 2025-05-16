import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Linking, Button, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { useNeowsViewModel, useInitialDateRange } from '../../viewmodels/astronmy/neows/neowsViewModel'; 
import CardAsteroid from '../../../components/Cards/CardAsteroid';
import LoadingOverlay from '../../../components/loading/Loading';
import LoadingAnimation  from '../../../../assets/LoadingAnimation.json'
import ModalAsteroid from '../../../components/Modals/ModalAsteroid';
import { Asteroid } from '../../../domain/entidades/astronomy/neows/asteroid';
import { showMessage } from 'react-native-flash-message';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/global/store';

export default function AsteroidsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  
  // estados para las fechas
  const { initialStartDate, initialEndDate } = useInitialDateRange();
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [queryDates, setQueryDates] = useState({
    startDate: initialStartDate.toISOString().split('T')[0],
    endDate: initialEndDate.toISOString().split('T')[0]
  });
  
  //metodo del viewmodel - ahora con las fechas que se usarán para la consulta
  const { asteroids, loading, err, refetch } = useNeowsViewModel(queryDates.startDate, queryDates.endDate);
  
  // estados para los pickers
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  
  //para manejar el modal y su estado
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAsteroid, setSelectedAsteroid] = useState<Asteroid | null>(null);

  const isOffline = useSelector((state: RootState) => state.offline.isOffline);

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAsteroid(null);
  };

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

  // función para cargar asteroides - ahora actualiza las fechas de consulta y luego hace refetch
  const loadAsteroids = useCallback(() => {
    setQueryDates({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
  }, [startDate, endDate]);

  // Este efecto se ejecutará cuando queryDates cambie (después de presionar Buscar)
  useEffect(() => {
    if (queryDates.startDate && queryDates.endDate) {
      refetch();
    }
  }, [queryDates, refetch]);

  // Función para renderizar inputs de fecha según la plataforma
  const renderDateInput = (isStartDate: boolean) => {
    if (Platform.OS === 'web') {
      return (
        <input
          type="date"
          value={isStartDate ? startDate.toISOString().split('T')[0] : endDate.toISOString().split('T')[0]}
          onChange={(e) => {
            const date = new Date(e.target.value);
            if (date && !isNaN(date.getTime())) {
              if (isStartDate) setStartDate(date);
              else setEndDate(date);
            }
          }}
          required
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            border: `1px solid ${theme.colors.outline}`,
            color: theme.colors.onSurface,
            backgroundColor: theme.colors.surface,
            fontSize: '16px',
            marginBottom: '20px',
            width: '100%',
            maxWidth: '300px',
            boxSizing: 'border-box',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            appearance: 'none',
          }}
        />
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.customButton, { backgroundColor: theme.colors.surface }]}
          onPress={() => isStartDate ? setShowStartPicker(true) : setShowEndPicker(true)}
        >
          <Text style={[styles.customButtonText, { color: theme.colors.onSurface }]}>
            📅 {isStartDate ? 'Inicio' : 'Fin'}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  if (loading) {
    return (
      <LoadingOverlay visible={true} animationSource={LoadingAnimation} />
    );
  } else if (!asteroids) {
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

      <View style={styles.dateSelectors}>
        <View style={styles.buttonItem}>
          {isOffline ? (
            <View style={[styles.customButton, { backgroundColor: theme.colors.surfaceDisabled }]}>
              <Text style={[styles.customButtonText, { color: theme.colors.onSurfaceDisabled }]}>
                📅 Inicio
              </Text>
            </View>
          ) : (
            renderDateInput(true)
          )}
        </View>

        <View style={styles.buttonItem}>
          {isOffline ? (
            <View style={[styles.customButton, { backgroundColor: theme.colors.surfaceDisabled }]}>
              <Text style={[styles.customButtonText, { color: theme.colors.onSurfaceDisabled }]}>
                📅 Fin
              </Text>
            </View>
          ) : (
            renderDateInput(false)
          )}
        </View>

        <View style={styles.buttonItem}>
          <TouchableOpacity
            style={[styles.customButton, { 
              backgroundColor: isOffline ? theme.colors.surfaceDisabled : theme.colors.surface 
            }]}
            onPress={loadAsteroids}
            disabled={isOffline}
          >
            <Text style={[styles.customButtonText, { 
              color: isOffline ? theme.colors.onSurfaceDisabled : theme.colors.onSurface 
            }]}>
              Buscar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {!loading && (!asteroids || asteroids.length === 0) && (
        <View style={[styles.centered, { padding: 20 }]}>
          <Ionicons 
            name={isOffline ? "cloud-offline-outline" : "alert-circle-outline"} 
            size={40} 
            color={theme.colors.error} 
          />
          <Text style={{ fontSize: 16, color: theme.colors.onSurface, marginTop: 10, textAlign: 'center' }}>
            {isOffline 
              ? "Conéctate a internet para consultar nuevos rangos de fechas"
              : "No se encontraron asteroides para este rango de fechas"}
          </Text>
          {isOffline && (
            <Text style={{ fontSize: 14, color: theme.colors.onSurfaceVariant, marginTop: 5, textAlign: 'center' }}>
              Solo puedes consultar rangos de fechas previamente cargados
            </Text>
          )}
        </View>
      )}

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