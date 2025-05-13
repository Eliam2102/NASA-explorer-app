import { SolarFlare } from "../../../../domain/entidades/explore/donki/solar";
import { SolarFlareModel } from "../../../models/explore/donki/solarModel";
import { SolarRepository } from "../../../../domain/repository/explore/donki/solar/solarRepository";
import { GetSolarFlares } from "../../../service/explore/donki/solarService";
import { StorageService } from "../../../service/storage/storageService";
import { mapSolarFlareModelToEntity } from "../../../../common/mappers/solarFlareMapper";

export class SolarRepositoryImpl implements SolarRepository {
  private readonly service = new GetSolarFlares();
  private readonly storageKey = "solar_flares";

  async getSolar(start_date: string, end_date: string): Promise<SolarFlare[]> {
    try {
      console.log("ONLINE: Fetching solar flares from API...");

      // Obtengo las llamaradas solares desde la API
      const rawData: SolarFlareModel[] = await this.service.fetchFlares(start_date, end_date);

      // Mapéo la data usando el mapper
      const mapped: SolarFlare[] = mapSolarFlareModelToEntity(rawData);

      // Guardar la data mapeada en caché
      await StorageService.set(this.storageKey, mapped);
      return mapped;
    } catch (error) {
      console.error("🌞 Error al obtener llamaradas solares, usando caché:", error);

      // Si ocurre un error, intento obtener los datos desde la caché
      const cached = await StorageService.get<SolarFlare[]>(this.storageKey);
      return cached?.map(f => ({
        ...f,
        start: new Date(f.start),
        peak: f.peak ? new Date(f.peak) : undefined, // Si peak existe, lo convierto a Date
      })) ?? []; // Devuelvo las llamaradas solares desde la caché si existe
    }
  }
}