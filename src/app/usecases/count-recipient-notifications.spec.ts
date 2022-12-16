import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id2' }),
    );

    const { count } = await countRecipientNotifications.perform({
      recipientId: 'example-recipient-id',
    });

    expect(count).toBe(2);
  });
});
