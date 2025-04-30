import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'; // <-- SOLO lo necesario
import { ApodItem } from '../../domain/entidades/apodItem';
import { useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview'; //impor el modulo de webview

const fallbackImage = 'https://via.placeholder.com/300x220.png?text=No+Image';

//validar la url para mostrar y que, algunos, traen video y no imagen, entonces para que se pueda apreciar mejor
function isImage(url: string) {
  return /\.(jpg|jpeg|png|gif)$/i.test(url);
}

//validar si es video, esta la url incluye el prefijo de YUTOBE
function isYouTubeVideo(url: string) {
  return /youtube\.com|youtu\.be/i.test(url);
}

//Exportar mi funcion JSX de mi compoente cARDiMAGE
export default function CardImage({ url, date, title, copyright, explanation, onPress }: ApodItem & { onPress?: () => void }) {
  const theme = useTheme();
  const [imageUri, setImageUri] = useState(url || fallbackImage);

  //se agrega el manejador de imagén por si esta no tiene imagen par amostrar una imagén por defecto.
  //Seteando un imageuri  CON EL FALLBCK IMAGEN DECLARADO ANTES
  const handleImageError = () => {
    setImageUri(fallbackImage);
  };

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      activeOpacity={0.8}
      onPress={onPress} 
    >
      {url ? (
        isImage(url) ? (
          <Image 
            source={{ uri: imageUri }} 
            style={styles.image} 
            resizeMode="cover" 
            onError={handleImageError}
          />
        ) : isYouTubeVideo(url) ? (
          <View style={styles.videoContainer}>
            <WebView
              source={{ uri: url }}
              style={styles.webview}
              javaScriptEnabled
              domStorageEnabled
            />
          </View>
        ) : (
          <Image 
            source={{ uri: fallbackImage }} 
            style={styles.image} 
            resizeMode="cover" 
          />
        )
      ) : (
        <Image 
          source={{ uri: fallbackImage }} 
          style={styles.image} 
          resizeMode="cover" 
        />
      )}

      <Text style={[styles.date, { color: theme.colors.textSecondary }]}>{date}</Text>
      {title && <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{title}</Text>}
      {copyright && <Text style={[styles.copyright, { color: theme.colors.textSecondary }]}>{copyright}</Text>}
      {explanation && (
        <Text
          style={[styles.description, { color: theme.colors.textPrimary }]}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {explanation}
        </Text>
      )}
    </TouchableOpacity>
  );
}

//RESPETANDO tu estructura original aquí abajo:
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.9;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    width: cardWidth,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 10,
  },
  videoContainer: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
  date: {
    fontStyle: 'italic',
    fontSize: 14,
    marginBottom: 6,
    textAlign: 'right',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 14,
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'justify',
  },
});