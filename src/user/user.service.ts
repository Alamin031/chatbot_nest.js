import { Injectable } from '@nestjs/common';
import { hashPassword } from 'src/config/helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { UserCreateDto } from './dto/create-user.dto';

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
}
