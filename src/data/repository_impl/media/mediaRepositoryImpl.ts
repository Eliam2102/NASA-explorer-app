import { MediaRepository } from "../../../domain/repository/media/mediaRepository";
import { MediaItem } from "../../../domain/entidades/media/mediaItem";
import { GetItemsMediaNasa } from "../../service/media/mediaService";
import { MediaSearchParams } from "../../../domain/entidades/media/mediaSearchParams";
import { StorageService } from "../../service/storage/storageService";
import { mapMediaApiListToEntityList } from "../../../common/mappers/mediaMapper";

export class MediaRepositoryImpl implements MediaRepository {
  private service = new GetItemsMediaNasa();
  private readonly STORAGE_PREFIX = "CACHED_MEDIA_";

  async getMediaNasa(params: MediaSearchParams): Promise<MediaItem[]> {
    const cacheKey = this.getCacheKey(params);

    try {
      const response = await this.service.fetchItems(params);
      const rawItems = response.collection?.items ?? [];
      const items = mapMediaApiListToEntityList(rawItems);
      // Filtrar solo imágenes para guardar
      const imagesOnly = items.filter((item) => item.mediaType === "image");
      await StorageService.set(cacheKey, imagesOnly);

      return items;
    } catch (error) {
      console.error("Error al obtener media, usando caché:", error);
      const cached = await StorageService.get<MediaItem[]>(cacheKey);
      return cached ?? [];
    }
  }

  private getCacheKey(params: MediaSearchParams): string {
    const query = params.query?.toLowerCase().replace(/\s+/g, "_") ?? "general";
    return `${this.STORAGE_PREFIX}${query}`;
  }
}