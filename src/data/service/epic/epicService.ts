import { EpicImageResponse } from "../../models/themeEpic/epicModel";
import { createApiInstance } from "../../../common/api/conection";

export class GetItemsEpic {
  private readonly BASE_URL = 'https://epic.gsfc.nasa.gov/api';
  
  async fetchItemsEpic(): Promise<EpicImageResponse[]> {
    const api = createApiInstance(this.BASE_URL);

    const response = await api.get<EpicImageResponse[]>('/natural');

    return response.data;
  }
}