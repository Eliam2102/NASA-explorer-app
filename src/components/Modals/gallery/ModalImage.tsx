// components/ImageModal.tsx
import React from 'react';
import { Modal, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

interface ImageModalProps {
  visible: boolean;
  imageUrls: { url: string }[];
  currentIndex: number;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ visible, imageUrls, currentIndex, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        {/* Cerrar en la esquina */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        <ImageViewer
          imageUrls={imageUrls}
          index={currentIndex}
          enableSwipeDown
          onSwipeDown={onClose}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  closeText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default ImageModal;
