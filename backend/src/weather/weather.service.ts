import { Injectable, Logger } from '@nestjs/common';
import { EventsGateway } from '../events.gateway';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  
  constructor(private readonly events: EventsGateway) {}

  // In a real scenario, this would be a Cron job that fetches from OpenWeather, 
  // formats the 12-hour window of data, and passes it to the model.
  async analyzeWeatherAnomaly(openWeatherData: number[]) {
    try {
      // Send 12x8 feature array to Python ML Service on port 8000
      const baseUrl = process.env.MODEL_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${baseUrl}/predict`, {
        features: openWeatherData
      });
      
      const { risk_score, anomaly_detected } = response.data;
      
      if (anomaly_detected) {
        this.logger.warn(`Severe weather anomaly detected! Risk Score: ${risk_score}`);
        
        // Broadcast weather alert to all apps
        this.events.server.emit('weather.alert', {
          title: 'WEATHER ALERT — AURORA WATCH',
          message: 'Heavy environmental anomaly predicted.',
          severity: 'HIGH',
          riskScore: risk_score
        });
      }
      
      return response.data;
    } catch (error) {
      this.logger.error('Failed to communicate with Aurora ML service', error.message);
      return null;
    }
  }
}
