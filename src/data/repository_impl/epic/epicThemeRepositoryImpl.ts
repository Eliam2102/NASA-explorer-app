import { EpicImage } from "../../../domain/entidades/theme/epicTheme";
import { EpicImageResponse } from "../../models/themeEpic/epicModel";
import { EpicThemeRepository } from "../../../domain/repository/epic/epicThemeRepository";
import { GetItemsEpic } from "../../service/epic/epicService";
import { mapEpicImageResponseToDomain } from "../../../common/mappers/epicMapper";
import { StorageService } from "../../service/storage/storageService";

export class EpicThemeRepositoryImpl implements EpicThemeRepository {
  private service = new GetItemsEpic();
  private readonly storageKey = "epic_images";

  async getImageEpic(): Promise<EpicImage[]> {
    try {
      // Obtener las imágenes desde el servicio
      const response: EpicImageResponse[] = await this.service.fetchItemsEpic();

      // Mapear las imágenes a la entidad del dominio
      const images: EpicImage[] = mapEpicImageResponseToDomain(response);

      // Guardar las imágenes en caché
      await StorageService.set(this.storageKey, images);
      return images;

    } catch (error) {
      console.error("Error al obtener las imágenes épicas:", error);

      // Leer las imágenes desde caché en caso de error
      const cached = await StorageService.get<EpicImage[]>(this.storageKey);
      return cached ?? [];
    }
  }
}