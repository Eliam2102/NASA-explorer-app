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
      // Traemos la info de la API usando los params completos (incluyendo mediaType)
      const response = await this.service.fetchItems(params);
      const rawItems = response.collection?.items ?? [];
      const items = mapMediaApiListToEntityList(rawItems);

      // Filtramos SOLO el tipo que pide el parámetro
      const filteredItems = params.mediaType
        ? items.filter((item) => item.mediaType === params.mediaType)
        : items;

      // Guardamos en cache SOLO los filtrados para que no se mezclen
      await StorageService.set(cacheKey, filteredItems);

      return filteredItems;
    } catch (error) {
      console.error("Error al obtener media, usando caché:", error);

      // Si hay caché, lo cargamos y filtramos también por mediaType para evitar mezclas
      const cached = await StorageService.get<MediaItem[]>(cacheKey);
      const filteredCached = params.mediaType
        ? (cached ?? []).filter((item) => item.mediaType === params.mediaType)
        : (cached ?? []);

      return filteredCached;
    }
  }

  private getCacheKey(params: MediaSearchParams): string {
    const query = params.query?.toLowerCase().replace(/\s+/g, "_") ?? "general";
    const type = params.mediaType ?? "all";
    // La clave depende del tipo y del query, separando imagen y video
    return `${this.STORAGE_PREFIX}${type}_${query}`;
  }
}
