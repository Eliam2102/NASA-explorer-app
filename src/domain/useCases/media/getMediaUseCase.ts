import { MediaItem } from "../../entidades/media/mediaItem";
import { MediaSearchParams } from "../../entidades/media/mediaSearchParams";
import { MediaRepository } from "../../repository/media/mediaRepository";


export class GetMediaNasaUseCase {
    //comrpendo que esto es una forma de inyeccion de depedndicas 
    //para qeu el use case sepa que necesita para funciona mi useCase
    constructor (private mediaRepository: MediaRepository){}

    //metodo para obtener la media
    async execute(params: MediaSearchParams): Promise<MediaItem[]>{
        return this.mediaRepository.getMediaNasa(params);
    }
}