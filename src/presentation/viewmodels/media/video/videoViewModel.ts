// Importamos la entidad que representa un ítem multimedia (imagen, video)
import { MediaItem } from '../../../../domain/entidades/media/mediaItem';

// React hooks
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/global/store';

// UseCase y repositorios
import { GetMediaUseCase } from '../../../../domain/useCases/media/getMediaUseCase';
import { MediaRepositoryImpl } from '../../../../data/repository_impl/media/mediaRepositoryImpl';
import { MediaOfflineRepository } from '../../../../domain/repository/media/mediaOfflineRepository';
import { MediaSearchParams } from '../../../../domain/entidades/media/mediaSearchParams';

export const MediaVideoViewModel = () => {
  const isOffline = useSelector((state: RootState) => state.offline.isOffline);

  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMediaUseCase = new GetMediaUseCase(
    new MediaRepositoryImpl(),
    new MediaOfflineRepository()
  );

  /**
   * Esta función pública permite cargar los videos (y puede resetear si se requiere)
   */
  const fetchVideoMediaNasa = useCallback(
    async (params: MediaSearchParams, reset = false) => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        const currentPage = reset ? 1 : page;

        const response = await getMediaUseCase.execute(
          { ...params, mediaType: 'video', page: currentPage },
          isOffline
        );

        console.log('🎥 Videos recibidos:', response);

        if (response.length === 0) {
          setHasMore(false);
        } else {
          setVideos(prev => reset ? response : [...prev, ...response]);
          setPage(currentPage + 1);
          setHasMore(true);
        }
      } catch (error) {
        console.error('🛑 Error al obtener videos:', error);
        setError((error as Error).message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    },
    [loading, isOffline, page]
  );

  // Opcional: puedes cargar los primeros videos aquí si quieres automáticamente
  // useEffect(() => {
  //   fetchVideoMediaNasa({ mediaType: 'video', page: 1 }, true);
  // }, []);

  return {
    videos,
    loading,
    hasMore,
    page,
    error,
    fetchVideoMediaNasa, // 👈 AHORA SÍ expuesta correctamente
  };
};
