export interface Planet {
    date: string | undefined;
    cameraName: string | undefined;
    roverName: string | undefined;
    sol: any;
    status: string | undefined;
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
  