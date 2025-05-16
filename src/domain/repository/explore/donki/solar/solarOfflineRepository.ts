import { StorageService } from "../../../../../data/service/storage/storageService";
import { SolarFlare } from "../../../../entidades/explore/donki/solar";
import { SolarRepository } from "./solarRepository";

/**
 * Repositorio OFFLINE para obtener llamaradas solares desde caché
 */
export class SolarRepositoryOffline implements SolarRepository {
  // Clave de almacenamiento usada en caché (debe coincidir con la usada en el repo online)
  private readonly storageKey = "solar_flares";

  /**
   * Obtiene llamaradas solares almacenadas localmente en caché
   * @param start_date Fecha de inicio (no usada aquí pero requerida por la interfaz)
   * @param end_date Fecha de fin (no usada aquí pero requerida por la interfaz)
   * @returns Lista de llamaradas solares desde caché, o una lista vacía si no hay datos
   */
  async getSolar(start_date: string, end_date: string): Promise<SolarFlare[]> {
    try {
      // Intento recuperar los datos desde el almacenamiento local
      const cached = await StorageService.get<SolarFlare[]>(this.storageKey);

      if (cached && cached.length > 0) {
        // Mapeo los campos de fecha a tipo Date si existen
        return cached.map(f => ({
          ...f,
          start: new Date(f.start),
          peak: f.peak ? new Date(f.peak) : undefined,
        }));
      }

      // Si no hay datos en caché, retorno arreglo vacío
      return [];
    } catch (error) {
      console.error("❌ Error al obtener llamaradas solares desde caché:", error);
      return [];
    }
  }
}