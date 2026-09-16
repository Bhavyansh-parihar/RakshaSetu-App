import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { IncidentsModule } from './incidents/incidents.module';
import { NotificationsModule } from './notifications/notifications.module';
import { WeatherModule } from './weather/weather.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { PortalsModule } from './portals/portals.module';
import { PrismaService } from './prisma.service';
import { EventsGateway } from './events.gateway';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    IncidentsModule,
    NotificationsModule,
    WeatherModule,
    ChatbotModule,
    PortalsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-jwt-key',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, EventsGateway],
})
export class AppModule {}
