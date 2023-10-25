import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty({
    description: 'User id',
    example: '1',
  })
  id: number;
  @ApiProperty({
    description: 'User username',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  name: string;
  @ApiProperty({
    description: 'User email',
    example: '',
  })
  email: string;
  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  password: string;
  @ApiProperty({
    description: 'User avatar',
    required: false,
    default: null,
  })
  avatar: string;
  @ApiProperty({
    description: 'User created at',
    example: '2021-10-10T06:25:46.000Z',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'User updated at',
    example: '2021-10-10T06:25:46.000Z',
  })
  updatedAt: Date;
}
