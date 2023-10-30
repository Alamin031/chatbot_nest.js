import {
  Controller,
  Param,
  Body,
  UseGuards,
  Get,
  ParseIntPipe,
  Put,
  UploadedFile,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiBasicAuth,
} from '@nestjs/swagger';
import { UserCreateDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/auth.role';
import { RolesGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/User';
import { ApiFile } from 'src/decorators/file.decorator';
import { ErrorsInterceptor } from 'src/decorators/errors.interceptor';
import { LogAdminData } from 'src/decorators/user-logger.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //get profile
  @Get('profile')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.User)
  @ApiOkResponse({ description: 'Profile' })
  async profile(@LogAdminData() user: User): Promise<any> {
    return user;
  }
  @Get('all')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @Roles(Role.User)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    return user;
  }

  @Put(':id')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UserCreateDto,
  ) {
    return new UserEntity(await this.userService.update(id, updateUserDto));
  }

  @Put('upload-avater')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.User)
  @ApiCreatedResponse({ type: UserEntity })
  @ApiFile('avater', '/user/avater', {}, true)
  async updateAvater(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.uploadAvater(user, file);
  }
  @Delete(':id')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse({ type: UserEntity })
  @UseInterceptors(ErrorsInterceptor)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.remove(id);
      return new UserEntity(user);
    } catch (error) {
      console.error('my error:', error);

      throw error;
    }
  }
}
