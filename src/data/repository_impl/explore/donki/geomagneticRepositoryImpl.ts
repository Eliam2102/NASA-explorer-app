import { GeomagneticStorm } from '../../../../domain/entidades/explore/donki/geomagnetic';
import { GeomagneticStormModel } from "../../../models/explore/donki/geomagneticModel";
import { GeomagneticStormRepository } from "../../../../domain/repository/explore/donki/magneticStorm/magneticStormRepository";
import { GetGeomagneticStorms } from "../../../service/explore/donki/magneticStormService";
import { StorageService } from "../../../service/storage/storageService";
import { mapGeomagneticStormModelToEntity } from '../../../../common/mappers/geomagneticMapper';

export class GeomagneticStormRepositoryImpl implements GeomagneticStormRepository {
  private readonly service = new GetGeomagneticStorms();
  private readonly storageKey = "geomagnetic_storms";

  async getGeomagneticStorm(start_date: string, end_date: string): Promise<GeomagneticStorm[]> {
    try {
      // Intento obtener las tormentas geomagnéticas desde la API
      console.log("ONLINE: Fetching geomagnetic storms from API...");

      const data: GeomagneticStormModel[] = await this.service.fetchStorms(start_date, end_date);
      
      // Transformo los datos con el mapper
      const mappedData: GeomagneticStorm[] = mapGeomagneticStormModelToEntity(data);
      
      // Guardar los datos en caché
      await StorageService.set(this.storageKey, mappedData);
      return mappedData;
    } catch (error) {
      // En caso de error, intento obtener los datos desde la caché
      console.error("Error al obtener datos de la API, usando caché:", error);
      const cached = await StorageService.get<GeomagneticStorm[]>(this.storageKey);
      return cached?.map(storm => ({
        ...storm,
        startTime: new Date(storm.startTime), // Convertir startTime de string a Date
      })) ?? []; // Devuelvo las tormentas geomagnéticas desde la caché si existe
    }
  }
}