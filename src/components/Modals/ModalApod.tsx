import React, { useState } from 'react';
import {Modal,View,Text,ScrollView,Image,StyleSheet,Pressable,Linking,Dimensions,TouchableOpacity,} from 'react-native';
import { ModalApodProps } from '../interfaces/modalApod';
import WebView from 'react-native-webview';
import ImageViewer from 'react-native-image-zoom-viewer';

const ModalApod = ({ visible, onClose, apodItem }: ModalApodProps) => {
  const [isZoomVisible, setIsZoomVisible] = useState(false);

  if (!apodItem) return null;

  const isYouTubeVideo = apodItem?.url?.includes('youtube.com') || apodItem?.url?.includes('youtu.be');
  const isImage = apodItem?.url?.match(/\.(jpeg|jpg|gif|png)$/i);

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {/* Botón "X" superior derecha */}
            <Pressable onPress={onClose} style={styles.topRightCloseButton}>
              <Text style={styles.topRightCloseText}>✕</Text>
            </Pressable>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionLabel}>Título</Text>
                <Text style={styles.title}>{apodItem?.title}</Text>

                {isYouTubeVideo ? (
                  <WebView
                    source={{ uri: apodItem.url }}
                    style={styles.webview}
                    javaScriptEnabled
                    domStorageEnabled
                  />
                ) : isImage ? (
                  <TouchableOpacity onPress={() => setIsZoomVisible(true)}>
                    <Image
                      source={{ uri: apodItem.url }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.invalidMedia}>No se puede mostrar la media.</Text>
                )}

                <Text style={styles.sectionLabel}>Fecha</Text>
                <Text style={styles.value}>{apodItem?.date}</Text>

                {apodItem?.copyright && (
                  <>
                    <Text style={styles.sectionLabel}>Créditos</Text>
                    <Text style={styles.value}>{apodItem?.copyright}</Text>
                  </>
                )}

                <Text style={styles.sectionLabel}>URL del contenido</Text>
                <Text
                  style={[styles.value, styles.link]}
                  onPress={() => Linking.openURL(apodItem.url)}
                >
                  {apodItem.url}
                </Text>

                <Text style={styles.sectionLabel}>Descripción</Text>
                <Text style={styles.description}>{apodItem?.explanation}</Text>
              </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Zoom Image Viewer Modal */}
      <Modal visible={isZoomVisible} transparent={true} onRequestClose={() => setIsZoomVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <ImageViewer
            imageUrls={[{ url: apodItem.url }]}
            enableSwipeDown
            onSwipeDown={() => setIsZoomVisible(false)}
            onCancel={() => setIsZoomVisible(false)}
            renderIndicator={() => <View />}
          />
          <Pressable
            style={{
              position: 'absolute',
              top: 40,
              right: 20,
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: 20,
              padding: 10,
            }}
            onPress={() => setIsZoomVisible(false)}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>X</Text>
          </Pressable>
        </View>
      </Modal>
    </>
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
  topRightCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16, // circular
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRightCloseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginTop: 10,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default ModalApod;