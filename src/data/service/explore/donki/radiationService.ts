import { createApiInstance } from '../../../../common/api/conection';
import { RadiationEventModel } from '../../../models/explore/donki/radiationModel';

export class GetRadiationEvents {
  private readonly BASE_URL = 'https://api.nasa.gov/DONKI';
  private readonly API_KEY = 'dNi5zOnCpAPrKqzd6RPEzc7fIzuNMYduuT1zSvv5';

  async fetchRadiation(startDate: string, end_date: string): Promise<RadiationEventModel[]> {
    const api = createApiInstance(this.BASE_URL);

    const response = await api.get<RadiationEventModel[]>('/SEP', {
      params: {
        startDate,
        end_date,
        api_key: this.API_KEY
      }
    });

    return response.data;
  }
}