import { NotificationSpaceWeatherRepository } from "./notificationRepository";
import { SpaceWeatherAlert } from "../../../../entidades/explore/donki/notification";
import { StorageService } from "../../../../../data/service/storage/storageService";

// Repositorio OFFLINE para obtener alertas espaciales desde caché
export class NotificationSpaceWeatherOfflineRepository implements NotificationSpaceWeatherRepository {
  // Clave utilizada para almacenar y recuperar los datos en caché
  private readonly storageKey = "space_weather_alerts";

  /**
   * Método para obtener alertas espaciales desde caché
   * @param start_date Fecha de inicio (no se usa en offline pero se mantiene para compatibilidad)
   * @param end_date Fecha de fin (no se usa en offline pero se mantiene para compatibilidad)
   * @returns Lista de alertas almacenadas o vacía si no hay datos
   */
  async getAlerts(start_date: string, end_date: string): Promise<SpaceWeatherAlert[]> {
    try {
      // Intentar obtener los datos desde el caché
      const cached = await StorageService.get<SpaceWeatherAlert[]>(this.storageKey);

      // Validar si existen datos y transformar campos si es necesario
      if (cached && cached.length > 0) {
        return cached.map(alert => ({
          ...alert,
          issueTime: new Date(alert.issueTime),
        }));
      }

      // Retornar lista vacía si no hay datos en caché
      return [];
    } catch (error) {
      console.error("❌ Error al obtener alertas espaciales desde caché:", error);
      return [];
    }
  }
}