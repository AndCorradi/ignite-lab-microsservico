import { CancelNotification } from '@app/usecases/cancel-notification';
import { CountRecipientNotification } from '@app/usecases/count-recipient-notifications';
import { GetRecipientNotification } from '@app/usecases/get-recipient-notification';
import { ReadNotification } from '@app/usecases/read-notification';
import { UnreadNotification } from '@app/usecases/unread-notification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/app/usecases/send-notification';
import { DatabaseModule } from '../database/prisma/database.module';
import { NotificaionController } from './controllers/notification.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificaionController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
