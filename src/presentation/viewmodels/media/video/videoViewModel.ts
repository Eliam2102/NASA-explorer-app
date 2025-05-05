///import mi entidad
import { MediaItem } from '../../../../domain/entidades/media/mediaItem';
// immport el hook de  useState
import { useState } from 'react';
// aqui va mi use case, USO EL MISMO PORUQE ES EN GENERAL PARA COnsumir media, unicmaente el parametro media_type cambia
import { GetMediaNasaUseCase } from '../../../../domain/useCases/media/getMediaUseCase';
//aqui import mi implemtncion de repositorio
import { MediaRepositoryImpl } from '../../../../data/repository_impl/media/mediaRepositoryImpl';
//tipado de parametros
import { MediaSearchParams } from '../../../../domain/entidades/media/mediaSearchParams';


//aqui ya cominezo a crear mi viewmodel 
export const MediaVideoViewModel = () => {
    //manejador de estado par mis videos
    const [videos, setVideos] = useState<MediaItem[]>([]);
    //manejador de estado para mi loading
    const [loading, setLoading]= useState(false);
    //manejador para la pagina de carga principal por defect
    const [page, setPage]= useState(1);
    //manejador de carga para videos luego de scrollear (cargas más)
    const [hasMore, setHasMore] = useState (true);


    //intancia de mi use case
    const getMediaUseCase = new GetMediaNasaUseCase(new MediaRepositoryImpl());


    //creaacion de mi funcion asyncorana en un customhook
    const fetchVideoMediaNasa = async (params: MediaSearchParams, reset: boolean = false)=>{
        //verificar carga inicial
        if(loading) return; 
        setLoading(true);
        //aqui creo mi estrcutura de control (try catch)buena para el manejo de errores
        try{
            // pagina actual seteo
            const  currentPage = reset ? 1 : page;
            //creola respuesta para usar el metodo de mi use case
            const response = await getMediaUseCase.execute({...params,  mediaType: 'video', page: currentPage});
            console.log('Respuesta de videos: ', response);
            //validaicon mediante un ciclo que no este vacio, mediante length
            if (response.length === 0) {
                setHasMore(false);
              } else {
                setVideos(prev => reset ? response : [...prev, ...response]);
                setPage(currentPage + 1);
              }
        }catch(error){
            console.error('Error al obtener videos: ', error);
        }finally{
            setLoading(false);
        }
        
    }
    
    return {videos, loading, fetchVideoMediaNasa, hasMore, page}

}
