import { NeowsRepository } from "../../../../domain/repository/astronomy/neows/getAsteroidRepository";
import { Asteroid } from "../../../../domain/entidades/astronomy/neows/asteroid";
import { NeoWsApiResponse } from "../../../models/astronomy/neows/neowModel";
import { AsteroidsGetNeows } from "../../../service/astronomy/neows/neowService";
import { StorageService } from "../../../service/storage/storageService";
import { NetworkService } from "../../../service/network/networkService";
import { mapNeoWsApiResponseToAsteroids } from "../../../../common/mappers/asteroidMapper";

export class NeowsRepositoryImpl implements NeowsRepository {
  private service = new AsteroidsGetNeows();
  private readonly STORAGE_KEY = "CACHED_ASTEROIDS"; // Clave para almacenar los asteroides en caché
  private networkService = new NetworkService();

  async getAsteroids(start_date: string, end_date: string): Promise<Asteroid[]> {
    // Intento obtener los asteroides desde la API
    try {
      console.log("ONLINE: Fetching from API...");

      // Realizo la solicitud a la API para obtener los asteroides
      const apiResponse: NeoWsApiResponse = await this.service.fetchAsteroids(start_date, end_date);

      // Mapeo la respuesta cruda de la API a los objetos de dominio (Asteroides)
      const asteroids = mapNeoWsApiResponseToAsteroids(apiResponse);

      // Guardo los asteroides en caché para poder usarlos después
      await StorageService.set(this.STORAGE_KEY, asteroids);

      return asteroids;
    } catch (error) {
      // Si ocurre un error, intento obtener los asteroides desde la caché
      console.error("Error al obtener datos en línea, usando caché:", error);
      const cached = await StorageService.get<Asteroid[]>(this.STORAGE_KEY);
      return cached ?? []; // Devuelvo los asteroides desde la caché si existe
    }
  }
}