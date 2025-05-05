import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Surface, Text, Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface MeteorDetailModalProps {
  visible: boolean;
  onDismiss: () => void;
  meteor: {
    name: string;
    approachDate: string;
    diameterMin: number;
    diameterMax: number;
    velocity: number;
    distance: number;
    isHazardous: boolean;
  };
}

export default function MeteorDetailModal({ visible, onDismiss, meteor }: MeteorDetailModalProps) {
  const theme = useTheme();

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}>
        <Surface style={[styles.surface, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.header}>
            <Icon name="meteor" size={28} color={theme.colors.primary} style={styles.icon} />
            <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.primary }]}>
              {meteor.name}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Fecha de acercamiento:</Text>
            <Text style={[styles.value, { color: theme.colors.textPrimary }]}>{meteor.approachDate}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Diámetro estimado:</Text>
            <Text style={[styles.value, { color: theme.colors.textPrimary }]}>
              {meteor.diameterMin.toFixed(1)} m - {meteor.diameterMax.toFixed(1)} m
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Velocidad:</Text>
            <Text style={[styles.value, { color: theme.colors.textPrimary }]}>
              {meteor.velocity.toFixed(1)} km/h
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Distancia a la Tierra:</Text>
            <Text style={[styles.value, { color: theme.colors.textPrimary }]}>
              {meteor.distance.toFixed(2)} km
            </Text>
          </View>

          {meteor.isHazardous && (
            <View style={styles.badgeDanger}>
              <Text style={styles.badgeText}>⚠️ Potencialmente Peligroso</Text>
            </View>
          )}

          <Button
            mode="contained"
            onPress={onDismiss}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            labelStyle={{ color: theme.colors.onPrimary }}
          >
            Cerrar
          </Button>
        </Surface>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
  surface: {
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    flexShrink: 1,
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  badgeDanger: {
    backgroundColor: '#FC3D21',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 12,
    marginBottom: 20,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  button: {
    marginTop: 20,
    borderRadius: 30,
  },
});
