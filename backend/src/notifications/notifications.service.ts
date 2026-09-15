import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NotificationsService {
  private readonly twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  private readonly twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  private readonly twilioPhone = process.env.TWILIO_PHONE_NUMBER || '+17372508034';

  async sendWhatsAppAlert(toPhone: string, contentSid: string = 'HXfe5ab5f00277942d4d4200328b4d403c') {
    if (!this.twilioAccountSid || !this.twilioAuthToken) {
      console.warn('Twilio credentials not set, skipping WhatsApp alert');
      return;
    }

    const url = `https://api.twilio.com/2010-04-01/Accounts/${this.twilioAccountSid}/Messages.json`;
    
    // Convert e.g., +917383768758 to whatsapp:+917383768758
    const to = `whatsapp:${toPhone}`;
    const from = `whatsapp:${this.twilioPhone}`;

    const data = new URLSearchParams();
    data.append('To', to);
    data.append('From', from);
    data.append('ContentSid', contentSid);

    try {
      const response = await axios.post(url, data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: this.twilioAccountSid,
          password: this.twilioAuthToken,
        }
      });
      console.log('WhatsApp Alert sent via Twilio', response.data.sid);
    } catch (error) {
      console.error('Failed to send WhatsApp alert via Twilio:', error?.response?.data || error.message);
    }
  }
}
