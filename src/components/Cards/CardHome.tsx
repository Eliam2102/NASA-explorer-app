import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { CardH } from "../interfaces/Card";

const NasaCard: React.FC<CardH> = ({ title, iconName, onPress, backgroundColor = '#ffffff', image }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <FontAwesome5 name={iconName} size={28} color="#000" style={styles.icon} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>

      {image && <Image source={image} style={styles.image} />}
    </TouchableOpacity>
  );
};

export default NasaCard;

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 140,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 6,
  },
  content: {
    alignItems: 'center',
    gap: 6,
  },
  iconWrapper: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    borderRadius: 100,
  },
  icon: {
    color: 'white',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffff',
    textAlign: 'center',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginTop: 10,
  },
});