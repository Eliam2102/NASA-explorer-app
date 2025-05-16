import { StorageService } from "../../../../data/service/storage/storageService";
import { NeowsRepository } from "../../../../domain/repository/astronomy/neows/getAsteroidRepository";
import { Asteroid } from "../../../../domain/entidades/astronomy/neows/asteroid";

export class NeowsOfflineRepository implements NeowsRepository {
  private getCacheKey(start: string, end: string): string {
    return `CACHED_ASTEROIDS_${start}_${end}`;
  }

  async getAsteroids(start_date: string, end_date: string): Promise<Asteroid[]> {
    const cacheKey = this.getCacheKey(start_date, end_date);
    const cached = await StorageService.get<Asteroid[]>(cacheKey);

    return cached ?? [];
  }
}

