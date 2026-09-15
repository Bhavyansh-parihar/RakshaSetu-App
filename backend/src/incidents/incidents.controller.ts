import { Controller, Post, Body, Request, UseGuards, Param, Put } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post('sos')
  async reportSOS(@Request() req, @Body() body: any) {
    // Assuming JWT auth middleware populates req.user
    const citizenId = req.user?.id || body.citizenId; // Fallback for testing
    return this.incidentsService.reportSOS(citizenId, body);
  }

  @Put(':id/accept')
  async acceptIncident(@Request() req, @Param('id') id: string) {
    const responderId = req.user?.id || 'test-responder'; // Fallback
    return this.incidentsService.acceptIncident(responderId, id);
  }
}
