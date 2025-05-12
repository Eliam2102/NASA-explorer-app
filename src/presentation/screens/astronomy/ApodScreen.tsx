import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Platform, Dimensions, Modal, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { AstronomyStackNavigationProp } from './types/types';
import CardImage from '../../../components/Cards/CardImage';
import { useApodViewModel } from '../../viewmodels/astronmy/apod/viewmodelAs';
import { Animated, TouchableWithoutFeedback} from 'react-native';
import LoadingOverlay from '../../../components/loading/Loading';
import LoadingAnimation  from '../../../../assets/LoadingAnimation.json'
import ModalApod from '../../../components/Modals/ModalApod';
import { ApodItem } from '../../../domain/entidades/astronomy/apod/apodItem';
import { Ionicons } from '@expo/vector-icons';



// Declaro mi función JSX para el componente ApodScreen
export default function ApodScreen() {
  //
  const navigation = useNavigation<AstronomyStackNavigationProp>();
  const theme = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const lastFetchedDate = useRef<string | null>(null);
  const { itemApod, loading, fetchApodItem } = useApodViewModel();
  //constantes para maenjar el estaod del modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApodItem, setSelectedApodItem] = useState<ApodItem | null>(null);

  const contentOpacity = useRef(new Animated.Value(0)).current;

  // cerrar modla
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedApodItem(null);
  };
  //opcaidad de tarjeta 
  //darle eefecto a la 
  // loading 
  useEffect(() => {
  if (!loading) {
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }
}, [loading]);

const handleDateChange = (event: any, date?: Date) => {
  setShowPicker(Platform.OS === 'ios');

  if (event.type === 'dismissed') {
    // Usuario canceló el picker → no hacer nada
    return;
  }

  if (date) {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    const normalizedSelectedDate = formattedDate.split('T')[0];
    const normalizedLastFetchedDate = lastFetchedDate.current?.split('T')[0];
    
    if (normalizedSelectedDate !== normalizedLastFetchedDate) {
      console.log("Fecha diferente, se hace fetch");
      lastFetchedDate.current = formattedDate;
      fetchApodItem(formattedDate);
    } else {
      console.warn('Misma fecha seleccionada, no se realiza fetch');
    }
  }
};

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    const formattedDate = formatDate(selectedDate);
    lastFetchedDate.current = formattedDate; 
    fetchApodItem(formattedDate);
  }, []); 

  const navigateToNeows = () => {
    navigation.navigate('NeowsScreen');
  };


  //Aqui pongo el loading mejor //si esta cargando se muestra el loading
  if (loading) {
    return (
      <>
      <LoadingOverlay visible={true} animationSource={LoadingAnimation}/>
      </>
    );
  }


  return (
    <>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text variant="headlineLarge" style={[styles.welcomeText, { color: theme.colors.primary }]}>
          Fotos Astronómicas
        </Text>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.subTitle, { color: theme.colors.onSurface }]}>Bienvenido a la sección de astronomía</Text>
          <Text style={[styles.subTitle, { color: theme.colors.onSurface }]}>Aquí encontrarás las mejores fotos y datos.</Text>
        </View>

        {/* Date Picker */}
        <View style={styles.dateContainer}>
          {/* Date Picker */}
          <View style={styles.dateContainer}>
            <Text style={[styles.dateLabel, { color: theme.colors.primary }]}>Selecciona una fecha:</Text>

            {Platform.OS === 'web' ? (
              <input
                type="date"
                value={formatDate(selectedDate)}
                max={formatDate(new Date())}
                onChange={(e) => {
                  const newDate = new Date(e.target.value);
                  handleDateChange({ type: 'set' }, newDate);
                }}
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
                    appearance: 'none', // Elimina estilos nativos del navegador
                    ':hover': {
                      borderColor: theme.colors.primary,
                      boxShadow: `0 0 0 2px ${theme.colors.primary}20`
                    },
                    ':focus': {
                      outline: 'none',
                      borderColor: theme.colors.primary,
                      boxShadow: `0 0 0 3px ${theme.colors.primary}30`
                    }
                  }}
                />
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setShowPicker(true)}
                  style={[styles.dateButton, {
                    backgroundColor: theme.colors.surface,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }]}
                >
                  <Ionicons name="calendar-outline" size={20} color={theme.colors.onSurface} style={{ marginRight: 8 }} />
                  <Text style={[styles.dateButtonText, { color: theme.colors.onSurface }]}>
                    {formatDate(selectedDate)}
                  </Text>
                </TouchableOpacity>

                {showPicker && (
                  <DateTimePicker
                    mode="date"
                    value={selectedDate}
                    display="default"
                    maximumDate={new Date()}
                    onChange={handleDateChange}
                  />
                )}
              </>
            )}
          </View>
        </View>

        {/* {loading && (
        <LoadingOverlay visible={true} animationSource={LoadingAnimation} />
        )} */}

      {/* Skeleton y contenido */}
          {!loading && itemApod?.url && (
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
              <Animated.View style={[styles.cardContainer, { opacity: contentOpacity }]}>
                <CardImage
                  url={itemApod.url}
                  date={itemApod.date}
                  title={itemApod.title}
                  copyright={itemApod.copyright}
                  explanation={itemApod.explanation}
                  onPress={() => {
                    setSelectedApodItem(itemApod);
                    setModalVisible(true);
                  }}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          )}


          {selectedApodItem && (
            <ModalApod
              visible={modalVisible}
              onClose={handleCloseModal}
              apodItem={selectedApodItem}
            />
          )}
          {/* Botón para navegar a la pantalla de NEOws */}
          <TouchableOpacity style={[styles.neowsButton, {backgroundColor: theme.colors.surface}]} onPress={navigateToNeows}>
            <Text style={[styles.neowsButtonText, {color: theme.colors.onSurface}]}>🔭 Ver NEOws</Text>
          </TouchableOpacity>
        </ScrollView>

      {/* Modal para mostrar la info al presionar la imagen */}
    </>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 18,
  },
  subTitle: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  dateContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  dateButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateButtonText: {
    fontSize: 16,
  },
  cardContainer: {
    width: width - 30,
    marginBottom: 30,
  },
  neowsButton: {
    marginTop: 0,
    backgroundColor: '#0067FF',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    elevation: 5,
  },
  neowsButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});