import { RadiationEvent } from "../../../../entidades/explore/donki/radiation";


export interface RadiationRepository {
    //contrator para cnosultar el evento de radiation
    getEventRadiation(start_date: string, end_date: string): Promise<RadiationEvent[]>;
}