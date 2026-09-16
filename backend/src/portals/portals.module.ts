import { Module } from '@nestjs/common';
import { PortalsController } from './portals.controller.js';
import { PortalsService } from './portals.service.js';

@Module({
  controllers: [PortalsController],
  providers: [PortalsService],
})
export class PortalsModule {}
