import React, { useEffect, useState } from 'react';
import {View,StyleSheet,FlatList,Image,Dimensions,Modal,TouchableOpacity,} from 'react-native';
import { Text, useTheme, Surface } from "react-native-paper";
import { MediaViewModel } from '../../viewmodels/media/Image/ImageViewModel';
import LoadingOverlay from '../../../components/loading/Loading';
import LoadingAnimation from '../../../../assets/LoadingAnimation.json';
import { SearchFilters } from '../../../components/searchFilters/handlerSeacrhFilters';
import ImageViewer from 'react-native-image-zoom-viewer';


//creación para manejar dos columnas indexada
const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

//componente de pantalla en galería
export default function GalleryScreen() {
  const theme = useTheme(); //modulo de useThem para poder usar mi tema
  //variables de estado
  const { images, loading, fetchImageMediaNasa, hasMore } = MediaViewModel();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchImageMediaNasa({ mediaType: 'image', page: 1 }, true); // reset
  }, []);

  const loadMoreImages = async () => {
    if (isFetchingMore || !hasMore) return;

    setIsFetchingMore(true);
    await fetchImageMediaNasa({ mediaType: 'image' }, false);
    setIsFetchingMore(false);
  };

  const handleSearch = (filters: any) => {
    fetchImageMediaNasa(filters, true); // reset
  };

  const openImage = (index: number) => {
    setCurrentImageIndex(index);
    setModalVisible(true);
  };

  ///mapeo para imaénes y crear una por una
  const imageViewerData = images.map((img) => ({ url: img.thumbnailUrl }));

  if (loading && images.length === 0) {
    return <LoadingOverlay visible={true} animationSource={LoadingAnimation} />;
  }

  if (!images || images.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <SearchFilters onSearch={handleSearch} />
        <Text style={[styles.noResults, {color: theme.colors.onPrimary}]}>No se encontraron imágenes.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={numColumns}
        ListHeaderComponent={<SearchFilters onSearch={handleSearch} />}
        contentContainerStyle={styles.gallery}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => openImage(index)} style={styles.imageContainer}>
            <Image source={{ uri: item.thumbnailUrl }} style={styles.image} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.imageTitle, {color: theme.colors.primary}]}>{item.title}</Text>
          </TouchableOpacity>
        )}
        onEndReached={loadMoreImages}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          <View style={{ padding: 15 }}>
            {isFetchingMore && <Text style={[styles.footerText, {color: theme.colors.primary}]}>Cargando más...</Text>}
            {!hasMore && <Text style={[styles.footerText, {color: theme.colors.primary}]}>No hay más imágenes.</Text>}
          </View>
        }
      />

      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <ImageViewer
          imageUrls={imageViewerData}
          index={currentImageIndex}
          enableSwipeDown
          onSwipeDown={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  gallery: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: (screenWidth - 30) / 2,
    height: 180,
    resizeMode: 'cover',
  },
  imageTitle: {
    padding: 6,
    fontSize: 12,
    color: '#333',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    padding: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#999',
  },
});