// Importamos la entidad MediaItem que representa un ítem multimedia (imagen o video)
import { MediaItem } from "../../entidades/media/mediaItem";

// Importamos los parámetros de búsqueda utilizados por el servicio
import { MediaSearchParams } from "../../entidades/media/mediaSearchParams";

// Importamos la interfaz del repositorio (contrato común para online/offline)
import { MediaRepository } from "../../repository/media/mediaRepository";
/**
 * Caso de uso para obtener resultados multimedia (imágenes/videos) de la NASA.
 * Este caso de uso soporta funcionamiento en línea y fuera de línea (offline).
 */
export class GetMediaUseCase {
  // Se inyectan ambos repositorios: el principal (online) y el de respaldo (offline)
  constructor(
    private onlineRepo: MediaRepository,
    private offlineRepo: MediaRepository
  ) {}

  /**
   * Ejecuta la lógica del caso de uso.
   * Si el modo offline está activado, se consultan los datos almacenados en caché.
   *
   * @param params Parámetros de búsqueda como query, filtros, etc.
   * @param isOffline Indica si debe usarse el modo sin conexión (cache).
   * @returns Lista de resultados multimedia.
   */
  async execute(params: MediaSearchParams, isOffline: boolean): Promise<MediaItem[]> {
    return isOffline
      ? this.offlineRepo.getMediaNasa(params)
      : this.onlineRepo.getMediaNasa(params);
  }
}