import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

export interface Incident {
  id: string;
  type: string;
  status: string;
  priorityScore: number;
  latitude: number;
  longitude: number;
  citizenId: string;
  aiConfidence: number;
  mediaUrl?: string;
  description?: string;
}

interface ResponderState {
  socket: Socket | null;
  token: string | null;
  activeIncidents: Incident[];
  highPriorityQueue: Incident[];
  selectedIncident: Incident | null;
  setSelectedIncident: (incident: Incident | null) => void;
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
  setIncidents: (incidents: Incident[]) => void;
}

export const useResponderStore = create<ResponderState>((set, get) => ({
  socket: null,
  token: null,
  activeIncidents: [],
  highPriorityQueue: [],
  selectedIncident: null,
  setSelectedIncident: (selectedIncident) => set({ selectedIncident }),

  connectSocket: (token: string) => {
    if (get().socket) return;
    const socket = io('https://rakshasetu-app-8dvk.onrender.com', {
      auth: { token }
    });

    socket.on('connect', () => {
      console.log('Responder Connected to RakshaSetu real-time server');
    });

    // Listen for new incoming SOS
    socket.on('incident.created', (incident: Incident) => {
      console.log("🚨 New Distinct SOS Received:", incident);
      
      const currentQueue = get().highPriorityQueue;
      const filtered = currentQueue.filter(i => i.id !== incident.id);
      const newQueue = [incident, ...filtered].sort((a, b) => (b.priorityScore || 5) - (a.priorityScore || 5));
      
      set({ 
        highPriorityQueue: newQueue,
        selectedIncident: incident 
      });
    });

    set({ socket, token });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, token: null });
    }
  },

  setIncidents: (incidents) => set({ 
    activeIncidents: incidents.filter(i => i.status !== 'PENDING'),
    highPriorityQueue: incidents.filter(i => i.status === 'PENDING').sort((a, b) => b.priorityScore - a.priorityScore)
  })
}));
