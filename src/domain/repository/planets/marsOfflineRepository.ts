import { MarsRepository } from "./marsRepository";
import { MarsPhotoRover } from "../../entidades/planets/marsRover";
import { StorageService } from "../../../data/service/storage/storageService";
import { MarsParams } from '../../entidades/planets/marsParams';

export class MarsOfflineRepository implements MarsRepository {
  private readonly STORAGE_PREFIX = "CACHED_MARS_";

  async getMarsPhotRover(params: MarsParams): Promise<MarsPhotoRover[]> {
    const cacheKey = this.getCacheKey(params);
    const cached = await StorageService.get<MarsPhotoRover[]>(cacheKey);

    console.log("📦 [Offline] Datos obtenidos desde caché con clave:", cacheKey, cached);

    return cached ?? [];
  }

  private getCacheKey(params: MarsParams): string {
    const solKey = params.solDate ?? "default";
    const rover = params.rover?.toLowerCase() ?? "general";
    return `${this.STORAGE_PREFIX}${rover}_${solKey}`;
  }
}