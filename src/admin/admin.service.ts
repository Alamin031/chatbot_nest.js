import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { hashPassword } from 'src/config/helpers';
import { AdminEntity } from './entities/admin.entity';
import { Admin } from '@prisma/client';
import * as fs from 'fs';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  //signup
  async signup(createadmin: CreateAdminDto) {
    const hashpass = await hashPassword(createadmin.password);
    const admin = await this.prisma.admin.create({
      data: {
        ...createadmin,
        password: hashpass,
      },
    });
    const data = new AdminEntity(admin);
    return data;
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

  async upload(user: Admin, file: Express.Multer.File) {
    try {
      const avatar = file.path.split('public')[1];

      const admin = await this.prisma.admin.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!admin) {
        throw new NotFoundException('User not found');
      }

      if (avatar) {
        if (admin.avatar) {
          const avatarPath = `./public/${admin.avatar}`;

          if (fs.existsSync(avatarPath)) {
            await fs.promises.unlink(avatarPath);
          }

          // Update the admin's avatar with the new file path
          const updatedAdmin = await this.prisma.admin.update({
            where: {
              id: user.id,
            },
            data: {
              avatar: avatar,
            },
          });

          const data = new AdminEntity(updatedAdmin);
          return data;
        } else {
          // Handle the case where no new avatar is provided
          return admin;
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
