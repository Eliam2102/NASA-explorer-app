import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/global/store";

import { MarsPhotoRover } from "../../../domain/entidades/planets/marsRover";
import { MarsParams } from "../../../domain/entidades/planets/marsParams";

//importo mi caso de uso
import { GetPhotoMarsRoverUseCase } from "../../../domain/useCases/planets/getPhotoMarsUseCase";

//importo mis dos repositorios (online y offline)
import { MarsRepositoryImpl } from "../../../data/repository_impl/planets/marsRepositoryImpl";
import { MarsOfflineRepository } from "../../../domain/repository/planets/marsOfflineRepository";

//instancia de mi caso de uso con ambos repositorios (offline y online)
const useCaseInstance = new GetPhotoMarsRoverUseCase(
  new MarsRepositoryImpl(),
  new MarsOfflineRepository()
);

//creo mi view model
export const MarsViewModel = () => {
    //obtener estado de conexión offline desde Redux
    const isOffline = useSelector((state: RootState) => state.offline.isOffline);

    //manejador de estado del las imagenes
    const [marsImage, setMarsImage] = useState<MarsPhotoRover[]>([]);
    //manejador de estado de carga
    const [loading, setLoading] = useState(false);
    //manejador de estado de pagina de carga
    const [page, setPage] = useState(1);
    //manejo de estado de carga de más imagenes (para scroll infinito)
    const [hasMore, setHasMore] = useState(true);
    const [err, setError]= useState<string | null>(null);

    //funcion asyncrona
    const fetchMarsPhotoRover = async (params: MarsParams, reset = false) => {
        //validar la carga
        if (loading) return;
        setLoading(true);

        //bloque try para poder manejar los errores
        try {
            const currentPage = reset ? 1 : page;

            //ejecutar caso de uso pasando params + isOffline
            const response = await useCaseInstance.execute({ ...params, page: currentPage }, isOffline);
            console.log('🛸 Imagenes de Mars Rovers:', response);

            //validar que no este vacía la respuesta
            if (response.length === 0) {
                setHasMore(false);
            } else {
                setMarsImage(prev => reset ? response : [...prev, ...response]);
                setPage(currentPage + 1);
            }
        } catch (error: any) {
            //aqui se atrapa algun error y agregamos un console.error 
            //para poder ver cual es el error
            setError(error.message);
            console.error("🚨 Error al cargar fotos de Mars Rover:", error);
        } finally {
            setLoading(false);
        }
    };

    // El return debe estar FUERA de la función fetchMarsPhotoRover
    return { marsImage, loading, fetchMarsPhotoRover, hasMore, page, err };
};