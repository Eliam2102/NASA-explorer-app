export interface SolarFlare {
    id: string;
    start: Date;
    peak?: Date;
    intensityClass?: string;
    location?: string;
    source: string;
  }