import { MarsRepository } from "../../../domain/repository/planets/marsRepository"; 
import { MarsPhotoRover } from "../../../domain/entidades/planets/marsRover"; 
import { GetMarsPhotoRoverService } from "../../service/planets/marsService";
import { MarsParams } from "../../../domain/entidades/planets/marsParams"; 
import { StorageService } from "../../service/storage/storageService"; 
import { mapMarsListToEntityList } from "../../../common/mappers/marsMappers";

export class MarsRepositoryImpl implements MarsRepository {
  private service = new GetMarsPhotoRoverService();
  private readonly STORAGE_PREFIX = "CACHED_MARS_";

  async getMarsPhotRover(params: MarsParams): Promise<MarsPhotoRover[]> {
    const cacheKey = this.getCacheKey(params);
    console.log("🔍 Parámetros recibidos:", params);
    console.log("📦 Clave de caché generada:", cacheKey);

    try {
      console.log("🌐 Obteniendo datos desde API de Mars Rover...");
      const response = await this.service.getPhotoMars(params);
      const mappedPhotos: MarsPhotoRover[] = mapMarsListToEntityList(response.photos);

      console.log("✅ Datos obtenidos desde API:", mappedPhotos);
      await StorageService.set(cacheKey, mappedPhotos);
      console.log("💾 Datos almacenados en caché con clave:", cacheKey);

      return mappedPhotos;

    } catch (error) {
      console.error("❌ Error al obtener datos desde API, usando caché. Error:", error);
      const cached = await StorageService.get<MarsPhotoRover[]>(cacheKey);
      console.log("📦 Datos obtenidos desde caché tras error:", cached);
      return cached ?? [];
    }
  }

  private getCacheKey(params: MarsParams): string {
    const solKey = params.solDate ?? "default";
    const rover = params.rover?.toLowerCase() ?? "general";
    return `${this.STORAGE_PREFIX}${rover}_${solKey}`;
  }
}