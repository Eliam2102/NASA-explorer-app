import { SpaceWeatherAlert } from '../../../entidades/explore/donki/notification';
import { NotificationSpaceWeatherRepository } from '../../../repository/explore/donki/notification/notificationRepository';




export class GetAlertsUseCase {
    //constructor 
    constructor (private repository: NotificationSpaceWeatherRepository){}
    //metodo del use
    async execute(start_date: string, end_date: string ): Promise<SpaceWeatherAlert[]>{
        return this.repository.getAlerts(start_date, end_date);
    }
}