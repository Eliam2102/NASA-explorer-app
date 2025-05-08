export interface RadiationEventModel {
    sepID: string;
    startTime: string;
    eventType: string;
    linkedEvents: any[];
    instruments: {
      displayName: string;
    }[];
    radiationMeasurements: {
      energyLevel: string;
      flux: number;
    }[];
}