import { GeomagneticStorm } from "../../../../entidades/explore/donki/geomagnetic";



export interface GeomagneticStormRepository {
    //definio mi contrato que dbee seguir la capa de data
    getGeomagneticStorm(start_date: string, end_date: string): Promise<GeomagneticStorm[]>;
}