// infrastructure/mappers/explore/donki/radiationMapper.ts

import { RadiationEventModel } from '../../data/models/explore/donki/radiationModel';
import { RadiationEvent } from '../../domain/entidades/explore/donki/radiation';

export function mapRadiationEventModelToEntity(data: RadiationEventModel[]): RadiationEvent[] {
  return data.map((item) => ({
    id: item.sepID,
    start: new Date(item.startTime),
    radiationType: item.eventType,
    source: item.instruments?.[0]?.displayName || "Desconocido"
  }));
}