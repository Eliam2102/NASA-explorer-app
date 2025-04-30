import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.9;

const SkeletonCardImage = () => {
  const theme = useTheme();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!showSkeleton) {
    return null;
  }

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <View style={[styles.imagePlaceholder, { backgroundColor: theme.colors.onSurface }]} />
      <View style={[styles.textPlaceholder, { backgroundColor: theme.colors.onSurface }]} />
      <View style={[styles.textPlaceholder, { width: '60%', backgroundColor: theme.colors.onSurface }]} />
    </View>
  );
};

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
  imagePlaceholder: {
    width: '100%',
    height: 220, 
    borderRadius: 12,
    marginBottom: 10,
  },
  textPlaceholder: {
    height: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
});

export default SkeletonCardImage;
