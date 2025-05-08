import { createApiInstance } from '../../../../common/api/conection';
import { TechTransferResponse } from '../../../models/explore/techport/techportResponse';

export class GetTechTransferProjects {
  private readonly BASE_URL = 'https://api.nasa.gov/techtransfer';
  private readonly API_KEY = 'VknMzSjgrHdmIclmX9pNYs3molwMPuYhSguML6aX';

  async fetchProjects(query: string = '', page: number = 1): Promise<TechTransferResponse[]> {
    const api = createApiInstance(this.BASE_URL);

    const response = await api.get<{ results: any[] }>(
      '/patent/',
      {
        params: {
          api_key: this.API_KEY,
          q: query,
          page: page,
        },
      }
    );

    // Cada result es un array con datos (según la estructura actual de la NASA)
    return response.data.results.map((entry) => ({
      id: entry[0],
      title: entry[1],
      description: entry[3],
      url: entry[10],
    }));
  }
}
