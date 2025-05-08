import { EpicImage } from "../../../domain/entidades/theme/epicTheme";
import { EpicImageResponse } from "../../models/themeEpic/epicModel";
import { EpicThemeRepository } from "../../../domain/repository/epic/epicThemeRepository";
import { GetItemsEpic } from "../../service/epic/epicService";

export class EpicThemeRepositoryImpl implements EpicThemeRepository {
  private service = new GetItemsEpic();

  async getImageEpic(): Promise<EpicImage[]> {
    const response: EpicImageResponse[] = await this.service.fetchItemsEpic();

    // Mapeamos a la entidad del dominio
    const images: EpicImage[] = response.map((item) => ({
      id: item.identifier,
      date: item.date,
      imageName: item.image,
    }));

    return images;
  }
}