import { SpaceWeatherAlert } from "../../../../entidades/explore/donki/notification";

export interface NotificationSpaceWeatherRepository {
    getAlerts(start_date: string, end_date: string): Promise<SpaceWeatherAlert[]>;
}