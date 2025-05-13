import { RadiationEvent } from '../../../../domain/entidades/explore/donki/radiation';
import { RadiationEventModel } from '../../../models/explore/donki/radiationModel';
import { RadiationRepository } from '../../../../domain/repository/explore/donki/radiation/radiationRepository';
import { GetRadiationEvents } from "../../../service/explore/donki/radiationService";
import { StorageService } from "../../../service/storage/storageService";
import { mapRadiationEventModelToEntity } from '../../../../common/mappers/radiationMapper';

export class RadiationRepositoryImpl implements RadiationRepository {
  private readonly service = new GetRadiationEvents();
  private readonly storageKey = "radiation_events";

  async getEventRadiation(start_date: string, end_date: string): Promise<RadiationEvent[]> {
    try {
      console.log("ONLINE: Fetching radiation events from API...");

      // Obtengo los eventos de radiación de la API
      const data: RadiationEventModel[] = await this.service.fetchRadiation(start_date, end_date);

      // Transformo los datos utilizando el mapper
      const mapped: RadiationEvent[] = mapRadiationEventModelToEntity(data);

      // Guardar los datos mapeados en la caché
      await StorageService.set(this.storageKey, mapped);
      return mapped;
    } catch (error) {
      console.error("Error al obtener eventos de radiación, usando caché:", error);

      // Si ocurre un error, intento obtener los datos desde la caché
      const cached = await StorageService.get<RadiationEvent[]>(this.storageKey);
      return cached?.map(event => ({
        ...event,
        start: new Date(event.start), // Convertir start de string a Date
      })) ?? []; // Devuelvo los eventos de radiación desde la caché si existe
    }
  }
}