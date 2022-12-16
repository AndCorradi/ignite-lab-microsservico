import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notification-repository';

export interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async perform(notification: Notification): Promise<SendNotificationResponse> {
    await this.notificationRepository.create(notification);

    return { notification };
  }
}
