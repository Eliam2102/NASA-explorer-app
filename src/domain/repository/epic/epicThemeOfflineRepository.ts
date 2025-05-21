import { EpicImage } from "../../entidades/theme/epicTheme";
import { EpicThemeRepository } from "./epicThemeRepository";
import { StorageService } from "../../../data/service/storage/storageService";

export class EpicThemeOfflineRepository implements EpicThemeRepository {
  private readonly storageKey = "epic_images";

  async getImageEpic(): Promise<EpicImage[]> {
    try {
      const cached = await StorageService.get<EpicImage[]>(this.storageKey);
      if (cached) {
        console.log("Imágenes de EPIC desde caché offline");
        return cached;
      } else {
        console.warn("No se encontraron imágenes en caché");
        return [];
      }
    } catch (error) {
      console.error("Error al acceder al caché de imágenes épicas:", error);
      return [];
    }
  }
}
