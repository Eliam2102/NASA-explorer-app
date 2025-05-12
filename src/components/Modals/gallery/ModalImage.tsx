// components/ImageModal.tsx
import React from 'react';
import { Modal } from 'react-native';
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
      <ImageViewer
        imageUrls={imageUrls}
        index={currentIndex}
        enableSwipeDown
        onSwipeDown={onClose}
      />
    </Modal>
  );
};

export default ImageModal;