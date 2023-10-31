import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { UserCreateDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import * as fs from 'fs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  //update user by id
  //update
  async update(users: User, data: UserCreateDto): Promise<any> {
    try {
      const user = await this.prisma.admin.findUnique({
        where: {
          id: users.id,
        },
      });
      if (!user) {
        throw new NotFoundException('user not found');
      }
      const updatedUser = await this.prisma.user.update({
        where: {
          id: users.id,
        },
        data,
      });
      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  }
  async upload(user: User, file: Express.Multer.File) {
    try {
      const avatar = file.path.split('public')[1];

      const admin = await this.prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!admin) {
        throw new NotFoundException('User not found');
      }

      console.log('avatar:', avatar);

      if (avatar) {
        // Remove the existing avatar if it exists
        if (admin.avatar) {
          const avatarPath = `./public/${admin.avatar}`;

          if (fs.existsSync(avatarPath)) {
            await fs.promises.unlink(avatarPath);
          }
        }

        // Update the admin's avatar with the new file path
        const updatedAdmin = await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            avatar: avatar,
          },
        });

        const data = new UserEntity(updatedAdmin);
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
