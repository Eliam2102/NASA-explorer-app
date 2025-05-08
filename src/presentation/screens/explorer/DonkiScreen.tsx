import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { useDonkiViewModel } from '../../viewmodels/explorer/donki/donkiViewModel';
import { GeomagneticStorm } from '../../../domain/entidades/explore/donki/geomagnetic';
import { SpaceWeatherAlert } from '../../../domain/entidades/explore/donki/notification';
import { RadiationEvent } from '../../../domain/entidades/explore/donki/radiation';
import { SolarFlare } from '../../../domain/entidades/explore/donki/solar';

const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleString();
};

const isValidUrl = (url: string) => {
  return /^https?:\/\//i.test(url);
};

const SourceLink = ({ source }: { source: string }) =>
  isValidUrl(source) ? (
    <TouchableOpacity onPress={() => Linking.openURL(source)}>
      <Text style={styles.link}>Fuente: {source}</Text>
    </TouchableOpacity>
  ) : (
    <Text style={styles.cardText}>Fuente: {source}</Text>
  );

const StormCard = ({ item }: { item: GeomagneticStorm }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Tormenta Kp{item.kpIndex}</Text>
    <Text style={styles.cardText}>Inicio: {formatDate(item.startTime)}</Text>
    <SourceLink source={item.source} />
  </View>
);

const AlertCard = ({ item }: { item: SpaceWeatherAlert }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{item.type}</Text>
    <Text style={styles.cardText}>Emitida: {formatDate(item.issueTime)}</Text>
    <SourceLink source={item.source} />
    <Text style={styles.cardText} numberOfLines={4}>Mensaje: {item.message}</Text>
  </View>
);

const RadiationCard = ({ item }: { item: RadiationEvent }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Radiación {item.radiationType || '-'}</Text>
    <Text style={styles.cardText}>Inicio: {formatDate(item.start)}</Text>
    {item.end && <Text style={styles.cardText}>Fin: {formatDate(item.end)}</Text>}
    <SourceLink source={item.source} />
  </View>
);

const FlareCard = ({ item }: { item: SolarFlare }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Erupción {item.intensityClass || '-'}</Text>
    <Text style={styles.cardText}>Inicio: {formatDate(item.start)}</Text>
    {item.peak && <Text style={styles.cardText}>Pico: {formatDate(item.peak)}</Text>}
    <Text style={styles.cardText}>Ubicación: {item.location || 'N/A'}</Text>
    <SourceLink source={item.source} />
  </View>
);

const renderSection = (
  title: string,
  data: any[],
  CardComponent: React.FC<{ item: any }>
) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {data.length === 0 ? (
      <Text style={styles.emptyText}>No hay eventos</Text>
    ) : (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => <CardComponent item={item} />}
      />
    )}
  </View>
);

export default function DonkiScreen() {
  const { alerts, storms, radiation, solarFlares, loading, error } = useDonkiViewModel();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando eventos del clima espacial...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>☄️ Eventos Espaciales Recientes </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderSection('🔔 Alertas de Clima Espacial', alerts, AlertCard)}
        {renderSection('🌪️ Tormentas Geomagnéticas', storms, StormCard)}
        {renderSection('☢️ Eventos de Radiación', radiation, RadiationCard)}
        {renderSection('☀️ Erupciones Solares', solarFlares, FlareCard)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0F172A',
  },
  section: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#F1F5F9', // gris suave
    borderRadius: 20,
    padding: 20,
    marginRight: 16,
    width: 280,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0F172A',
  },
  cardText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 6,
  },
  link: {
    fontSize: 14,
    color: '#3B82F6',
    textDecorationLine: 'underline',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1E293B',
  },
  flatListContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    gap: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 4,
  },
});