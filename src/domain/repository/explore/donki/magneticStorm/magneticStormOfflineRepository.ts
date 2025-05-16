import { GeomagneticStormRepository } from "./magneticStormRepository";
import { GeomagneticStorm } from "../../../../entidades/explore/donki/geomagnetic";
import { StorageService } from "../../../../../data/service/storage/storageService";

// Repositorio OFFLINE que implementa la misma interfaz que el repositorio principal
export class GeomagneticStormOfflineRepository implements GeomagneticStormRepository {
  // Clave para acceder a los datos cacheados
  private readonly storageKey = "geomagnetic_storms";

  /**
   * Método para obtener las tormentas geomagnéticas desde la caché (modo offline).
   * @returns Lista de tormentas geomagnéticas almacenadas, o una lista vacía si no hay datos.
   */
  async getGeomagneticStorm(start_date: string, end_date: string): Promise<GeomagneticStorm[]> {
    try {
      // Obtener los datos desde AsyncStorage usando la clave configurada
      const cached = await StorageService.get<GeomagneticStorm[]>(this.storageKey);

      // Validar si existen datos cacheados y devolverlos
      if (cached && cached.length > 0) {
        return cached.map(storm => ({
          ...storm,
          startTime: new Date(storm.startTime), // Convertir startTime a tipo Date si es necesario
        }));
      }

      // Si no hay datos en caché, devolvemos una lista vacía
      return [];
    } catch (error) {
      console.error("Error al obtener tormentas geomagnéticas desde caché:", error);
      return [];
    }
  }
}