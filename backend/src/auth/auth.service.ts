import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        isApproved: data.role === 'RESPONDER' ? false : true, // Responders require manual approval
      },
    });
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async login(data: any) {
    let user = await this.prisma.user.findUnique({ where: { email: data.email } });
    
    // Auto-seed test users if they don't exist in the fresh Render database
    if (!user && (data.email === 'test@test.com' || data.email === 'responder@test.com')) {
      const hashedPassword = await bcrypt.hash('test', 10);
      user = await this.prisma.user.create({
        data: {
          email: data.email,
          name: data.email === 'test@test.com' ? 'Test Citizen' : 'Test Responder',
          password: hashedPassword,
          role: data.email === 'test@test.com' ? 'CITIZEN' : 'RESPONDER',
          isApproved: true,
          phone: '9876543210'
        }
      });
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    if (user.role === 'RESPONDER' && !user.isApproved) {
      throw new UnauthorizedException('Responder account pending approval');
    }

    // Check credentials: accept 'test' for test@test.com or allow demo credentials
    if ((data.email === 'test@test.com' || data.email === 'responder@test.com') && data.password !== 'test') {
      throw new UnauthorizedException('Invalid credentials');
    } else if (data.email !== 'test@test.com' && data.email !== 'responder@test.com') {
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }
}
