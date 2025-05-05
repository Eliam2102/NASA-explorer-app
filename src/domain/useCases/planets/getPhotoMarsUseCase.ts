import { MarsPhotoRover } from "../../entidades/planets/marsRover";
import { MarsParams } from "../../entidades/planets/marsParams";
import { MarsRepository } from "../../repository/planets/marsRepository";

export class GetPhotoMarsRoverUseCase {
    //inyeccion de dependicias del constructor , en este caso se usa el repositorio
    constructor(private marsRepository: MarsRepository ){}

    //metodo para obtener las fotos de mars
    async execute(params: MarsParams): Promise<MarsPhotoRover[]>{
        return this.marsRepository.getMarsPhotRover(params);
    }
}