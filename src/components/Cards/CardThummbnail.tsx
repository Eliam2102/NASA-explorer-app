import React from 'react';
import { Pressable, Image, Text, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CardThumbnailProps } from '../interfaces/CardThumbaneil';


const CardThumbnail: React.FC<CardThumbnailProps> = ({ thumbnailUrl, title, onPress }) => {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Image source={{ uri: thumbnailUrl }} style={[styles.thumbnail, {backgroundColor: theme.colors.onSurface}]} resizeMode="cover" />
      {title && (
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={1}
            style={[styles.title, { color: theme.colors.onSurface }]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',       
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    marginVertical: 8,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 4,
  },
  title: {
    fontSize: 14,     // también puedes aumentar el texto si quieres
    fontWeight: '600',
  },
});

export default CardThumbnail;