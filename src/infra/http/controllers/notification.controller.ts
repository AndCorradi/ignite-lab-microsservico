import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@app/usecases/send-notification';
import { NotificationCreateDTO } from '../dtos/notification-create.dto';
import { NotificaionViewModel } from '../view-model/notification-view-model';
import { makeNotification } from '@app/factories/make-notification';
import { CancelNotification } from '@app/usecases/cancel-notification';
import { CountRecipientNotification } from '@app/usecases/count-recipient-notifications';
import { GetRecipientNotification } from '@app/usecases/get-recipient-notification';
import { ReadNotification } from '@app/usecases/read-notification';
import { UnreadNotification } from '@app/usecases/unread-notification';

@Controller('notifications')
export class NotificaionController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly countRecipientNotification: CountRecipientNotification,
    private readonly getRecipientNotification: GetRecipientNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
  ) {}

  @Get(':id')
  async index(@Param('id') id: string) {
    return await this.getRecipientNotification.perform({ recipientId: id });
  }

  @Get(':id/count')
  async count(@Param('id') id: string) {
    return await this.countRecipientNotification.perform({ recipientId: id });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.perform({ notificationId: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.perform({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.perform({ notificationId: id });
  }

  @Post()
  async create(@Body() body: NotificationCreateDTO) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotification.perform(
      makeNotification({
        recipientId,
        category,
        content,
      }),
    );

    return {
      notification: NotificaionViewModel.toHTTP(notification),
    };
  }
}
