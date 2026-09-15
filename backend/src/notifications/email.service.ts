import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    // Replicates your Python SMTP logic natively in Node.js
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false, // true for 465, false for other ports (TLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    this.logger.log(`📧 [SOS DISPATCH] Sending emergency alert email to: ${to}`);
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      this.logger.warn(`SMTP credentials not configured in .env, simulated email dispatch to: ${to}`);
      return;
    }

    try {
      const info = await this.transporter.sendMail({
        from: `"RakshaSetu Alerts" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
      });
      this.logger.log(`Email sent successfully: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Error sending email: ${error.message}`);
    }
  }

  async sendSOSEmail(emergencyEmail: string, citizenName: string, latitude: number, longitude: number, battery: number) {
    const subject = `URGENT SOS: ${citizenName} has sent an SOS`;
    const text = `
EMERGENCY ALERT

${citizenName} has triggered an SOS on the RakshaSetu platform.

Last Known Location:
Latitude: ${latitude}
Longitude: ${longitude}
Google Maps: https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}

Device Status:
Battery Health: ${battery}%

Please contact emergency services or the RakshaSetu responder team immediately.
    `;
    await this.sendEmail(emergencyEmail, subject, text);
  }
}
