import { Notification } from '../entities/notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract cancel(notificationId: string): Promise<void>;
  abstract read(notificationId: string): Promise<void>;
  abstract unread(notificationId: string): Promise<void>;
  abstract countByRecipientId(recipientId: string): Promise<number>;
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
}
