import {
  Controller,
  Body,
  UseGuards,
  Get,
  Put,
  UploadedFile,
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
import { ApiFile } from 'src/decorators/file.decorator';
import { LogAdminData } from 'src/decorators/user-logger.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //profile
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.User)
  @ApiOkResponse({ description: 'Profile' })
  @Get('profile')
  async profile(@LogAdminData() user: User): Promise<any> {
    return user;
  }

  //file upload
  @Put('upload')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.User)
  @ApiOkResponse({ description: 'Upload successfull.' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiFile('avatar', '/user/avatar', {}, true)
  async upload(
    @LogAdminData() user: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    console.log(file);

    return this.userService.upload(user, file);
  }
  //update
  @Put('update')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.User)
  @ApiOkResponse({ description: 'Update successfull.' })
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @LogAdminData() user: User,
    @Body() data: UserCreateDto,
  ): Promise<any> {
    return this.userService.update(user, data);
  }
}
