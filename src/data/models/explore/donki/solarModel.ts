export interface SolarFlareModel {
    flrID: string;
    beginTime: string;
    peakTime: string;
    endTime: string;
    classType: string;
    sourceLocation: string;
    activeRegionNum: number;
    linkedEvents: any[]; // puedes tipar mejor si conoces la estructura de los eventos
    instruments: {
      displayName: string;
    }[];
  }