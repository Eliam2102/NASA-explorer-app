import { GeomagneticStorm } from "../../../entidades/explore/donki/geomagnetic";
import { GeomagneticStormRepository } from "../../../repository/explore/donki/magneticStorm/magneticStormRepository";


export class GetGeomagneticStormsUseCase {
    //constructor para especificar que solo puede recibir le repo
    constructor (private repository: GeomagneticStormRepository){}

    //metodo para obtener los tormentas
    async execute(start_date: string, end_date: string): Promise<GeomagneticStorm[]>{
        return this.repository.getGeomagneticStorm(start_date, end_date);
    }
}