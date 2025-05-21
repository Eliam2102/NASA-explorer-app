import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useEpicViewModel } from '../../viewmodels/epic/epicThemeViewModel';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import LoadingOverlay from '../../../components/loading/Loading';
import LoadingAnimation from '../../../../assets/LoadingAnimation.json';
import ImageModal from '../../../components/Modals/gallery/ModalImage';

export default function EpicScreen() {
  const theme = useTheme();
  const { epicImages, loading, fetchEpicImages } = useEpicViewModel();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchEpicImages();
  }, []);

  const getImageUrl = (date: string, imageName: string) => {
    const [year, month, day] = date.split(" ")[0].split("-");
    return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${imageName}.png`;
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % epicImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + epicImages.length) % epicImages.length);
  };

  if (loading || epicImages.length === 0) {
    return <LoadingOverlay visible={true} animationSource={LoadingAnimation} />;
  }

  const currentImage = epicImages[currentIndex];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Imágenes Satelitales de la Tierra
        </Text>

        <View style={styles.descriptionBox}>
          <Text style={[styles.descriptionText, { color: theme.colors.onBackground }]}>
            En la sección de EPIC se obtienen imágenes satelitales del planeta Tierra.
          </Text>
          <Text style={[styles.descriptionText, { color: theme.colors.onBackground }]}>
            Mediante cada una de estas imágenes se obtienen datos importantes, como lo son: fecha, coordenadas, cercanía con el sol y hora.
          </Text>
          <Text style={[styles.descriptionText, { color: theme.colors.onBackground }]}>
            Ahora bien, mediante esta última se determina el horario actual y con ello se brinda el tema a la APP dependiendo de a qué hora inicie la APP.
          </Text>
        </View>

        <View style={styles.imageWrapper}>
          {currentIndex > 0 && (
            <TouchableOpacity onPress={handlePrev} style={[styles.navButtonSide, { backgroundColor: theme.colors.surface }]}>
              <FontAwesome5 name="arrow-left" size={20} color={theme.colors.onSurface} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Animated.Image
              entering={FadeIn.duration(600)}
              exiting={FadeOut.duration(300)}
              source={{ uri: getImageUrl(currentImage.date, currentImage.imageName) }}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {currentIndex < epicImages.length - 1 && (
            <TouchableOpacity onPress={handleNext} style={[styles.navButtonSide, { backgroundColor: theme.colors.surface }]}>
              <FontAwesome5 name="arrow-right" size={20} color={theme.colors.onSurface} />
            </TouchableOpacity>
          )}
        </View>

        <Animated.View
          entering={SlideInRight.duration(600)}
          exiting={SlideOutLeft.duration(300)}
          style={[styles.infoBox, { backgroundColor: theme.colors.surface }]}
          key={currentImage.imageName}
        >
          <Text style={[styles.imageId, { color: theme.colors.onSurface }]}>ID: {currentImage.imageName}</Text>
          <Text style={[styles.infoText, { color: theme.colors.onSurface }]}>Fecha: {currentImage.date}</Text>
          <Text style={[styles.infoText, { color: theme.colors.onSurface }]}>
            Coordenadas: {currentImage.centroidCoordinates.lat.toFixed(2)}, {currentImage.centroidCoordinates.lon.toFixed(2)}
          </Text>
          <Text style={[styles.infoText, { color: theme.colors.onSurface }]}>
            Distancia al Sol: x: {currentImage.sunPosition.x.toFixed(2)}, y: {currentImage.sunPosition.y.toFixed(2)}, z: {currentImage.sunPosition.z.toFixed(2)}
          </Text>
        </Animated.View>

        <ImageModal
          visible={modalVisible}
          imageUrls={[
            {
              url: getImageUrl(currentImage.date, currentImage.imageName),
            },
          ]}
          currentIndex={0}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 16,
  },
  infoBox: {
    width: '90%',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  imageId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 3,
  },
  imageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  navButtonSide: {
    padding: 5,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  descriptionBox: {
    width: '90%',
    marginTop: 8,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
    marginBottom: 8,
  },
});
