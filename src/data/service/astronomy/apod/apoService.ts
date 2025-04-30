import { ApodModel } from "../../../models/astronomy/apod/apodModel";
import ApiService from "../../../../common/api/conection";

export class GetItemsApods {
  async fetchItemsApod(date?: string): Promise<ApodModel> {
    const api = ApiService.getInstance('https://api.nasa.gov');

    const response = await api.get<ApodModel>(
      '/planetary/apod',
      {
        params: {
          api_key: 'dNi5zOnCpAPrKqzd6RPEzc7fIzuNMYduuT1zSvv5',
          ...(date ? { date } : {})
        }
      }
    );

    return response.data;
  }
}