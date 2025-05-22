import React from 'react';
import {View,Text,StyleSheet,FlatList,SafeAreaView,ScrollView,Linking,TouchableOpacity} from 'react-native';
import { useDonkiViewModel } from '../../viewmodels/explorer/donki/donkiViewModel';
import { useTheme } from 'react-native-paper';
import LoadingOverlay from '../../../components/loading/Loading';
import LoadingAnimation from '../../../../assets/LoadingAnimation.json';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';


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
  const navigation = useNavigation();
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
      <TouchableOpacity style={[styles.backButton, {backgroundColor: theme.colors.surface}]} onPress={() => navigation.goBack()}>
                <Text style={[styles.backButtonText, {color: theme.colors.onSurface}]}>
                  <FontAwesome5 name='arrow-left' color={theme.colors.onSurface} size={20}/>
                </Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>
        Eventos Espaciales Recientes
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
    paddingHorizontal: 32,
    paddingTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 32,
    color: '#0F172A',
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1E293B',
    paddingLeft: 24,
  },
  flatListContainer: {
    paddingHorizontal: 24,
    gap: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginRight: 20,
    width: 300,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#0F172A',
  },
  cardText: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 20,
  },
  link: {
    fontSize: 15,
    color: '#2563EB',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#F8FAFC',
  },
  errorText: {
    fontSize: 18,
    color: '#DC2626',
    textAlign: 'center',
    marginTop: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 6,
  },
   backButton: {
    position: "absolute",
    top: 24,
    left: 13,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});