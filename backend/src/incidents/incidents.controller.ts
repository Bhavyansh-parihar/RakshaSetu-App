import { Controller, Post, Body, Request, UseGuards, Param, Put, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IncidentsService } from './incidents.service';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import * as FormData from 'form-data';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post('transcribe')
  @UseInterceptors(FileInterceptor('audio'))
  async transcribeAudio(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No audio file provided', HttpStatus.BAD_REQUEST);
    }

    try {
      const formData = new FormData();
      formData.append('audio', file.buffer, file.originalname || 'recording.webm');

      const colabUrl = process.env.MODEL_API_URL;
      if (!colabUrl) throw new Error('MODEL_API_URL is not set');

      const response = await axios.post(`${colabUrl}/transcribe`, formData, {
        headers: formData.getHeaders(),
      });

      return { text: response.data.text };
    } catch (error) {
      console.error('Transcription failed:', error.message);
      throw new HttpException('Failed to transcribe audio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

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
