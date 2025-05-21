import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Platform, Dimensions, Modal, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { AstronomyStackNavigationProp } from './types/types';
import CardImage from '../../../components/Cards/CardImage';
import { useApodViewModel } from '../../viewmodels/astronmy/apod/viewmodelAs';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import LoadingOverlay from '../../../components/loading/Loading';
import LoadingAnimation from '../../../../assets/LoadingAnimation.json';
import ModalApod from '../../../components/Modals/ModalApod';
import { ApodItem } from '../../../domain/entidades/astronomy/apod/apodItem';
import { Ionicons } from '@expo/vector-icons';

export default function ApodScreen() {
  const navigation = useNavigation<AstronomyStackNavigationProp>();
  const theme = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApodItem, setSelectedApodItem] = useState<ApodItem | null>(null);
  const contentOpacity = useRef(new Animated.Value(0)).current;

  // Formatear fecha para el ViewModel
  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const currentFormattedDate = formatDate(selectedDate);
  
  // Usar el ViewModel con la fecha actual
  const { itemApod, loading, refetch, isOffline } = useApodViewModel(currentFormattedDate);

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedApodItem(null);
  };

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
      return;
    }

    if (date) {
      setSelectedDate(date);
    }
  };

  const navigateToNeows = () => {
    navigation.navigate('NeowsScreen');
  };

  if (loading) {
  return (
    <LoadingOverlay visible={true} animationSource={LoadingAnimation} />
  );  
  }

  return (
    <>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text variant="headlineLarge" style={[styles.welcomeText, { color: theme.colors.primary }]}>
          Fotos Astronómicas
        </Text>

        <View style={styles.header}>
          <Text style={[styles.subTitle, { color: theme.colors.onSurface }]}>Bienvenido a la sección de astronomía</Text>
          <Text style={[styles.subTitle, { color: theme.colors.onSurface }]}>Aquí encontrarás las mejores fotos y datos.</Text>
        </View>

        <View style={styles.dateContainer}>
          <Text style={[styles.dateLabel, { color: theme.colors.primary }]}>Selecciona una fecha:</Text>

          {Platform.OS === 'web' ? (
            <input
              type="date"
              value={currentFormattedDate}
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
                appearance: 'none',
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
                  {currentFormattedDate}
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

        {!loading && (
          <TouchableWithoutFeedback onPress={() => {
            setSelectedApodItem(itemApod);
            setModalVisible(true);
          }}>
            <Animated.View style={[styles.cardContainer, { opacity: contentOpacity }]}>
              <CardImage
                url={itemApod?.url || "https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-18055.jpg"}
                date={itemApod?.date || ""}
                title={itemApod?.title || "Sin título"}
                copyright={itemApod?.copyright}
                explanation={itemApod?.explanation || "No hay explicación disponible."}
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

        <TouchableOpacity style={[styles.neowsButton, {backgroundColor: theme.colors.surface}]} onPress={navigateToNeows}>
          <Text style={[styles.neowsButtonText, {color: theme.colors.onSurface}]}>🔭 Ver NEOws</Text>
        </TouchableOpacity>
      </ScrollView>
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