import { GeomagneticStorm } from "../../../entidades/explore/donki/geomagnetic";
import { GeomagneticStormRepository } from "../../../repository/explore/donki/magneticStorm/magneticStormRepository";

/**
 * Caso de uso para obtener tormentas geomagnéticas (online/offline)
 */
export class GetGeomagneticStormsUseCase {
  constructor(
    private onlineRepo: GeomagneticStormRepository,
    private offlineRepo: GeomagneticStormRepository
  ) {}

  async execute(start_date: string, end_date: string, isOffline: boolean): Promise<GeomagneticStorm[]> {
    return isOffline
      ? this.offlineRepo.getGeomagneticStorm(start_date, end_date)
      : this.onlineRepo.getGeomagneticStorm(start_date, end_date);
  }
}