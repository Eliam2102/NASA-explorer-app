import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Text, useTheme, Icon, Surface } from 'react-native-paper';
import { Asteroid } from '../../domain/entidades/neows/asteroid';

const CardAsteroid: React.FC<{ asteroid: Asteroid; onPress?: () => void }> = ({ asteroid, onPress }) => {
  const { colors } = useTheme();
  const hazardColor = asteroid.isHazardous ? colors.error : colors.primary;

  const closestApproach = asteroid.closeApproaches[0];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Surface style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.header}>
          <Icon
            source={asteroid.isHazardous ? 'alert-circle' : 'check-circle'}
            size={24}
            color={hazardColor}
          />
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {asteroid.name}
          </Text>
        </View>

        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Magnitud absoluta: {asteroid.absoluteMagnitude}
        </Text>

        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Diámetro estimado: {asteroid.diameterKm.min.toFixed(2)} km - {asteroid.diameterKm.max.toFixed(2)} km
        </Text>

        {closestApproach && (
          <View style={styles.infoBlock}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Próxima aproximación:</Text>
            <Text style={{ color: colors.text }}>
              {closestApproach.date} - {closestApproach.velocityKmPerSecond.toFixed(2)} km/s
            </Text>
            <Text style={{ color: colors.text }}>
              Distancia: {closestApproach.missDistanceKm.toLocaleString()} km
            </Text>
          </View>
        )}

        {asteroid.orbitData && (
          <View style={styles.infoBlock}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Órbita:</Text>
            <Text style={{ color: colors.text }}>
              Excentricidad: {asteroid.orbitData.eccentricity}
            </Text>
            <Text style={{ color: colors.text }}>
              Inclinación: {asteroid.orbitData.inclination}°
            </Text>
            <Text style={{ color: colors.text }}>
              Periodo orbital: {asteroid.orbitData.orbitalPeriod.toFixed(1)} días
            </Text>
          </View>
        )}

        <Text
          onPress={() => {
            if (asteroid.nasaUrl) Linking.openURL(asteroid.nasaUrl);
          }}
          style={[styles.link, { color: colors.primary }]}
        >
          Ver en NASA
        </Text>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoBlock: {
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  link: {
    marginTop: 10,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default CardAsteroid;