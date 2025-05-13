import { ItemsApodRepository } from "../../../../domain/repository/astronomy/apod/getItemsApodRepository";
import { GetItemsApods } from "../../../service/astronomy/apod/apoService";
import { ApodItem } from "../../../../domain/entidades/astronomy/apod/apodItem";
import { ApodModel } from "../../../models/astronomy/apod/apodModel";
import { StorageService } from "../../../service/storage/storageService";
import { mapApodModelToEntity } from "../../../../common/mappers/apodMapper";

export class apodItemRepositoryImple implements ItemsApodRepository {
  private service = new GetItemsApods();
  private readonly STORAGE_KEY_PREFIX = "CACHED_APOD_";

  async getItemApod(date: string): Promise<ApodItem> {
    const storageKey = `${this.STORAGE_KEY_PREFIX}${date}`;

    try {
      // Siempre intento obtener el dato desde el API
      const model: ApodModel = await this.service.fetchItemsApod(date);

      // Mapeo el modelo al formato de la entidad del dominio
      const entity: ApodItem = mapApodModelToEntity(model);

      // Guardo en caché por si luego estoy offline
      await StorageService.set(storageKey, entity);

      return entity;
    } catch (error) {
      // Si hay algún error, intento cargar desde el caché
      console.warn("Error al obtener APOD, usando caché si existe:", error);
    }

    // Si no tengo nada guardado, devuelvo algo por defecto para mostrar un mensaje al usuario
    const cached = await StorageService.get<ApodItem>(storageKey);
    return cached ?? {
      title: "Sin conexión",
      explanation: "No hay datos guardados para esta fecha.",
      url: "",
      date,
    };
  }
}