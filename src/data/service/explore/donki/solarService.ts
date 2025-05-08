import { createApiInstance } from '../../../../common/api/conection';
import { SolarFlareModel } from '../../../models/explore/donki/solarModel';

export class GetSolarFlares {
  private readonly BASE_URL = 'https://api.nasa.gov/DONKI';
  private readonly API_KEY = 'dNi5zOnCpAPrKqzd6RPEzc7fIzuNMYduuT1zSvv5';

  async fetchFlares(start_date: string, end_date: string): Promise<SolarFlareModel[]> {
    const api = createApiInstance(this.BASE_URL);

    const response = await api.get<SolarFlareModel[]>('/FLR', {
      params: {
        start_date,
        end_date,
        api_key: this.API_KEY
      }
    });

    return response.data;
  }
}