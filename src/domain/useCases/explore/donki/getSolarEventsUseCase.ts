import { SolarFlare } from "../../../entidades/explore/donki/solar";
import { SolarRepository } from "../../../repository/explore/donki/solar/solarRepository";

/**
 * Caso de uso para obtener erupciones solares (online/offline)
 */
export class GetSolarFlaresUseCase {
  constructor(
    private onlineRepo: SolarRepository,
    private offlineRepo: SolarRepository
  ) {}

  async execute(start_date: string, end_date: string, isOffline: boolean): Promise<SolarFlare[]> {
    return isOffline
      ? this.offlineRepo.getSolar(start_date, end_date)
      : this.onlineRepo.getSolar(start_date, end_date);
  }
}