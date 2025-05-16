import { RadiationEvent } from "../../../entidades/explore/donki/radiation";
import { RadiationRepository } from "../../../repository/explore/donki/radiation/radiationRepository";

/**
 * Caso de uso para obtener eventos de radiación solar (online/offline)
 */
export class GetRadiationEventsUseCase {
  constructor(
    private onlineRepo: RadiationRepository,
    private offlineRepo: RadiationRepository
  ) {}

  async execute(start_date: string, end_date: string, isOffline: boolean): Promise<RadiationEvent[]> {
    return isOffline
      ? this.offlineRepo.getEventRadiation(start_date, end_date)
      : this.onlineRepo.getEventRadiation(start_date, end_date);
  }
}