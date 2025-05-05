import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ApodItem } from '../../domain/entidades/astronomy/apod/apodItem';
import { useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const fallbackImage = 'https://via.placeholder.com/300x220.png?text=No+Image';

function isImage(url: string) {
  return /\.(jpg|jpeg|png|gif)$/i.test(url);
}

function isYouTubeVideo(url: string) {
  return /youtube\.com|youtu\.be/i.test(url);
}

export default function CardImage({ url, date, title, copyright, explanation, onPress }: ApodItem & { onPress?: () => void }) {
  const theme = useTheme();
  const [imageUri, setImageUri] = useState(url || fallbackImage);
  const [showVideo, setShowVideo] = useState(false);
  const lastTap = useRef<number>(0);

  const handleImageError = () => {
    setImageUri(fallbackImage);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      // Detected double tap
      setShowVideo(true);
    } else {
      lastTap.current = now;
    }
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
          <TouchableWithoutFeedback onPress={handleDoubleTap}>
            <View style={styles.videoContainer}>
              {showVideo ? (
                <WebView
                  source={{ uri: url }}
                  style={styles.webview}
                  javaScriptEnabled
                  domStorageEnabled
                />
              ) : (
                <View style={[styles.videoContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Text style={{ color: '#fff' }}>Doble toque para reproducir video</Text>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
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