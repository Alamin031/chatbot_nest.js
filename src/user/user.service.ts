import { Injectable } from '@nestjs/common';
import { hashPassword } from 'src/config/helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { UserCreateDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  //signup
  async signup(createuser: UserCreateDto) {
    const hashpass = await hashPassword(createuser.password);
    const user = await this.prisma.user.create({
      data: {
        ...createuser,
        password: hashpass,
      },
    });
    const data = new UserEntity(user);
    return data;
  }

  //create user
  async create(createuser: UserCreateDto) {
    const hashpass = await hashPassword(createuser.password);
    const user = await this.prisma.user.create({
      data: {
        ...createuser,
        password: hashpass,
      },
    });
    const data = new UserEntity(user);
    return data;
  }

  //get all user
  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  //get user by id
  async findOne(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return new UserEntity(user);
  }

  //update user by id
  async update(id: number, data: UserCreateDto): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return new UserEntity(user);
  }
  async uploadAvater(user: User, file: Express.Multer.File) {
    const avater = file.path.split('public')[1];
    const response = await this.prisma.user.update({
      where: { id: user.id },
      data: { avatar: avater },
    });
    return response;
  }

  //delete user by id
  async remove(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return new UserEntity(user);
  }
}
