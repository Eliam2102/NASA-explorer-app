import React from 'react';
import {View,Text,StyleSheet,FlatList,SafeAreaView,ScrollView,Linking,TouchableOpacity} from 'react-native';
import { useDonkiViewModel } from '../../viewmodels/explorer/donki/donkiViewModel';
import { useTheme } from 'react-native-paper';
import LoadingOverlay from '../../../components/loading/Loading';
import LoadingAnimation from '../../../../assets/LoadingAnimation.json';
import { color } from 'framer-motion';

// Función para dar formato legible a las fechas
const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleString();
};

// Valido si el string es una URL válida
const isValidUrl = (url: string) => /^https?:\/\//i.test(url);

// Componente reutilizable para mostrar el enlace de la fuente
const SourceLink = ({ source }: { source: string }) =>
  isValidUrl(source) ? (
    <TouchableOpacity onPress={() => Linking.openURL(source)}>
      <Text style={styles.link}>Fuente: {source}</Text>
    </TouchableOpacity>
  ) : (
    <Text style={styles.cardText}>Fuente: {source}</Text>
  );

// Tarjeta para mostrar tormentas geomagnéticas
const StormCard = ({ item }: { item: any }) => {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
        Tormenta Kp{item.kpIndex}
      </Text>
      <Text style={[styles.cardText, { color: theme.colors.onSurface }]}>
        Inicio: {formatDate(item.startTime)}
      </Text>
      <SourceLink source={item.source} />
    </View>
  );
};

// Tarjeta para alertas espaciales
const AlertCard = ({ item }: { item: any }) => {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
        {item.type}
      </Text>
      <Text style={[styles.cardText, { color: theme.colors.onSurface }]}>
        Emitida: {formatDate(item.issueTime)}
      </Text>
      <SourceLink source={item.source} />
      <Text
        style={[styles.cardText, { color: theme.colors.onSurface }]}
        numberOfLines={4}
      >
        Mensaje: {item.message}
      </Text>
    </View>
  );
};

// Tarjeta para erupciones solares
const FlareCard = ({ item }: { item: any }) => {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
        Erupción {item.intensityClass || '-'}
      </Text>
      <Text style={[styles.cardText, { color: theme.colors.onSurface }]}>
        Inicio: {formatDate(item.start)}
      </Text>
      {item.peak && (
        <Text style={[styles.cardText, { color: theme.colors.onSurface }]}>
          Pico: {formatDate(item.peak)}
        </Text>
      )}
      <Text style={[styles.cardText, { color: theme.colors.onSurface }]}>
        Ubicación: {item.location || 'N/A'}
      </Text>
      <SourceLink source={item.source} />
    </View>
  );
};

// Tarjeta para eventos de radiación
const RadiationCard = ({ item }: { item: any }) => {
  const theme = useTheme();

  return (
    <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
      <Text style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
        Radiación {item.radiationType || '-'}
      </Text>
      <Text style={[styles.cardText, { color: theme.colors.onSurface }]}>
        Inicio: {formatDate(item.start)}
      </Text>
      {item.end && (
        <Text style={[styles.cardText, { color: theme.colors.onSurface }]}>
          Fin: {formatDate(item.end)}
        </Text>
      )}
      <SourceLink source={item.source} />
    </View>
  );
};


// Renderiza cada sección del scroll (alertas, tormentas, etc.)
const renderSection = (
  title: string,
  data: any[],
  CardComponent: React.FC<{ item: any }>,
  titleColor: string
) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: titleColor }]}>{title}</Text>
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

// Componente principal de la pantalla DONKI
export default function DonkiScreen() {
  const theme = useTheme();
  // Obtengo los datos desde el viewModel con estado de carga y errores
  const { alerts, storms, radiation, solarFlares, loading, error } = useDonkiViewModel();

  // Si está cargando, muestro overlay con animación
  if (loading) {
    return (
      <LoadingOverlay visible={true} animationSource={LoadingAnimation} />
    );
  }

  // Si hay error, lo muestro centrado en pantalla
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Render principal con scroll vertical y secciones horizontales
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>
        ☄️ Eventos Espaciales Recientes
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderSection('🔔 Alertas de Clima Espacial', alerts, AlertCard, theme.colors.onBackground)}
        {renderSection('🌪️ Tormentas Geomagnéticas', storms, StormCard, theme.colors.onBackground)}
        {renderSection('☢️ Eventos de Radiación', radiation, RadiationCard, theme.colors.onBackground)}
        {renderSection('☀️ Erupciones Solares', solarFlares, FlareCard, theme.colors.onBackground)}
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos para la pantalla y los componentes
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
    backgroundColor: '#F1F5F9',
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