import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit {
  // Mocked Prisma implementation for demo
  public incident = {
    create: async (args: any) => {
      const uniqueId = 'INC-' + Math.floor(1000 + Math.random() * 9000);
      const newIncident = { 
        id: uniqueId, 
        createdAt: new Date().toISOString(),
        ...args.data 
      };
      console.log('✅ Created distinct incident:', newIncident.id, newIncident.type);
      return newIncident;
    },
    update: async (args: any) => {
      console.log('Mock incident update:', args);
      return { id: args.where.id, ...args.data };
    },
  };
  
  public user = {
    findUnique: async (args: any) => {
      console.log('Mock user findUnique:', args);
      const email = args?.where?.email || 'test@test.com';
      return { 
        id: args?.where?.id || 'demo-user-123', 
        name: 'Bhavyansh Parihar', 
        emergencyContactEmail: 'bhavyanshparihar3@gmail.com',
        role: 'CITIZEN',
        isApproved: true,
        password: 'test',
        email: email
      };
    },
    create: async (args: any) => {
      return { id: 'mock-user-123', ...args.data, role: 'CITIZEN', isApproved: true, password: 'test', email: 'test@test.com', emergencyContactEmail: 'bhavyanshparihar3@gmail.com' };
    },
    update: async (args: any) => {
      return { id: args.where.id, ...args.data, role: 'CITIZEN', isApproved: true, password: 'test', email: 'test@test.com', emergencyContactEmail: 'bhavyanshparihar3@gmail.com' };
    }
  };

  async onModuleInit() {
    console.log('PrismaService Mock initialized');
  }
}
