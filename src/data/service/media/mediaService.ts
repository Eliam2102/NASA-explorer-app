import { createApiInstance } from "../../../common/api/conection";
import { MediaSearchParams } from "../../../domain/entidades/media/mediaSearchParams";
import { MediaModel } from "../../models/media/newModel";

export class GetItemsMediaNasa {
  async fetchItems(params: MediaSearchParams): Promise<MediaModel> {
    const api = createApiInstance('https://images-api.nasa.gov');
  
    const cleanParams = Object.fromEntries(
      Object.entries({
        q: params.query,
        media_type: params.mediaType,
        year_start: params.yearStart,
        year_end: params.yearEnd,
        description: params.description,
        title: params.title,
        keywords: params.keywords,
        center: params.center,
        page: params.page,
        // page_size: params.pageSize, este se quita no permite la API ver el tamaño pde la pagina, es deicr los leemtnos por pagina
      }).filter(([_, v]) => v !== undefined && v !== null && v !== '')
    );
  
    const response = await api.get<MediaModel>('/search', {
      params: cleanParams
    });
  
    return response.data;
  }
}