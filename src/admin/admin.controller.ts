import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  ApiTags,
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
@ApiTags('Admin')
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
  //update
  @Put('update')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse({ description: 'Update successfull.' })
  @ApiCreatedResponse({ type: AdminEntity })
  async update(
    @GetUser() user: Admin,
    @Body() data: CreateAdminDto,
  ): Promise<any> {
    return this.adminService.update(user, data);
  }

  //show all admins
  @Get()
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse({ description: 'All admins.' })
  @ApiCreatedResponse({ type: AdminEntity })
  async findAll(): Promise<AdminEntity[]> {
    return await this.adminService.findAll();
  }
  //show by admin id
  @Get(':id')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async findOne(id: number): Promise<any> {
    return await this.adminService.findOne(id);
  }

  //delete by id
  @Delete('delete/:id')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async deleteById(id: number): Promise<any> {
    return await this.adminService.deleteById(id);
  }

  //update by id
  @Put('update/:id')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async updateById(
    @Body() data: CreateAdminDto,
    @Param('id') id: number,
  ): Promise<any> {
    return await this.adminService.updateById(id, data);
  }
}
