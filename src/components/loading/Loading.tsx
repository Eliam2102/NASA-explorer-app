import React from 'react';
import { View, StyleSheet, Dimensions, Modal } from 'react-native';
import LottieView from 'lottie-react-native';

interface LoadingOverlayProps {
  visible: boolean;
  animationSource: any; 
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible, animationSource }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <LottieView
          source={animationSource}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </Modal>
  );
};
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: width * 0.4,
    height: width * 0.4,
  },
});


export default LoadingOverlay;
