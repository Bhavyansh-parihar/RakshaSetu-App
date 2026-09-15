import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { PrismaService } from '../prisma.service';
import { EventsGateway } from '../events.gateway';
import { NotificationsModule } from '../notifications/notifications.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [NotificationsModule],
  providers: [IncidentsService, PrismaService, EventsGateway, JwtService],
  controllers: [IncidentsController]
})
export class IncidentsModule {}
