//importe mi enditar de dominio
import { MediaItem } from "../../entidades/media/mediaItem";
import { MediaSearchParams } from "../../entidades/media/mediaSearchParams";

//export mi contrato que servira par apoder gestionar el MediaItem
export interface MediaRepository {
    //especifico mi metodo para obtener la media de la NASA 
    //también espefcicio que usa parametros params que usa la interface para estar mejor tipado
    getMediaNasa(params: MediaSearchParams): Promise<MediaItem[]>
}
