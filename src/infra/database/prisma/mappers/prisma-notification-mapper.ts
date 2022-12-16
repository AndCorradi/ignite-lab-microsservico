import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { Notification as NotificationPrisma } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
    };
  }

  static toDomain(raw: NotificationPrisma): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
        readAt: raw.readAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
