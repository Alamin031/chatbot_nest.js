import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '@prisma/client';

export class AdminEntity implements Admin {
  constructor(partial: Partial<AdminEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty({
    description: 'Admin id',
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: 'Admin name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Admin email',
    example: 'exampol@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Admin password',
    example: 'password',
  })
  password: string;

  @ApiProperty({
    description: 'Admin avatar',
    required: false,
    default: null,
  })
  avatar: string;

  @ApiProperty({
    description: 'Admin created at',
    example: '2021-10-10T06:25:46.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Admin updated at',
    example: '2021-10-10T06:25:46.000Z',
  })
  updatedAt: Date;
}
