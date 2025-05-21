export interface EpicImage {
  id: string;
  date: string;
  imageName: string;
  caption: string;
  centroidCoordinates: {
    lat: number;
    lon: number;
  };
  dscovrPosition: {
    x: number;
    y: number;
    z: number;
  };
  sunPosition: {
    x: number;
    y: number;
    z: number;
  };
}