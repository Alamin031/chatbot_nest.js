import { ApiProperty } from '@nestjs/swagger';

export class UserData {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  accessToken: string;
}

export class AuthResponse {
  @ApiProperty()
  data: UserData;

  @ApiProperty()
  message: string;
}
