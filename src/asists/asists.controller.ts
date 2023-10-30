import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Put,
  UploadedFile,
} from '@nestjs/common';
import { AsistsService } from './asists.service';
import { ApiOkResponse, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateAsistsDto } from './dto/asists.create.dto';
import { ApiFile } from '../decorators/file.decorator';
import { AsistsEntity } from './entities/asists.entity';

@ApiTags('asists')
@Controller('asists')
export class AsistsController {
  constructor(private readonly asistsService: AsistsService) {}
  @Post('create')
  @ApiOkResponse({ description: 'create successfull.' })
  @ApiFile('fileName', '/admin/asists', {}, true)
  @ApiCreatedResponse({ type: AsistsEntity })
  async signup(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateAsistsDto,
  ): Promise<any> {
    const createdAsists = await this.asistsService.processImageFile(data, file);
    return createdAsists;
  }

  //show by id
  @Get(':id')
  @ApiOkResponse({ description: 'show successfull.' })
  async show(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return await this.asistsService.show(id);
  }
  //show all
  @Get()
  @ApiOkResponse({ description: 'show all successfull.' })
  async showall(): Promise<any[]> {
    return await this.asistsService.showall();
  }
  //update by id
  @Put(':id')
  @ApiOkResponse({ description: 'update successfull.' })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateAsistsDto: CreateAsistsDto,
  ): Promise<any> {
    return await this.asistsService.update(id, updateAsistsDto);
  }
  //delete by id
  @Delete(':id')
  @ApiOkResponse({ description: 'delete successfull.' })
  async delete(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return await this.asistsService.delete(id);
  }
}
