import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthResponse } from './entity/auth.entity';
import {
  comparePassword,
  createAccessToken,
  customResponseHandler,
} from 'src/config/helpers';
import { Role } from './enums/auth.role';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  //login
  async login(email: string, newPassword: string): Promise<AuthResponse> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const { password, ...rest } = user;

    const isvalidPassword = await comparePassword(newPassword, password);
    if (!isvalidPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    const accessToken = await createAccessToken(user.id, Role.User);
    rest['role'] = Role.User;
    return customResponseHandler('Login successfull.', {
      ...rest,
      accessToken,
    });
  }

  //admin login
  async adminLogin(email: string, password: string): Promise<AuthResponse> {
    const admin = await this.prisma.admin.findFirst({
      where: {
        email,
      },
    });
    if (!admin) {
      throw new Error('User not found');
    }
    const { ...rest } = admin;
    const isvalidPassword = await comparePassword(password, admin.password);
    if (!isvalidPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    const accessToken = await createAccessToken(admin.id, Role.Admin);
    // rest['role'] = Role.Admin;
    return customResponseHandler('Login successfull.', {
      ...rest,
      accessToken,
    });
  }

  async validateUser(jwtPayload: any): Promise<any> {
    let user = null;
    if (jwtPayload.role == Role.User)
      user = await this.prisma.user.findFirst({
        where: {
          OR: [
            {
              id: jwtPayload.userId,
            },
            {
              email: jwtPayload.email,
            },
            {
              username: jwtPayload.username,
            },
          ],
        },
      });
    else
      user = await this.prisma.admin.findUnique({
        where: {
          id: jwtPayload.userId,
        },
      });
    if (!user) throw new UnauthorizedException('Invalid token.');

    user['role'] = jwtPayload.role;
    return user;
  }
}
