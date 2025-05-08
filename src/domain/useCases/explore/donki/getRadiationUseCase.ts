import { RadiationEvent } from "../../../entidades/explore/donki/radiation";
import { RadiationRepository } from "../../../repository/explore/donki/radiation/radiationRepository";


export class GetRadiationEventsUseCase {
    //iespecificar el repo en el constructor
    constructor (private repository: RadiationRepository){}


    //metodo para obtener los eventos
    async execute(start_date: string, end_date: string): Promise<RadiationEvent[]>{
        return this.repository.getEventRadiation(start_date, end_date);
    }
}