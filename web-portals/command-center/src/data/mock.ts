// Fetch data from NestJS Backend dynamically
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

let data: any = {};
try {
  const response = await fetch(`${API_URL}/portals/command-center/data`);
  data = await response.json();
} catch (error) {
  console.error("Failed to fetch command center data from backend", error);
}

export const incidents = data.incidents || [];
export const responders = data.responders || [];
export const shelters = data.shelters || [];
export const resources = data.resources || [];
export const weatherData = data.weatherData || { alerts: [], forecast: [] };
export const analyticsData = data.analyticsData || {
  responseTime: [], rescueCompletion: [], incidentsByType: [], shelterOccupancy: [], hourlyIncidents: []
};
export const globalTimeline = data.globalTimeline || [];
