import { Asteroid } from "../../domain/entidades/astronomy/neows/asteroid";
import { NeoWsApiResponse } from "../../data/models/astronomy/neows/neowModel";

export function mapNeoWsApiResponseToAsteroids(response: NeoWsApiResponse): Asteroid[] {
  const asteroids: Asteroid[] = [];

  for (const date in response.near_earth_objects) {
    for (const apiAsteroid of response.near_earth_objects[date]) {
      asteroids.push({
        id: apiAsteroid.id,
        name: apiAsteroid.name,
        nasaUrl: apiAsteroid.nasa_jpl_url,
        absoluteMagnitude: apiAsteroid.absolute_magnitude_h,
        isHazardous: apiAsteroid.is_potentially_hazardous_asteroid,
        diameterKm: {
          min: apiAsteroid.estimated_diameter.kilometers.estimated_diameter_min,
          max: apiAsteroid.estimated_diameter.kilometers.estimated_diameter_max
        },
        closeApproaches: apiAsteroid.close_approach_data.map(approach => ({
          date: approach.close_approach_date,
          velocityKmPerSecond: parseFloat(approach.relative_velocity.kilometers_per_second),
          missDistanceKm: parseFloat(approach.miss_distance.kilometers),
          orbitingBody: approach.orbiting_body
        })),
        orbitData: apiAsteroid.orbital_data ? {
          eccentricity: parseFloat(apiAsteroid.orbital_data.eccentricity),
          inclination: parseFloat(apiAsteroid.orbital_data.inclination),
          orbitalPeriod: parseFloat(apiAsteroid.orbital_data.orbital_period)
        } : undefined
      });
    }
  }

  return asteroids;
}