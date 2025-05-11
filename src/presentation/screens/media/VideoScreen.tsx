import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MediaVideoViewModel } from '../../viewmodels/media/video/videoViewModel';
import LoadingOverlay from '../../../components/loading/Loading';
import LoadingAnimation from '../../../../assets/LoadingAnimation.json';
import { SearchFilters } from '../../../components/searchFilters/handlerSeacrhFilters';
import CardThumbnail from '../../../components/Cards/CardThummbnail';
import { useVideoPlayer, VideoView } from 'expo-video';


export default function VideoScreen() {
    const theme = useTheme(); // Usamos el tema para mantener los colores coherentes
    const { videos, loading, hasMore, fetchVideoMediaNasa } = MediaVideoViewModel(); // Traemos los datos de los videos desde el viewmodel
    const [isFetchingMore, setIsFetchingMore] = useState(false); // Estado para evitar llamadas múltiples al cargar más
    const [modalVisible, setModalVisible] = useState(false); // Controla si se muestra el modal del video
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Guarda el índice del video que estamos viendo

    // Cargamos los primeros videos apenas se monta el componente
    useEffect(() => {
        fetchVideoMediaNasa({ mediaType: 'video', page: 1 }, true);
    }, []);

    // Lógica para cargar más videos cuando llegamos al final del scroll
    const loadMoreVideos = async () => {
        if (isFetchingMore || !hasMore) return;
        setIsFetchingMore(true);
        await fetchVideoMediaNasa({ mediaType: 'video' }, false);
        setIsFetchingMore(false);
    };

    // Esta función se usa cuando buscamos videos con filtros
    const handleSearch = (filters: any) => {
        fetchVideoMediaNasa(filters, true);
    };

    // Abrimos el modal y guardamos cuál video fue seleccionado
    const openVideo = (index: number) => {
        setCurrentVideoIndex(index);
        setModalVisible(true);
    };

    // Esta función trata de obtener una URL directa de video a partir del enlace original
    const getPlayableVideoUrl = (url: string) => {
        if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')) {
            return url;
        }

        // Si es un enlace a una página, intentamos construir una URL de video directo
        const match = url.match(/\/video\/([^/]+)/);
        if (match) {
            const id = match[1];
            return `https://images-assets.nasa.gov/video/${id}/${id}~orig.mp4`;
        }

        return null; // Si no se puede reproducir, devolvemos null
    };

    // Creamos el array de videos con URLs válidas
    const videoViewerData = videos.map((vid) => ({
        url: getPlayableVideoUrl(vid.originalUrl)
    })).filter(v => v.url !== null); // Quitamos los que no tienen una URL válida

    // Creamos el reproductor de video usando el hook de expo-video
    const player = useVideoPlayer(videoViewerData[currentVideoIndex]?.url, (player) => {
        player.loop = true;
        player.play();
    });

    // Mientras se cargan los primeros videos, mostramos el loading
    if (loading && videos.length === 0) {
        return <LoadingOverlay visible={true} animationSource={LoadingAnimation} />;
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={videos}
                keyExtractor={(item, index) => `${item.id}-${index}`} // Generamos una clave única por item
                ListHeaderComponent={<SearchFilters onSearch={handleSearch} />} // Componente de búsqueda arriba del listado
                renderItem={({ item, index }) => (
                    <TouchableOpacity>
                        <CardThumbnail
                            thumbnailUrl={item.thumbnailUrl}
                            title={item.title}
                            onPress={() => openVideo(index)} // Cuando tocamos una tarjeta, abrimos el video
                        />
                    </TouchableOpacity>
                )}
                contentContainerStyle={{
                  paddingHorizontal: 15,
                  marginRight: 0,
                  paddingVertical: 8,
                }}
                onEndReached={loadMoreVideos} // Cuando llegamos al final, intentamos cargar más
                onEndReachedThreshold={0.5} // Margen para que cargue antes de llegar al final y tneer un margen
            />

            {/* Modal que se abre para reproducir el video */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    player.pause();
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    {/* Botón para cerrar el modal */}
                    <TouchableOpacity style={styles.modalCloseArea} onPress={() => {
                        player.pause();
                        setModalVisible(false);
                    }}>
                        <Text style={styles.modalCloseText}>X</Text>
                    </TouchableOpacity>
                    
                    {/* Componente que muestra el video */}
                    <VideoView style={styles.video} player={player} />
                </View>
            </Modal>
        </View>
    );
}

// Estilos para los elementos visuales
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCloseArea: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 5,
    },
    modalCloseText: {
        color: '#fff',
        fontSize: 16,
    },
    video: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.5,
    },
});