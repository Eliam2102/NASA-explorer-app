import { SpaceWeatherAlert } from "../../../../domain/entidades/explore/donki/notification";
import { NotificationSpaceWeatherRepository } from "../../../../domain/repository/explore/donki/notification/notificationRepository";
import { NotificationModel } from "../../../models/explore/donki/notificationModel";
import { GetNotifications } from "../../../service/explore/donki/notificationsService";

export class NotificationSpaceWeatherRepositoryImpl implements NotificationSpaceWeatherRepository {
  // Instancia del servicio para consultar
  private readonly service = new GetNotifications();

  // Método para obtener las alertas del clima espacial
  async getAlerts(start_date: string, end_date: string): Promise<SpaceWeatherAlert[]> {
    const data: NotificationModel[] = await this.service.fetchNotifications(start_date, end_date);

    return data.map((item) => ({
      id: item.messageID,
      type: item.messageType,
      message: item.messageBody,
      issueTime: new Date(item.messageIssueTime),
      source: item.messageURL
    }));
  }
}