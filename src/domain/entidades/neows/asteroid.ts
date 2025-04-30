export interface Asteroid {
    id: string;
    name: string;
    nasaUrl: string;
    absoluteMagnitude: number;
    isHazardous: boolean;
    diameterKm: {
      min: number;
      max: number;
    };
    closeApproaches: Array<{
      date: string;
      velocityKmPerSecond: number;
      missDistanceKm: number;
      orbitingBody: string;
    }>;
    orbitData?: {
      eccentricity: number;
      inclination: number;
      orbitalPeriod: number;
    };
  }
  