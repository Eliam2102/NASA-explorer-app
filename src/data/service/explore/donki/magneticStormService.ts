import { createApiInstance } from '../../../../common/api/conection';
import { GeomagneticStormModel } from '../../../models/explore/donki/geomagneticModel';

export class GetGeomagneticStorms {
  private readonly BASE_URL = 'https://api.nasa.gov/DONKI';
  private readonly API_KEY = 'dNi5zOnCpAPrKqzd6RPEzc7fIzuNMYduuT1zSvv5';

  async fetchStorms(start_date: string, end_date: string): Promise<GeomagneticStormModel[]> {
    const api = createApiInstance(this.BASE_URL);

    const response = await api.get<GeomagneticStormModel[]>('/GST', {
      params: {
        start_date,
        end_date,
        api_key: this.API_KEY
      }
    });

    return response.data;
  }
}