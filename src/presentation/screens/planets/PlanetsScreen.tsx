import React, { useEffect, useState } from "react";
import {View,StyleSheet,Image,TouchableOpacity,FlatList,ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Planet } from "./interface/Planet";
import { PlanetStackNavigationProp } from "./types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/global/store";
// ViewModel actualizado con offline support
import { MarsViewModel } from "../../viewmodels/planets/marsViewModel";
import { MarsParams } from "../../../domain/entidades/planets/marsParams";
import { MarsPhotoRover } from "../../../domain/entidades/planets/marsRover";


// Componentes UI
import MarsRoverFilters from "../../../components/searchFilters/planets/marsSearchFilterrs";
import EmptyResults from "../../../components/empty/emptyResults";
import { useTheme, Text } from "react-native-paper";
import { showMessage } from "react-native-flash-message";

export default function PlanetsScreen() {
  const theme = useTheme();
  const navigation = useNavigation<PlanetStackNavigationProp>();
  const isOffline = useSelector((state: RootState) => state.offline.isOffline);

  // ViewModel con soporte offline
  const {
    marsImage,
    loading,
    fetchMarsPhotoRover,
    hasMore,
    err,
  } = MarsViewModel();

  // Estado para filtros del buscador
  const [filters, setFilters] = useState<MarsParams>({
    solDate: 1100,
    camera: "mast",
    rover: "curiosity",
  });

  // Mensaje de error si ocurre
  useEffect(() => {
    if (err) {
      showMessage({
        message: "Error de conexión",
        description: err,
        type: "danger", // Tipo de mensaje
        duration: 4000,
        backgroundColor: "red",
        color: "white",
      });
    }
  }, [err]);

  // función para manejar la selección de un planeta y navegar al detalle
  const handlePlanetPress = (planet: Planet) => {
    navigation.navigate("DetailsPlanetScreen", { planet });
  };

  // función para cargar más imágenes cuando se hace scroll
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchMarsPhotoRover(filters);
    }
  };

  // función que se llama al buscar desde el componente de filtros
  const onSearch = (selectedFilters: any) => {
    const newParams: MarsParams = {
      solDate: parseInt(selectedFilters.solDate || "1100"),
      camera: selectedFilters.camera || "fhaz",
      rover: selectedFilters.rover || "curiosity",
    };

    setFilters(newParams);
    fetchMarsPhotoRover(newParams, true); // true → resetear página e imágenes
  };


  // renderizado de cada tarjeta de imagen del rover
  const renderMarsPhoto = ({ item }: { item: MarsPhotoRover }) => {
    const secureUrl = item.imageUrl.startsWith("http://")
      ? item.imageUrl.replace("http://", "https://")
      : item.imageUrl;

    return (
      <TouchableOpacity
        style={[styles.planetCard, { backgroundColor: theme.colors.surface }]}
        onPress={() =>
          handlePlanetPress({
            id: item.id.toString(),
            name: `Mars Rover - ${item.cameraName}`,
            imageUrl: secureUrl,
            date: item.date,
            cameraName: item.cameraName,
            roverName: item.roverName,
            sol: item.solDate,
            status: item.status,
          })
        }
      >
        <Image source={{ uri: secureUrl }} style={styles.planetImage} />
        <Text
          style={[styles.planetName, { color: theme.colors.onSurface }]}
          numberOfLines={1}
        >
          {item.cameraName}
        </Text>
        <Text
          style={[styles.photoDate, { color: theme.colors.onSurface }]}
          numberOfLines={1}
        >
          {item.date}
        </Text>
      </TouchableOpacity>
    );
  };

  // renderizado del footer para mostrar un loader si se están cargando más datos
  const renderFooter = () =>
    loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    ) : null;

  return (
    <View style={[styles.containerFlat, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={marsImage}
        renderItem={renderMarsPhoto}
        keyExtractor={(item, index) =>
          `${item.id}_${item.date}_${item.cameraName}_${index}`
        }
        numColumns={2}
        columnWrapperStyle={styles.planetsContainer}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<EmptyResults />}
        ListHeaderComponent={
          <>
            <View>
              <MarsRoverFilters onSearch={onSearch} isOffline={isOffline}  />
            </View>
            <View style={styles.section}>
              <Text variant="headlineMedium" style={{ color: theme.colors.onBackground }}>
                Fotos del Mars Rover
              </Text>
            </View>
          </>
        }
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  planetsContainer: {
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  planetCard: {
    width: "47%",
    padding: 10,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 10,
  },
  planetImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  planetName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  photoDate: {
    fontSize: 12,
    textAlign: "center",
  },
  loadingContainer: {
    padding: 20,
  },
  filterContainer: {
    margin: 20,
    marginBottom: 5,
  },
});