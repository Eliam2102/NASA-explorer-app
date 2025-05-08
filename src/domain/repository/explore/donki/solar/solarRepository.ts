import { SolarFlare } from "../../../../entidades/explore/donki/solar";

export interface SolarRepository {
    getSolar(start_date: string, end_date: string): Promise<SolarFlare[]>;
}