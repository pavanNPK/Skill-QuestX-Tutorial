import { Body, Controller, Get, Patch, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationService } from './notification.service';
import { PushService } from './push.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private pushService: PushService,
  ) {}

  @Get('vapid-public-key')
  getVapidPublicKey(): { publicKey: string | null } {
    return { publicKey: this.pushService.getVapidPublicKey() };
  }

  @Post('subscription')
  @UseGuards(JwtAuthGuard)
  async savePushSubscription(
    @Request() req: { user: { id: string } },
    @Body() body: { endpoint: string; keys: { p256dh: string; auth: string } },
  ) {
    if (!body?.endpoint || !body?.keys?.p256dh || !body?.keys?.auth) {
      return { saved: false };
    }
    await this.pushService.saveSubscription(req.user.id, {
      endpoint: body.endpoint,
      keys: { p256dh: body.keys.p256dh, auth: body.keys.auth },
    });
    return { saved: true };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMyNotifications(
    @Request() req: { user: { id: string } },
  ) {
    const list = await this.notificationService.findByUserId(req.user.id);
    const unreadCount = await this.notificationService.countUnreadByUserId(req.user.id);
    return {
      notifications: list.map((n: any) => ({
        id: n._id.toString(),
        title: n.title,
        message: n.message ?? '',
        type: n.type,
        link: n.link ?? null,
        metadata: n.metadata ?? null,
        read: n.read === true,
        createdAt: n.createdAt,
      })),
      unreadCount,
    };
  }

  @Patch('read-all')
  @UseGuards(JwtAuthGuard)
  async markAllAsRead(@Request() req: { user: { id: string } }) {
    const count = await this.notificationService.markAllAsRead(req.user.id);
    return { marked: count };
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard)
  async markAsRead(
    @Param('id') id: string,
    @Request() req: { user: { id: string } },
  ) {
    const updated = await this.notificationService.markAsRead(id, req.user.id);
    return { updated };
  }
}
