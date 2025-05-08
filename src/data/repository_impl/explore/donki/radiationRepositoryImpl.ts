import { GetRadiationEvents } from "../../../service/explore/donki/radiationService";
import { RadiationRepository } from '../../../../domain/repository/explore/donki/radiation/radiationRepository';
import { RadiationEvent } from '../../../../domain/entidades/explore/donki/radiation';
import { RadiationEventModel } from '../../../models/explore/donki/radiationModel';

export class RadiationRepositoryImpl implements RadiationRepository {
  // Instancia del servicio
  private readonly service = new GetRadiationEvents();

  // Método para obtener los eventos de radiación
  async getEventRadiation(start_date: string, end_date: string): Promise<RadiationEvent[]> {
    const data: RadiationEventModel[] = await this.service.fetchRadiation(start_date, end_date);

    return data.map((item) => ({
      id: item.sepID,
      start: new Date(item.startTime),
      // En este modelo no se expone un "endTime", por eso se deja como undefined si no existe
      radiationType: item.eventType,
      source: item.instruments?.[0]?.displayName || "Desconocido"
    }));
  }
}