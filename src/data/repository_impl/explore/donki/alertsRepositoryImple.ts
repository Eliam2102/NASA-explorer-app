import { SpaceWeatherAlert } from "../../../../domain/entidades/explore/donki/notification";
import { NotificationSpaceWeatherRepository } from "../../../../domain/repository/explore/donki/notification/notificationRepository";
import { NotificationModel } from "../../../models/explore/donki/notificationModel";
import { GetNotifications } from "../../../service/explore/donki/notificationsService";
import { StorageService } from "../../../service/storage/storageService";
import { mapAlertModelToEntity } from '../../../../common/mappers/alertMapper';

export class NotificationSpaceWeatherRepositoryImpl implements NotificationSpaceWeatherRepository {
  private readonly service = new GetNotifications();
  private readonly storageKey = "space_weather_alerts";

  async getAlerts(start_date: string, end_date: string): Promise<SpaceWeatherAlert[]> {
    try {
      // Intento obtener las notificaciones desde la API
      console.log("ONLINE: Fetching notifications from API...");

      const data: NotificationModel[] = await this.service.fetchNotifications(start_date, end_date);

      // Transformo los datos con el mapper
      const mappedData: SpaceWeatherAlert[] = mapAlertModelToEntity(data);

      // Guardar en caché
      await StorageService.set(this.storageKey, mappedData);
      return mappedData;
    } catch (error) {
      // En caso de error, intento obtener los datos desde la caché
      console.error("Error al obtener datos de la API, usando caché:", error);
      const cached = await StorageService.get<SpaceWeatherAlert[]>(this.storageKey);
      return cached?.map(alert => ({
        ...alert,
        issueTime: new Date(alert.issueTime), // Convertir issueTime de string a Date
      })) ?? []; // Devuelvo las alertas desde la caché si existe
    }
  }
}