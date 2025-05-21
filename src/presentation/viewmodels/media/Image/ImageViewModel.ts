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


export const MediaViewModel = () => {
  // Estado global: indica si la app está en modo sin conexión
  const isOffline = useSelector((state: RootState) => state.offline.isOffline);

  // Estado local: lista de imágenes, estado de carga, paginado, control de fin de resultados
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  /**
   * Función para obtener imágenes desde NASA API o desde cache.
   * 
   * @param params Parámetros de búsqueda
   * @param reset Si es true, reinicia el paginado y reemplaza las imágenes actuales
   */
  const fetchImageMediaNasa = async (params: MediaSearchParams, reset = false) => {
    if (loading) return;

    setLoading(true);

    try {
      const currentPage = reset ? 1 : page;

      // Se instancian ambos repositorios (online y offline)
      const onlineRepo = new MediaRepositoryImpl();
      const offlineRepo = new MediaOfflineRepository();

      //  Se pasa ambos repositorios al caso de uso
      const getMediaUseCase = new GetMediaUseCase(onlineRepo, offlineRepo);

      // Se ejecuta el caso de uso pasando el flag de modo offline
      const response = await getMediaUseCase.execute({ ...params, page: currentPage }, isOffline);

      console.log('Imágenes recibidas:', response);

      if (response.length === 0) {
        setHasMore(false); // Si no hay resultados, se marca como sin más páginas
      } else {
        setImages(prev => reset ? response : [...prev, ...response]); // Se agregan o reemplazan las imágenes
        setPage(currentPage + 1); // Se incrementa la página para paginado futuro
      }
    } catch (error) {
      console.error('Error al obtener imágenes:', error);
    } finally {
      setLoading(false); // Siempre se termina el estado de carga
    }
  };

  return {
    images,
    loading,
    fetchImageMediaNasa,
    hasMore,
    page
  };
};
