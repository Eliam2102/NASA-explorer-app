export interface GeomagneticStormModel {
  gstID: string;
  startTime: string;
  link: string;
  allKpIndex: {
    kpIndex: number;
    observedTime: string;
    source: string;
  }[];
}