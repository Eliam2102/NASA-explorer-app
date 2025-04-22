export interface Planet {
    id: string;
    name: string;
    mass?: number; 
    radius?: number;
    description?: string;
    distanceFromEarth?: number;
    discoveryDate?: string;
    imageUrl?: string;
    type?: 'Exoplanet' | 'Gas Giant' | 'Terrestrial' | 'Ice Giant' | string;
    orbitalPeriod?: number;
    hostStar?: string;
  }
  