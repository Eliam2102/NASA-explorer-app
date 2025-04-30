// infrastructure/models/NeoWsApiResponse.ts
export interface NeoWsApiResponse {
  links: any;
  element_count: number;
  near_earth_objects: Record<string, ApiAsteroid[]>;
}

interface ApiAsteroid {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    kilometers: { estimated_diameter_min: number; estimated_diameter_max: number };
  };
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: { kilometers_per_second: string };
    miss_distance: { kilometers: string };
    orbiting_body: string;
  }>;
  orbital_data?: {
    eccentricity: string;
    inclination: string;
    orbital_period: string;
  };
}