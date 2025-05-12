import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { VideoView } from 'expo-video';

interface VideoPlayerModalProps {
  visible: boolean;
  onClose: () => void;
  player: ReturnType<typeof import('expo-video').useVideoPlayer>;
}

export default function VideoPlayerModal({ visible, onClose, player }: VideoPlayerModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        player.pause();
        onClose();
      }}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalCloseArea}
          onPress={() => {
            player.pause();
            onClose();
          }}
        >
          <Text style={styles.modalCloseText}>X</Text>
        </TouchableOpacity>
        <VideoView style={styles.video} player={player} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseArea: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
  },
});