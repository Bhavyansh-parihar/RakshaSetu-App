import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { IncidentsModule } from './incidents/incidents.module';
import { NotificationsModule } from './notifications/notifications.module';
import { WeatherModule } from './weather/weather.module';
import { PrismaService } from './prisma.service';
import { EventsGateway } from './events.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    IncidentsModule,
    NotificationsModule,
    WeatherModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-jwt-key',
    }),
  ],
  providers: [PrismaService, EventsGateway],
})
export class AppModule {}
