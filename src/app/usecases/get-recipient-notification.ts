import { Notification } from '@app/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';

interface GetRecipientNotificationRequest {
  recipientId: string;
}

type GetRecipientNotificationResponse = {
  notifications: Notification[];
};

@Injectable()
export class GetRecipientNotification {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async perform(
    request: GetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
