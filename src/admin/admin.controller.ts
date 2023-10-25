import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBasicAuth,
} from '@nestjs/swagger';
import { AdminEntity } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiFile } from '../decorators/file.decorator';
import { GetUser } from 'src/decorators/User';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/enums/auth.role';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/auth.guard';
import { Admin } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  //profile
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse({ description: 'Profile' })
  @Get('profile')
  async profile(@GetUser() user: Admin): Promise<any> {
    return user;
  }
  //signup
  @Post('signup')
  @ApiOkResponse({ description: 'Signup successfull.' })
  @ApiCreatedResponse({ type: AdminEntity })
  async signup(@Body() data: CreateAdminDto): Promise<any> {
    return this.adminService.signup(data);
  }
  //file upload
  @Put('upload')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse({ description: 'Upload successfull.' })
  @ApiCreatedResponse({ type: AdminEntity })
  @ApiFile('avatar', '/admin/avatar', {}, true)
  async upload(
    @GetUser() user: Admin,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    console.log(file);

    return this.adminService.upload(user, file);
  }
  //delete
  @Delete('delete')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse({ description: 'Delete successfull.' })
  @ApiCreatedResponse({ type: AdminEntity })
  async delete(@GetUser() user: Admin): Promise<any> {
    return this.adminService.delete(user);
  }
}
