import { Controller, Get } from '@nestjs/common';
import { PortalsService } from './portals.service.js';

@Controller('portals')
export class PortalsController {
  constructor(private readonly portalsService: PortalsService) {}

  @Get('command-center/data')
  getCommandCenterData() {
    return this.portalsService.getCommandCenterData();
  }

  @Get('admin/data')
  getAdminData() {
    return this.portalsService.getAdminData();
  }
}
