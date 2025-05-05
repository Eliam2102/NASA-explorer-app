import { ApodModel } from "../../../models/astronomy/apod/apodModel";
import { createApiInstance } from "../../../../common/api/conection";

export class GetItemsApods {
  private readonly BASE_URL = 'https://api.nasa.gov';
  private readonly API_KEY = 'dNi5zOnCpAPrKqzd6RPEzc7fIzuNMYduuT1zSvv5';

  async fetchItemsApod(date?: string): Promise<ApodModel> {
    const api = createApiInstance(this.BASE_URL);

    const response = await api.get<ApodModel>(
      '/planetary/apod',
      {
        params: {
          api_key: this.API_KEY,
          ...(date ? { date } : {})
        }
      }
    );

    return response.data;
  }
}