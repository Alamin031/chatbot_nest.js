import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { hashPassword } from 'src/config/helpers';
import { Admin, User } from '@prisma/client';
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

  //file upload
  // async upload(user: Admin, file: Express.Multer.File) {
  //   const avatar = file.path.split('public')[1];

  //   const admin = await this.prisma.admin.update({
  //     where: {
  //       id: user.id,
  //     },
  //     data: {
  //       avatar: avatar,
  //     },
  //   });
  //   const data = new AdminEntity(admin);
  //   return data;
  // }

  async upload(users: User, file: Express.Multer.File) {
    try {
      const avatar = file.path.split('public')[1];

      const user = await this.prisma.user.findUnique({
        where: {
          id: users.id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (avatar) {
        if (user.avatar) {
          const avatarPath = `./public/${user.avatar}`;

          if (fs.existsSync(avatarPath)) {
            await fs.promises.unlink(avatarPath);
          }

          // Update the admin's avatar with the new file path
          const updatedAdmin = await this.prisma.user.update({
            where: {
              id: users.id,
            },
            data: {
              avatar: avatar,
            },
          });

          const data = new UserEntity(updatedAdmin);
          return data;
        } else {
          return user;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  //delete
  async delete(user: Admin): Promise<any> {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: {
          id: user.id,
        },
      });
      if (!admin) {
        throw new NotFoundException('admin not found');
      }
      if (admin.avatar) {
        const avatarPath = `./public/${admin.avatar}`;
        try {
          fs.unlinkSync(avatarPath);
        } catch (error) {
          console.error(error);
        }
      }
      const deletedAdmin = await this.prisma.admin.delete({
        where: {
          id: user.id,
        },
      });
      return deletedAdmin;
    } catch (error) {
      console.error(error);
    }
  }

  //update
  async update(user: Admin, data: CreateAdminDto): Promise<any> {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: {
          id: user.id,
        },
      });
      if (!admin) {
        throw new NotFoundException('admin not found');
      }
      const updatedAdmin = await this.prisma.admin.update({
        where: {
          id: user.id,
        },
        data,
      });
      return updatedAdmin;
    } catch (error) {
      console.error(error);
    }
  }

  //show all admins
  async findAll(): Promise<any[]> {
    const data = await this.prisma.admin.findMany();
    return data;
  }

  //show by admin id
  async findOne(id: number): Promise<any> {
    const data = await this.prisma.admin.findUnique({
      where: { id },
    });
    return data;
  }

  //delete admin by id
  async deleteById(id: number): Promise<any> {
    const data = await this.prisma.admin.delete({
      where: { id },
    });
    return data;
  }

  //update by id
  async updateById(id: number, data: CreateAdminDto): Promise<any> {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });
    if (!admin) {
      throw new NotFoundException('admin not found');
    }
    const updatedAdmin = await this.prisma.admin.update({
      where: { id },
      data,
    });
    return updatedAdmin;
  }
}
