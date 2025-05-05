import { createApiInstance } from "../../../common/api/conection";
import { MarsParams } from "../../../domain/entidades/planets/marsParams";
import { MarsModelResponse } from "../../models/planets/marsModel";

export class GetMarsPhotoRoverService {
  async getPhotoMars(params: MarsParams): Promise<MarsModelResponse> {
    const { rover, earthDate, solDate, camera, page = 1 } = params;

    const queryParams = new URLSearchParams({
      api_key: 'dNi5zOnCpAPrKqzd6RPEzc7fIzuNMYduuT1zSvv5',
      page: page.toString(),
    });

    if (earthDate) queryParams.append('earth_date', earthDate);
    if (solDate) queryParams.append('sol', solDate.toString());
    if (camera) queryParams.append('camera', camera);

    // Inicializamos ApiService con la baseURL de NASA
    const api = createApiInstance('https://api.nasa.gov/mars-photos/api/v1');
    
    // Ahora usamos endpoint relativo
    const endpoint = `rovers/${rover}/photos?${queryParams.toString()}`;
    
    const response = await api.get(endpoint);
    return response.data as MarsModelResponse;
  }
}