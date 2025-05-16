import { NeowsRepository } from "../../../../domain/repository/astronomy/neows/getAsteroidRepository";
import { Asteroid } from "../../../../domain/entidades/astronomy/neows/asteroid";
import { NeoWsApiResponse } from "../../../models/astronomy/neows/neowModel";
import { AsteroidsGetNeows } from "../../../service/astronomy/neows/neowService";
import { StorageService } from "../../../service/storage/storageService";
import { mapNeoWsApiResponseToAsteroids } from "../../../../common/mappers/asteroidMapper";

export class NeowsRepositoryImpl implements NeowsRepository {
  private service = new AsteroidsGetNeows();

  private getCacheKey(start: string, end: string): string {
    return `CACHED_ASTEROIDS_${start}_${end}`;
  }

  async getAsteroids(start_date: string, end_date: string): Promise<Asteroid[]> {
    const cacheKey = this.getCacheKey(start_date, end_date);
    
    try {
      console.log("ONLINE: Fetching from API...");
      const apiResponse: NeoWsApiResponse = await this.service.fetchAsteroids(start_date, end_date);
      const asteroids = mapNeoWsApiResponseToAsteroids(apiResponse);

      // Solo guardamos en caché si hay resultados
      if (asteroids.length > 0) {
        await StorageService.set(cacheKey, asteroids);
      }
      
      return asteroids;
    } catch (error) {
      console.error("Error al obtener datos en línea, usando caché:", error);
      const cached = await StorageService.get<Asteroid[]>(cacheKey);
      
      if (!cached || cached.length === 0) {
        // Si no hay datos en caché, devolvemos un array con un asteroide FALSO para mostrar mensaje
        return [{
          id: "no-data",
          name: "Sin conexión - Datos no disponibles",
          nasaUrl: "",
          absoluteMagnitude: 0,
          isHazardous: false,
          diameterKm: {
            min: 0,
            max: 0
          },
          closeApproaches: [{
            date: start_date,
            velocityKmPerSecond: 0,
            missDistanceKm: 0,
            orbitingBody: "Earth"
          }],
          orbitData: {
            eccentricity: 0,
            inclination: 0,
            orbitalPeriod: 0
          }
        }];
      }
      
      return cached;
    }
  }
}