import { Injectable } from '@nestjs/common';
import { incidents, responders, shelters, resources, weatherData, analyticsData, globalTimeline } from './mock.js';

@Injectable()
export class PortalsService {
  getCommandCenterData() {
    return {
      incidents,
      responders,
      shelters,
      resources,
      weatherData,
      analyticsData,
      globalTimeline
    };
  }

  getAdminData() {
    return {
      // Return same mock data for admin dashboard for now
      incidents,
      responders,
      shelters,
      resources
    };
  }
}
