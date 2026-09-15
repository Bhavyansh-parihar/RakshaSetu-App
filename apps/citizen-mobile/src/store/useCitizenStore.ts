import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface Incident {
  id: string;
  status: string;
  responderId: string | null;
  priorityScore: number;
}

interface CitizenState {
  socket: Socket | null;
  token: string | null;
  activeIncident: Incident | null;
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
  setActiveIncident: (incident: Incident | null) => void;
}

export const useCitizenStore = create<CitizenState>((set, get) => ({
  socket: null,
  token: null,
  activeIncident: null,

  connectSocket: (token: string) => {
    if (get().socket) return;
    const socket = io('http://localhost:3000', {
      auth: { token }
    });

    socket.on('connect', () => {
      console.log('Connected to RakshaSetu real-time server');
    });

    // Listen for updates to their specific incident (e.g. from responder)
    socket.on('incident.accepted', (data: Incident) => {
      const active = get().activeIncident;
      if (active && active.id === data.id) {
        set({ activeIncident: { ...active, status: data.status, responderId: data.responderId } });
        // Can trigger push notification or local alert here
      }
    });

    socket.on('responder.location.updated', (data: any) => {
        // Handle live map tracking update
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

  setActiveIncident: (incident) => set({ activeIncident: incident })
}));
