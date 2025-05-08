import { GeomagneticStorm } from '../../../../domain/entidades/explore/donki/geomagnetic';
import { GeomagneticStormModel } from "../../../models/explore/donki/geomagneticModel";
import { GeomagneticStormRepository } from "../../../../domain/repository/explore/donki/magneticStorm/magneticStormRepository";
import { GetGeomagneticStorms } from "../../../service/explore/donki/magneticStormService";

export class GeomagneticStormRepositoryImpl implements GeomagneticStormRepository {
  // Instancia del servicio
  private readonly service = new GetGeomagneticStorms();

  // Método para obtener las tormentas geomagnéticas desde el servicio
  async getGeomagneticStorm(start_date: string, end_date: string): Promise<GeomagneticStorm[]> {
    const data: GeomagneticStormModel[] = await this.service.fetchStorms(start_date, end_date);

    return data.map((item) => ({
      id: item.gstID,
      startTime: new Date(item.startTime),
      source: item.link,
      kpIndex: item.allKpIndex?.[0]?.kpIndex ?? 0 // toma el primer índice Kp si existe, si no, 0
    }));
  }
}