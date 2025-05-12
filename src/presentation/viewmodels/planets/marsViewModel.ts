import { MarsPhotoRover } from "../../../domain/entidades/planets/marsRover";
import { useState } from "react";
import { GetPhotoMarsRoverUseCase } from "../../../domain/useCases/planets/getPhotoMarsUseCase";
import { MarsRepositoryImpl } from "../../../data/repository_impl/planets/marsRepositoryImpl";
import { MarsParams } from "../../../domain/entidades/planets/marsParams";

//creo mi view model
export const MarsViewModel = () => {
    //manejador de estado del las imagenes
    const [marsImage, setMarsImage] = useState<MarsPhotoRover[]>([]);
    //manejador de estado de carga
    const [loading, setLoading] = useState(false);
    //manejador de estado de pagina de carga
    const [page, setPage] = useState(1);
    //manejo de estado de carga de más videos (para scroll infinito)
    const [hasMore, setHasMore] = useState(true);
    const [err, setError]= useState<string | null>(null);

    //instancia de mi useCase
    const getPhotoMarsRoverUseCase = new GetPhotoMarsRoverUseCase(new MarsRepositoryImpl());

    //funcion asyncrona
    const fetchMarsPhotoRover = async (params: MarsParams, reset = false) => {
        //validar la carga
        if (loading) return;
        setLoading(true);

        //blqoue try para poder manejar los errores
        try {
            const currentPage = reset ? 1 : page;
            const response = await getPhotoMarsRoverUseCase.execute({ ...params, page: currentPage });
            console.log('Imagenes de Mars Rovers:', response);
            //validar que no este vacia la respuesta
            if (response.length === 0) {
                setHasMore(false);
            } else {
                setMarsImage(prev => reset ? response : [...prev, ...response]);
                setPage(currentPage + 1);
            }
        } catch (error: any) {
            //aqui se atrapa algun erro y agregamos un console.erorr 
            //para poder ver cual es el error
            setError(error.message);
            console.error
        } finally {
            setLoading(false);
        }
    };

    // El return debe estar FUERA de la función fetchMarsPhotoRover
    return { marsImage, loading, fetchMarsPhotoRover, hasMore, page, err};
};