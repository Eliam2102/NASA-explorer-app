import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { FadeInUp } from 'react-native-reanimated';
import { useTechTransferViewModel } from '../../viewmodels/explorer/techport/techportViewModel'
import LoadingOverlay from '../../../components/loading/Loading'
import LoadingAnimation from '../../../../assets/LoadingAnimation.json'
import { useTheme } from 'react-native-paper';

// Pantalla principal que muestra los proyectos de TechPort
export default function TechportScreen() {
  // Instanciamos el tema usando react-native-paper
  const theme = useTheme();

  // Parámetros fijos para la búsqueda, solo se calculan una vez
  const params = useMemo(() => ({
    query: 'robot', // Se filtran los proyectos que contienen la palabra 'robot'
    page: 1,        // Comienza desde la primera página
  }), [])

  // Estado para guardar los proyectos y la página actual
  const [page, setPage] = useState(1);

  // Hook personalizado que obtiene los datos del ViewModel (comunicación con la API o base de datos)
  const { projects, loading, error, loadNextPage } = useTechTransferViewModel({ ...params, page });

  // Estado de carga: muestra la animación de carga mientras se obtienen los datos
  if (loading && page === 1) {
    return (
      <>
        {/* Muestra la animación de carga */}
        <LoadingOverlay visible={true} animationSource={LoadingAnimation} />
      </>
    )
  }

  // Estado de error: si ocurre un error, muestra un mensaje en pantalla
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={[styles.errorText, { color: theme.colors.onBackground }]}>Error: {error}</Text>
      </View>
    )
  }

  // Estado cuando no se encuentran resultados, muestra un mensaje informando que no se encontraron proyectos
  if (!projects || projects.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={[styles.noResultsText, { color: theme.colors.onBackground }]}>No se encontraron proyectos.</Text>
      </View>
    )
  }

  // Renderizado principal de la lista de proyectos cuando los datos están disponibles
  return (
    <View style={[styles.screenContainer, {backgroundColor: theme.colors.background}]}>
      {/* Título de la pantalla */}
      <Text style={[styles.screenTitle, { color: theme.colors.primary }]}>Proyectos de TechPort</Text>
      {/* FlatList para mostrar los proyectos de manera eficiente */}
      <FlatList
        data={projects} // Datos de los proyectos
        keyExtractor={(item, index) => `${item.id}-${index}`}  // Clave única para cada item (usamos ID y índice para asegurar que sea único)
        contentContainerStyle={styles.list}  // Estilo para el contenedor de la lista
        onEndReached={() => {
          // Cargar la siguiente página cuando se llegue al final de la lista
          setPage((prevPage) => prevPage + 1);
        }}  
        onEndReachedThreshold={0.5}  // Umbral para el disparo de la carga de más datos (50% de la lista visible)
        ListFooterComponent={loading ? <ActivityIndicator size="small" color={theme.colors.primary} /> : null}  // Indicador de carga al final de la lista
        renderItem={({ item }) => (
          <Animated.View entering={FadeInUp} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            {/* Nombre del proyecto */}
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>🔬 {item.nombre}</Text>

            {/* Detalle del proyecto */}
            <Text style={[styles.label, { color: theme.colors.onSurface }]}>📄 Detalle</Text>
            <Text style={[styles.value, { color: theme.colors.onSurface }]}>{item.detalle}</Text>

            {/* URL del proyecto */}
            <Text style={[styles.label, { color: theme.colors.onSurface }]}>🌐 URL</Text>
            <Text style={[styles.link, { color: theme.colors.onSurface }]}>{item.url}</Text>
          </Animated.View>
        )}
      />
    </View>
  )
}

// Estilos para la pantalla
const styles = StyleSheet.create({
  // Contenedor principal de la pantalla, con un fondo claro y padding para los bordes
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  // Estilo para el título de la pantalla, se centra y usa un tamaño grande
  screenTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Roboto', // Asegúrate de que esta fuente esté disponible en tu proyecto
  },
  // Contenedor para centrar los elementos (usado en casos de error o sin resultados)
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  // Estilos de la lista (contendrá las tarjetas de proyectos)
  list: {
    paddingBottom: 16, // Añadimos un padding extra en la parte inferior para la animación de carga
  },
  // Estilos de las tarjetas donde se muestran los detalles de cada proyecto
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12, // Bordes redondeados para dar un aspecto más suave
    marginBottom: 16, // Separación entre tarjetas
    elevation: 5, // Sombras para dar un efecto de elevación en dispositivos Android
    shadowColor: '#000', // Sombras para dispositivos iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  // Título de cada proyecto (más destacado y en negrita)
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8, // Espacio entre el título y los detalles
  },
  // Estilo para las etiquetas de cada sección (Detalle, URL, etc.)
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10, // Espacio entre las etiquetas
  },
  // Estilo para los valores de las secciones (detalles del proyecto, URL, etc.)
  value: {
    fontSize: 14,
    marginTop: 2, // Espacio entre el valor y la etiqueta
  },
  // Estilo para los enlaces (URL) con color azul
  link: {
    fontSize: 14,
    color: '#007AFF', // Color azul para los enlaces
    marginTop: 4, // Espacio entre el valor y el enlace
  },
  // Estilo para mostrar el mensaje de error en caso de fallos en la carga de datos
  errorText: {
    fontSize: 16,
    color: 'red', // Rojo para destacar el error
    textAlign: 'center',
  },
  // Estilo para mostrar el mensaje cuando no se encuentran proyectos
  noResultsText: {
    fontSize: 16,
    color: '#999', // Gris para un mensaje suave
    textAlign: 'center',
  },
})
