import { createApiInstance } from "../../../../common/api/conection";
import { NeoWsApiResponse } from "../../../models/astronomy/neows/neowModel";

export class AsteroidsGetNeows {
  private readonly API_KEY = "dNi5zOnCpAPrKqzd6RPEzc7fIzuNMYduuT1zSvv5";
  private readonly BASE_URL = "https://api.nasa.gov/neo/rest/v1";

  private validateDateRange(start_date: string, end_date: string) {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays < 0) {
      throw new Error("La fecha de inicio no puede ser posterior a la fecha de fin.");
    }

    if (diffInDays > 7) {
      throw new Error("El rango de fechas no puede ser mayor a 7 días.");
    }
  }

  async fetchAsteroids(start_date: string, end_date: string): Promise<NeoWsApiResponse> {
    this.validateDateRange(start_date, end_date);

    const api = createApiInstance(this.BASE_URL);

    try {
      const response = await api.get<NeoWsApiResponse>('/feed', {
        params: {
          start_date,
          end_date,
          api_key: this.API_KEY
        }
      });

      return response.data;

    } catch (error: any) {
      console.error("Error en fetchAsteroids:", error.message);
      throw new Error(`Error en el servicio de asteroides: ${error.message}`);
    }
  }
}