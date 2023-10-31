import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBasicAuth,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/enums/auth.role';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/auth.guard';
import { User } from '@prisma/client';
import { LogAdminData } from 'src/decorators/user-logger.decorator';
import { ErrorsInterceptor } from 'src/decorators/errors.interceptor';
import { UserCreateDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
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
  async profile(@LogAdminData() user: User): Promise<any> {
    return user;
  }
  @Post()
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiCreatedResponse({ type: UserEntity })
  @UseInterceptors(ErrorsInterceptor)
  async AddUsers(@Body() createUserDto: UserCreateDto) {
    return await this.adminService.create(createUserDto);
  }
  //delete
  @Delete('delete')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse({ description: 'Delete successfull.' })
  @ApiCreatedResponse({ type: UserEntity })
  async delete(@LogAdminData() user: User): Promise<any> {
    return this.adminService.delete(user);
  }

  //show all admins
  @Get()
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse({ description: 'All admins.' })
  @ApiCreatedResponse({ type: UserEntity })
  async findAll(): Promise<UserEntity[]> {
    return await this.adminService.findAll();
  }
  //show by admin id
  @Get(':id')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.adminService.findOne(id);
  }

  //delete by id
  @Delete('delete/:id')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse({ type: UserEntity })
  @UseInterceptors(ErrorsInterceptor)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.adminService.remove(id);
      return new UserEntity(user);
    } catch (error) {
      console.error('my error:', error);

      throw error;
    }
  }
  @Put('update/:id')
  @ApiBasicAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async updateById(
    @Body() data: UserCreateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return await this.adminService.updateById(id, data);
  }
}
