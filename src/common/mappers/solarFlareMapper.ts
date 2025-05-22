import { SolarFlareModel } from '../../data/models/explore/donki/solarModel';
import { SolarFlare } from '../../domain/entidades/explore/donki/solar';

export function mapSolarFlareModelToEntity(data: SolarFlareModel[]): SolarFlare[] {
  return data.map((item) => ({
    id: item.flrID,
    start: new Date(item.beginTime),
    peak: item.peakTime ? new Date(item.peakTime) : undefined,
    intensityClass: item.classType,
    location: item.sourceLocation,
    source: item.instruments?.[0]?.displayName ?? "Unknown"
  }));
}