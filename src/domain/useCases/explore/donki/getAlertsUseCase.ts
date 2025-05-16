import { SpaceWeatherAlert } from "../../../entidades/explore/donki/notification";
import { NotificationSpaceWeatherRepository } from "../../../repository/explore/donki/notification/notificationRepository";

/**
 * Caso de uso para obtener alertas de clima espacial (online/offline)
 */
export class GetAlertsUseCase {
  // Se inyectan ambos repositorios: online y offline
  constructor(
    private onlineRepo: NotificationSpaceWeatherRepository,
    private offlineRepo: NotificationSpaceWeatherRepository
  ) {}

  /**
   * Ejecuta el caso de uso según el modo de conexión
   */
  async execute(start_date: string, end_date: string, isOffline: boolean): Promise<SpaceWeatherAlert[]> {
    return isOffline
      ? this.offlineRepo.getAlerts(start_date, end_date)
      : this.onlineRepo.getAlerts(start_date, end_date);
  }
}