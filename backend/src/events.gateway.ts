import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers['authorization']?.replace('Bearer ', '');
      if (token === 'demo-responder') {
        client.data.user = { id: 'test-responder', role: 'RESPONDER' };
        client.join('role_responder');
        console.log(`Demo Responder connected: ${client.id}`);
        return;
      }
      
      if (token) {
        const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'super-secret-jwt-key' });
        client.data.user = payload;
        
        // Join room based on role
        if (payload.role) {
          client.join(`role_${payload.role.toLowerCase()}`);
        }
        console.log(`Client connected: ${client.id} [${payload.role}]`);
      } else {
        // Anonymous or citizen connection logic could go here
        console.log(`Anonymous client connected: ${client.id}`);
      }
    } catch (e) {
      console.log(`Connection auth failed for client: ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Example Event: location update from Responder
  @SubscribeMessage('responder.location.update')
  async handleResponderLocationUpdate(client: Socket, payload: { latitude: number; longitude: number }) {
    if (client.data.user?.role !== 'RESPONDER') return;
    
    // Save to DB (debounced/throttled in a real app, but for hackathon we save on each tick or just broadcast)
    await this.prisma.user.update({
      where: { id: client.data.user.id },
      data: { latitude: payload.latitude, longitude: payload.longitude }
    });

    // Broadcast to government and admin
    this.server.to('role_government').to('role_admin').emit('responder.location.updated', {
      responderId: client.data.user.id,
      ...payload
    });
  }
}
