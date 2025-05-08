export interface RadiationEvent {
    id: string;
    start: Date;
    end?: Date;
    radiationType?: string;
    source: string;
  }