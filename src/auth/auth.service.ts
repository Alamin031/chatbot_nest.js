import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthResponse } from './entity/auth.entity';
import {
  comparePassword,
  createAccessToken,
  customResponseHandler,
} from 'src/config/helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async login(email: string, newPassword: string): Promise<AuthResponse> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...rest } = user;

    const isvalidPassword = await comparePassword(newPassword, password);
    if (!isvalidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = await createAccessToken(user.id);

    return customResponseHandler('Login successful.', {
      ...rest,
      accessToken,
    });
  }
  async validateUser(jwtPayload: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: jwtPayload.userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid token.');
    }

    return {
      ...user,
      role: jwtPayload.role,
    };
  }
}
