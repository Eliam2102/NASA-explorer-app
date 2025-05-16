import { MediaItem } from "../../entidades/media/mediaItem";
import { MediaSearchParams } from "../../entidades/media/mediaSearchParams";
import { MediaRepository } from "./mediaRepository";
import { StorageService } from "../../../data/service/storage/storageService";

export class MediaOfflineRepository implements MediaRepository {
  private readonly STORAGE_PREFIX = "CACHED_MEDIA_";

  async getMediaNasa(params: MediaSearchParams): Promise<MediaItem[]> {
  try {
    const cacheKey = this.getCacheKey(params);
    const cached = await StorageService.get<MediaItem[]>(cacheKey);

    // Si no hay datos, simplemente devolver arreglo vacío
    const validCache = cached && cached.length > 0 ? cached : [];

    // Filtra por mediaType para evitar mezclar imágenes con videos
    const filteredCached = params.mediaType
      ? validCache.filter((item) => item.mediaType === params.mediaType)
      : validCache;

    return filteredCached;
  } catch (error) {
    console.error("🛑 Error al acceder al caché de media:", error);
    return [];
  }
}
  private getCacheKey(params: MediaSearchParams): string {
    const query = params.query?.toLowerCase().replace(/\s+/g, "_") ?? "general";
    const type = params.mediaType ?? "all";
    return `${this.STORAGE_PREFIX}${type}_${query}`;
  }
}
