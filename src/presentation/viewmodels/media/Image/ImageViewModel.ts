import { MediaItem } from '../../../../domain/entidades/media/mediaItem';
import { useState } from 'react';
import { GetMediaNasaUseCase } from '../../../../domain/useCases/media/getMediaUseCase';
import { MediaRepositoryImpl } from '../../../../data/repository_impl/media/mediaRepositoryImpl';
import { MediaSearchParams } from '../../../../domain/entidades/media/mediaSearchParams';

export const MediaViewModel = () => {
    const [images, setImages] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
  
    const getMediaNasaUseCase = new GetMediaNasaUseCase(new MediaRepositoryImpl());
  
    const fetchImageMediaNasa = async (params: MediaSearchParams, reset = false) => {
        if (loading) return;
        setLoading(true);
      
        try {
          const currentPage = reset ? 1 : page;
          const response = await getMediaNasaUseCase.execute({ ...params, page: currentPage });
          console.log('Imagenes: ', response);
          if (response.length === 0) {
            setHasMore(false);
          } else {
            setImages(prev => reset ? response : [...prev, ...response]);
            setPage(currentPage + 1);
          }
        } catch (error) {
          console.error('Error al consumir Imagenes: ', error);
        } finally {
          setLoading(false);
        }
      };
  
    return { images, loading, fetchImageMediaNasa, hasMore, page };
  };