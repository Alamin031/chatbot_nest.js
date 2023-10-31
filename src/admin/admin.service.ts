import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/config/helpers';
import { User } from '@prisma/client';
import * as fs from 'fs';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserCreateDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  //create user
  async create(createUserDto: UserCreateDto): Promise<UserEntity> {
    const hashpass = await hashPassword(createUserDto.password);

    const user = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashpass,
        roles: createUserDto.roles,
      },
    });

    return new UserEntity(user);
  }

  // async upload(users: User, file: Express.Multer.File) {
  //   try {
  //     const avatar = file.path.split('public')[1];

  //     const user = await this.prisma.user.findUnique({
  //       where: {
  //         id: users.id,
  //       },
  //     });

  //     if (!user) {
  //       throw new NotFoundException('User not found');
  //     }

  //     if (avatar) {
  //       if (user.avatar) {
  //         const avatarPath = `./public/${user.avatar}`;

  //         if (fs.existsSync(avatarPath)) {
  //           await fs.promises.unlink(avatarPath);
  //         }
  //         const updatedUser = await this.prisma.user.update({
  //           where: {
  //             id: users.id,
  //           },
  //           data: {
  //             avatar: avatar,
  //           },
  //         });
  //         console.log('avatar:', avatar);

  //         const data = new UserEntity(updatedUser);
  //         console.log('data:', data);
  //         return data;
  //       } else {
  //         return user;
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  //delete
  async delete(users: User): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: users.id,
        },
      });
      if (!user) {
        throw new NotFoundException('admin not found');
      }
      if (user.avatar) {
        const avatarPath = `./public/${user.avatar}`;
        try {
          fs.unlinkSync(avatarPath);
        } catch (error) {
          console.error(error);
        }
      }
      const deleteduser = await this.prisma.user.delete({
        where: {
          id: users.id,
        },
      });
      return deleteduser;
    } catch (error) {
      console.error(error);
    }
  }

  //show all admins
  async findAll(): Promise<any[]> {
    const data = await this.prisma.user.findMany();
    return data;
  }

  //show by admin id
  async findOne(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserEntity(user);
  }
  async remove(id: number): Promise<UserEntity> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.avatar) {
        const avatarPath = `./public/${user.avatar}`;
        try {
          fs.unlinkSync(avatarPath);
        } catch (error) {
          console.error(error);
        }
      }

      const deletedUser = await this.prisma.user.delete({
        where: { id },
      });

      return new UserEntity(deletedUser);
    } catch (error) {
      throw error;
    }
  }
  async updateById(id: number, data: UserCreateDto): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  }
}
