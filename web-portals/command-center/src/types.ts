export interface Incident {
  id: string;
  type: string;
  priority: string;
  status: string;
  citizen: string;
  phone: string;
  location: string;
  coords: { x: number; y: number };
  district: string;
  ai_confidence: number;
  priority_score: number;
  responder: string;
  responder_eta: string;
  reported: string;
  media: string[];
  timeline: { time: string; event: string; type: string }[];
}
