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
import { AssetsService } from './assets.service';
import { ApiOkResponse, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateAssetDto } from './dto/assets.create.dto';
import { ApiFile } from '../decorators/file.decorator';
import { AssetsEntity } from './entities/assets.entity';

@ApiTags('assets')
@Controller('assets')
export class AsistsController {
  constructor(private readonly assetsService: AssetsService) {}
  // @Post('create')
  // @ApiOkResponse({ description: 'create successfull.' })
  // @ApiFile('fileName', '/assets', {}, true)
  // @ApiCreatedResponse({ type: AssetsEntity })
  // async signup(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() data: CreateAsistsDto,
  // ): Promise<any> {
  //   const createdAsists = await this.assetsService.processImageFile(data, file);
  //   return createdAsists;
  // }

  //show by id
  @Get(':id')
  @ApiOkResponse({ description: 'show successfull.' })
  async show(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return await this.assetsService.show(id);
  }
  //show all
  @Get()
  @ApiOkResponse({ description: 'show all successfull.' })
  async showall(): Promise<any[]> {
    return await this.assetsService.showall();
  }
  //update by id
  @Put(':id')
  @ApiOkResponse({ description: 'update successfull.' })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateAsistsDto: CreateAssetDto,
  ): Promise<any> {
    return await this.assetsService.update(id, updateAsistsDto);
  }
  //delete by id
  @Delete(':id')
  @ApiOkResponse({ description: 'delete successfull.' })
  async delete(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return await this.assetsService.delete(id);
  }
}
