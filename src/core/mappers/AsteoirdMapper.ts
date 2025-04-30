// infrastructure/mappers/NeoWsMapper.ts
import { NeoWsApiResponse } from "../../data/models/astronomy/neows/neowModel";

export const mapNeoWsResponseToNearEarthObjects = (
  apiResponse: any
): ApiAsteroid[] => {
  // Extraer todos los asteroides de todas las fechas
  const asteroidsByDate = apiResponse.near_earth_objects;
  const allAsteroids: any[] = [];

  // Recorrer cada fecha y aplanar el array
  for (const date in asteroidsByDate) {
    allAsteroids.push(...asteroidsByDate[date]);
  }

  // Mapear cada asteroide de la API a tu modelo NearEarthObject
  return allAsteroids.map((apiAsteroid) => ({
    id: apiAsteroid.id,
    name: apiAsteroid.name,
    nasaJplUrl: apiAsteroid.nasa_jpl_url,
    absoluteMagnitude: apiAsteroid.absolute_magnitude_h,
    isPotentiallyHazardous: apiAsteroid.is_potentially_hazardous_asteroid,
    estimatedDiameter: {
      kilometers: {
        min: apiAsteroid.estimated_diameter.kilometers.estimated_diameter_min,
        max: apiAsteroid.estimated_diameter.kilometers.estimated_diameter_max,
      },
      meters: {
        min: apiAsteroid.estimated_diameter.meters.estimated_diameter_min,
        max: apiAsteroid.estimated_diameter.meters.estimated_diameter_max,
      },
      miles: {
        min: apiAsteroid.estimated_diameter.miles.estimated_diameter_min,
        max: apiAsteroid.estimated_diameter.miles.estimated_diameter_max,
      },
      feet: {
        min: apiAsteroid.estimated_diameter.feet.estimated_diameter_min,
        max: apiAsteroid.estimated_diameter.feet.estimated_diameter_max,
      },
    },
    closeApproachData: apiAsteroid.close_approach_data.map((approach: any) => ({
      date: approach.close_approach_date,
      velocityKmPerSec: parseFloat(approach.relative_velocity.kilometers_per_second),
      missDistanceKm: parseFloat(approach.miss_distance.kilometers),
      orbitingBody: approach.orbiting_body,
    })),
    orbitalData: apiAsteroid.orbital_data
      ? {
          eccentricity: apiAsteroid.orbital_data.eccentricity,
          inclination: apiAsteroid.orbital_data.inclination,
          orbitalPeriod: apiAsteroid.orbital_data.orbital_period,
        }
      : undefined,
  }));
};