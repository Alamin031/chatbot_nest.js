import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //login
  @Post('login')
  @ApiOkResponse({ description: 'Login' })
  async login(@Body() { email, password }: LoginDto): Promise<any> {
    return await this.authService.login(email, password);
  }
}
