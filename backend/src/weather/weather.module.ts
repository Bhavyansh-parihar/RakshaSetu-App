import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { EventsGateway } from '../events.gateway';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [WeatherService, EventsGateway, JwtService, PrismaService],
  exports: [WeatherService]
})
export class WeatherModule {}
