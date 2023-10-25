import { Controller, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UserCreateDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //signup
  @Post('signup')
  @ApiOkResponse({ description: 'User Register successfull.' })
  @ApiCreatedResponse({ type: UserEntity })
  async signup(@Body() data: UserCreateDto): Promise<any> {
    return this.userService.signup(data);
  }
}
