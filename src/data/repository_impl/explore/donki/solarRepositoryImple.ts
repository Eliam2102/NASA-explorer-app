import { SolarRepository } from "../../../../domain/repository/explore/donki/solar/solarRepository";
import { GetSolarFlares } from "../../../service/explore/donki/solarService";
import { SolarFlare } from "../../../../domain/entidades/explore/donki/solar";
import { SolarFlareModel } from "../../../models/explore/donki/solarModel";

export class SolarRepositoryImpl implements SolarRepository {
  private readonly service = new GetSolarFlares();

  async getSolar(start_date: string, end_date: string): Promise<SolarFlare[]> {
    const rawData: SolarFlareModel[] = await this.service.fetchFlares(start_date, end_date);

    return rawData.map((item) => ({
      id: item.flrID,
      start: new Date(item.beginTime),
      peak: item.peakTime ? new Date(item.peakTime) : undefined,
      intensityClass: item.classType,
      location: item.sourceLocation,
      source: item.instruments?.[0]?.displayName ?? "Unknown"
    }));
  }
}