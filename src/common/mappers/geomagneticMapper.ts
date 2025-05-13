// infrastructure/mappers/explore/donki/geomagneticStormMapper.ts

import { GeomagneticStormModel } from '../../data/models/explore/donki/geomagneticModel';
import { GeomagneticStorm } from '../../domain/entidades/explore/donki/geomagnetic';

export function mapGeomagneticStormModelToEntity(data: GeomagneticStormModel[]): GeomagneticStorm[] {
  return data.map((item) => ({
    id: item.gstID,
    startTime: new Date(item.startTime),
    source: item.link,
    kpIndex: item.allKpIndex?.[0]?.kpIndex ?? 0
  }));
}