import { ItemsApodRepository } from "../../../../domain/repository/astronomy/apod/getItemsApodRepository";
import { StorageService } from "../../../../data/service/storage/storageService";
import { ApodItem } from "../../../../domain/entidades/astronomy/apod/apodItem";

export class ApodItemOfflineRepository implements ItemsApodRepository {
  private readonly STORAGE_KEY_PREFIX = "CACHED_APOD_";

  async getItemApod(date: string): Promise<ApodItem> {
    const storageKey = `${this.STORAGE_KEY_PREFIX}${date}`;
    const cached = await StorageService.get<ApodItem>(storageKey);

    return (
      cached ?? {
        title: "Sin datos",
        explanation: "No se encontró información en caché para esta fecha.",
        url: "",
        date,
      }
    );
  }
}