import { createApiInstance } from '../../../../common/api/conection';
import { NotificationModel } from '../../../models/explore/donki/notificationModel';

export class GetNotifications {
  private readonly BASE_URL = 'https://api.nasa.gov/DONKI';
  private readonly API_KEY = 'dNi5zOnCpAPrKqzd6RPEzc7fIzuNMYduuT1zSvv5';

  async fetchNotifications(start_date: string, end_date: string): Promise<NotificationModel[]> {
    const api = createApiInstance(this.BASE_URL);

    const response = await api.get<NotificationModel[]>('/notifications', {
      params: {
        start_date,
        end_date,
        api_key: this.API_KEY
      }
    });

    return response.data;
  }
}