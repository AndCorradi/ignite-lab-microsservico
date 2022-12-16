import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';

interface NotificationProps {
  recipientId: string;
  content: string;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export function makeNotification(props: NotificationProps) {
  const { category, content, recipientId, ...rest } = props;

  return new Notification({
    category,
    content: new Content(content),
    recipientId,
    ...rest,
  });
}
