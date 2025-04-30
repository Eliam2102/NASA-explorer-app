// infrastructure/repositories/NeoWsRepositoryImpl.ts
import { NeowsRepository } from "../../../../domain/repository/astronomy/neows/getAsteroidRepository";
import { Asteroid } from "../../../../domain/entidades/neows/asteroid";
import { NeoWsApiResponse } from "../../../models/astronomy/neows/neowModel";
import { AsteroidsGetNeows } from "../../../service/astronomy/neows/neowService";

export class NeowsRepositoryImpl implements NeowsRepository {
  private service = new AsteroidsGetNeows();

  async getAsteroids(start_date: string, end_date: string): Promise<Asteroid[]> {
    // 1. Obtener respuesta cruda de la API
    const apiResponse: NeoWsApiResponse = await this.service.fetchAsteroids(start_date, end_date);
    
    // 2. Procesar y transformar los datos
    return this.transformApiResponseToAsteroids(apiResponse);
  }

  private transformApiResponseToAsteroids(response: NeoWsApiResponse): Asteroid[] {
    const asteroids: Asteroid[] = [];

    // Iterar sobre todas las fechas
    for (const date in response.near_earth_objects) {
      // Iterar sobre cada asteroide en esa fecha
      for (const apiAsteroid of response.near_earth_objects[date]) {
        // Mapear a modelo Asteroid
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
}