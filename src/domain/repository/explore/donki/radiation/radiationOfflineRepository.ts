import { RadiationEvent } from "../../../../entidades/explore/donki/radiation";
import { RadiationRepository } from "./radiationRepository";
import { StorageService } from "../../../../../data/service/storage/storageService";

// Repositorio OFFLINE para obtener eventos de radiación desde la caché
export class RadiationOfflineRepository implements RadiationRepository {
  // Clave con la que se almacenan los eventos en el caché (debe coincidir con el repo online)
  private readonly storageKey = "radiation_events";

  /**
   * Obtiene eventos de radiación desde la caché local
   * @param start_date Fecha de inicio (no utilizada aquí pero se mantiene para compatibilidad)
   * @param end_date Fecha de fin (no utilizada aquí pero se mantiene para compatibilidad)
   * @returns Lista de eventos de radiación o una lista vacía si no hay datos
   */
  async getEventRadiation(start_date: string, end_date: string): Promise<RadiationEvent[]> {
    try {
      // Intento obtener los eventos almacenados en caché
      const cached = await StorageService.get<RadiationEvent[]>(this.storageKey);

      if (cached && cached.length > 0) {
        // Retorno los eventos convirtiendo las fechas string a Date si existen
        return cached.map(event => ({
          ...event,
          start: new Date(event.start), // ← importante para mantener tipo Date
        }));
      }

      // Si no hay datos en caché, retorno arreglo vacío
      return [];
    } catch (error) {
      console.error("❌ Error al obtener eventos de radiación desde caché:", error);
      return [];
    }
  }
}