import { SpaceWeatherAlert } from '../../domain/entidades/explore/donki/notification';
import { NotificationModel } from '../../data/models/explore/donki/notificationModel';

export function mapAlertModelToEntity(data: NotificationModel[]): SpaceWeatherAlert[] {
  return data.map((item) => ({
    id: item.messageID,
    type: item.messageType,
    message: item.messageBody,
    issueTime: new Date(item.messageIssueTime),
    source: item.messageURL,
  }));
}