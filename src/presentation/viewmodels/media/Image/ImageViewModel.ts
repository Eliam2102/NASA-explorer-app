// Importamos la entidad que representa un ítem multimedia (imagen, video)
import { MediaItem } from '../../../../domain/entidades/media/mediaItem';

// Importamos React hooks para manejar estado dentro del ViewModel
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/global/store';

// Importamos el caso de uso que orquesta la lógica de obtención de media desde NASA
import { GetMediaUseCase } from '../../../../domain/useCases/media/getMediaUseCase';

// Importamos las implementaciones de repositorios online y offline
import { MediaRepositoryImpl } from '../../../../data/repository_impl/media/mediaRepositoryImpl';
import { MediaOfflineRepository } from '../../../../domain/repository/media/mediaOfflineRepository';

// Importamos los parámetros de búsqueda que usa el caso de uso
import { MediaSearchParams } from '../../../../domain/entidades/media/mediaSearchParams';

/**
 * ViewModel para obtener media (imágenes/videos) desde la API de NASA o desde cache offline.
 * Maneja el estado de carga, paginación y almacenamiento de imágenes en memoria.
 */
export const MediaViewModel = () => {
  const isOffline = useSelector((state: RootState) => state.offline.isOffline);
  // Estado para almacenar las imágenes obtenidas
  const [images, setImages] = useState<MediaItem[]>([]);

  // Estado para indicar si se está cargando data
  const [loading, setLoading] = useState(false);

  // Estado para manejar la página actual (paginación)
  const [page, setPage] = useState(1);

  // Estado para indicar si quedan más resultados por cargar
  const [hasMore, setHasMore] = useState(true);

  // Instanciamos el caso de uso inyectando los repositorios online y offline
  const getMediaUseCase = new GetMediaUseCase(
    new MediaRepositoryImpl(),      // Repositorio online
    new MediaOfflineRepository()    // Repositorio offline
  );

  /**
   * Función para obtener imágenes desde NASA API o desde cache.
   * 
   * @param params Parámetros de búsqueda (query, filtros, etc)
   * @param reset Si es true, reinicia el paginado y reemplaza las imágenes actuales
   */
  const fetchImageMediaNasa = async (params: MediaSearchParams, isOffline = false, reset = false) => {
    // Evitar múltiples llamadas concurrentes
    if (loading) return;

    setLoading(true);

    try {
      // Definir página actual: si reseteamos, vuelve a 1
      const currentPage = reset ? 1 : page;

      // Ejecutar caso de uso con los parámetros y modo offline/online
      const response = await getMediaUseCase.execute(
        { ...params, mediaType: 'image', page: currentPage },
        isOffline
      );


      console.log('📥 Imágenes recibidas:', response);

      if (response.length === 0) {
        // Si no hay resultados, marcamos que no hay más resultados
        setHasMore(false);
      } else {
        // Si reset es true, reemplaza todo, si no, agrega al arreglo actual
        setImages(prev => reset ? response : [...prev, ...response]);
        setPage(currentPage + 1);
      }
    } catch (error) {
      console.error('🛑 Error al obtener imágenes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Exponemos variables y funciones que el View puede consumir
  return {
    images,
    loading,
    fetchImageMediaNasa,
    hasMore,
    page
  };
};
