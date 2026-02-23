import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { PushSubscription, PushSubscriptionSchema } from './schemas/push-subscription.schema';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PushService } from './push.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: PushSubscription.name, schema: PushSubscriptionSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, PushService],
  exports: [NotificationService],
})
export class NotificationModule {}
