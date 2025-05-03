import React from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Linking,
  Dimensions
} from 'react-native';
import { ModalApodProps } from '../interfaces/modalApod';
import WebView from 'react-native-webview';

const ModalApod = ({ visible, onClose, apodItem }: ModalApodProps) => {
  if (!apodItem) return null; 
  const isYouTubeVideo = apodItem?.url?.includes('youtube.com') || apodItem?.url?.includes('youtu.be');
  const isImage = apodItem?.url?.match(/\.(jpeg|jpg|gif|png)$/i);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>{apodItem?.title}</Text>

            {isYouTubeVideo ? (
              <WebView
              source={{ uri: apodItem.url }}
              style={styles.webview}
              javaScriptEnabled
              domStorageEnabled
            />
            ) : isImage ? (
              <Image source={{ uri: apodItem.url }} style={styles.image} resizeMode="cover" />
            ) : (
              <Text style={styles.invalidMedia}>No se puede mostrar la media.</Text>
            )}

            <Text style={styles.label}>
              Fecha: <Text style={styles.value}>{apodItem?.date}</Text>
            </Text>

            {apodItem?.copyright && (
              <Text style={styles.label}>
                Copyright: <Text style={styles.value}>{apodItem?.copyright}</Text>
              </Text>
            )}

            <Text style={styles.label}>
              URL:{" "}
              <Text style={[styles.value, styles.link]} onPress={() => Linking.openURL(apodItem.url)}>
                {apodItem.url}
              </Text>
            </Text>

            <Text style={styles.description}>{apodItem?.explanation}</Text>
          </ScrollView>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  webview: {
    height: 220,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    maxHeight: '85%',
  },
  content: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  image: {
    width: width - 80,
    height: 220,
    borderRadius: 10,
    marginBottom: 15,
    alignSelf: 'center',
  },
  videoLink: {
    color: '#007AFF',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  invalidMedia: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  value: {
    fontWeight: '400',
  },
  link: {
    color: '#0066CC',
    textDecorationLine: 'underline',
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#0067FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ModalApod;