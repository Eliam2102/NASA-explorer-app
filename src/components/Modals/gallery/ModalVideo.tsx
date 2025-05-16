import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { VideoView } from 'expo-video';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/global/store';
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

interface VideoPlayerModalProps {
  visible: boolean;
  onClose: () => void;
  player: ReturnType<typeof import('expo-video').useVideoPlayer> | null;
}

export default function VideoPlayerModal({ visible, onClose, player }: VideoPlayerModalProps) {
  const theme = useTheme();
  const isOffline = useSelector((state: RootState) => state.offline.isOffline);

  // Pausar el video automáticamente si está en modo offline
  React.useEffect(() => {
    if (isOffline && player) {
      player.pause();
    }
  }, [isOffline, player]);

  // Cuando el modal se cierre, pausamos el video para evitar que suene fuera de pantalla
  React.useEffect(() => {
    if (!visible && player) {
      player.pause();
    }
  }, [visible, player]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <MaterialIcons name="close" size={28} color={theme.colors.onSurface} />
        </TouchableOpacity>

        {isOffline || !player ? (
          <View style={styles.offlineContent}>
            <MaterialIcons 
              name="wifi-off" 
              size={60} 
              color={theme.colors.error} 
              style={styles.offlineIcon}
            />
            <Text style={[styles.offlineTitle, { color: theme.colors.onSurface}]}>
              No hay conexión a internet
            </Text>
            <Text style={[styles.offlineMessage, { color: theme.colors.secondary }]}>
              Conéctate a internet para ver este video
            </Text>
          </View>
        ) : (
          <VideoView 
            style={styles.videoPlayer} 
            player={player} 
            allowsFullscreen
            allowsPictureInPicture
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  offlineContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  offlineIcon: {
    marginBottom: 20,
  },
  offlineTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  offlineMessage: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 24,
  },
  videoPlayer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
