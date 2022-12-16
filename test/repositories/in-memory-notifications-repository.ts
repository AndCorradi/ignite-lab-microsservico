import { Notification } from '../../src/app/entities/notification';
import { NotificationRepository } from '../../src/app/repositories/notification-repository';

export class InMemoryNotificationRepository implements NotificationRepository {
  notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    return (
      this.notifications.find((item) => item.id === notificationId) ?? null
    );
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async cancel(notificationId: string): Promise<void> {
    this.notifications.forEach((item) => {
      if (item.id === notificationId) {
        item.cancel();
      }
    });
  }

  async read(notificationId: string): Promise<void> {
    this.notifications.forEach((item) => {
      if (item.id === notificationId) {
        item.read();
      }
    });
  }

  async unread(notificationId: string): Promise<void> {
    this.notifications.forEach((item) => {
      if (item.id === notificationId) {
        item.unread();
      }
    });
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((item) => item.recipientId === recipientId)
      .length;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );
  }
}
