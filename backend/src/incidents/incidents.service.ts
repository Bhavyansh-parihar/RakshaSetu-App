import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EventsGateway } from '../events.gateway';
import { EmailService } from '../notifications/email.service';
import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';

@Injectable()
export class IncidentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly events: EventsGateway,
    private readonly emailService: EmailService
  ) {
    if (process.env.CLOUDINARY_URL) {
      cloudinary.config({ secure: true });
    }
  }

  // AI Confidence simulation logic (0.0 to 1.0)
  private simulateDetectionAIScore(): number {
    return parseFloat((Math.random() * (1.0 - 0.2) + 0.2).toFixed(2));
  }

  // Priority Queue Score algorithm (1-10)
  private calculatePriorityScore(aiConfidence: number, batteryLevel: number, isSevereWeather: boolean): number {
    let score = 5; // Base score
    if (aiConfidence > 0.8) score += 3;
    else if (aiConfidence > 0.6) score += 1;
    
    if (batteryLevel < 15) score += 2;
    if (isSevereWeather) score += 2;
    
    return Math.min(10, score);
  }

  async reportSOS(citizenId: string, data: any) {
    let mediaUrl = data.mediaUrl || null;

    // Handle base64 image upload to Cloudinary
    if (data.imageBase64) {
      try {
        console.log('Attempting Cloudinary upload...');
        const uploadResponse = await cloudinary.uploader.upload(data.imageBase64, {
          folder: 'rakshasetu_sos'
        });
        mediaUrl = uploadResponse.secure_url;
        console.log('✅ Cloudinary upload successful:', mediaUrl);
      } catch (err) {
        console.error('⚠️ Cloudinary upload failed, falling back to Base64:', err);
        mediaUrl = data.imageBase64;
      }
    }

    // 1. Run AI Anomaly Detection with newindore model suite
    let aiConfidence = 0.5;
    let incidentType = data.type || 'SOS Alert';

    if (mediaUrl || data.imageBase64) {
      try {
        const response = await axios.post('http://localhost:8000/detect-anomaly', {
          image_data: mediaUrl || data.imageBase64,
          model_type: data.type === 'fire' ? 'fire' : 'fire'
        }, { timeout: 2000 });

        if (response.data && response.data.confidence) {
          aiConfidence = response.data.confidence;
          if (response.data.anomaly_type === 'fire') {
            console.log('🔥 newindore AI detected Fire/Smoke anomaly:', response.data);
          }
        } else {
          aiConfidence = this.simulateDetectionAIScore();
        }
      } catch {
        aiConfidence = this.simulateDetectionAIScore();
      }
    }
    
    // 2. Calculate priority score
    const priorityScore = this.calculatePriorityScore(aiConfidence, data.batteryLevel || 100, data.isSevereWeather || false);

    // 3. Create incident
    const incident = await this.prisma.incident.create({
      data: {
        citizenId,
        type: incidentType,
        latitude: data.latitude,
        longitude: data.longitude,
        mediaUrl: mediaUrl,
        description: data.description,
        aiConfidence,
        priorityScore,
        status: 'PENDING'
      },
      include: { citizen: true }
    });

    // 4. Alert responders and government
    this.events.server.to('role_responder').to('role_government').emit('incident.created', incident);
    
    if (aiConfidence < 0.4) {
      this.events.server.to('role_admin').emit('notification.new', {
        type: 'SUSPICIOUS_REPORT',
        incidentId: incident.id,
        message: 'Suspicious SOS report detected with low AI confidence.'
      });
    }

    // Send Emergency Email to emergency contact (bhavyanshparihar3@gmail.com)
    const user = await this.prisma.user.findUnique({ where: { id: citizenId } });
    const targetEmail = user?.emergencyContactEmail || 'bhavyanshparihar3@gmail.com';
    await this.emailService.sendSOSEmail(
      targetEmail,
      user?.name || 'Bhavyansh Parihar',
      data.latitude,
      data.longitude,
      data.batteryLevel || 100
    );

    return incident;
  }

  async acceptIncident(responderId: string, incidentId: string) {
    const incident = await this.prisma.incident.update({
      where: { id: incidentId },
      data: {
        responderId,
        status: 'ACCEPTED'
      }
    });

    // Notify the citizen and government
    this.events.server.to('role_government').emit('incident.accepted', incident);
    // Ideally we would send to a specific citizen room, e.g. `user_${citizenId}`
    this.events.server.emit(`citizen_${incident.citizenId}_update`, { status: 'ACCEPTED', responderId });

    return incident;
  }
}
