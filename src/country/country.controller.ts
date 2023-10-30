import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiFile } from 'src/decorators/file.decorator';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountryEntity } from './entities/country.entity';
import { UpdateCountryDto } from './dto/update-country.dto';

const CustomAPIDOC = {
  name: {
    type: 'object',
    example: { en: 'EnglishName', ar: 'ArabicName' },
  },
  url: {
    type: 'object',
    example: {
      en: 'http://localhost:4000/api#/default/CountryController_create',
      ar: 'http://localhost:4000/api#/default/CountryController_create',
    },
  },
  hasAreas: { type: 'boolean', default: false },
  status: { type: 'string', default: 'Published' },
};
@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}
  @Post()
  @ApiOkResponse({ description: 'Country created successfully.' })
  @ApiCreatedResponse({ type: CountryEntity })
  @ApiFile('icons', '/country-icon', CustomAPIDOC)
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    createCountryDto: CreateCountryDto,
  ) {
    return await this.countryService.create(file, createCountryDto);
  }

  //update by id country
  @Put(':id')
  @ApiOkResponse({ description: 'Country updated successfully.' })
  @ApiCreatedResponse({ type: CountryEntity })
  @ApiFile('icon', '/country-icon', CustomAPIDOC)
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateCountryDto: UpdateCountryDto,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<CountryEntity> {
    const data = await this.countryService.update(id, file, updateCountryDto);
    if (data) {
      return data;
    } else {
      throw new NotFoundException('Country not found');
    }
  }
  //show all countries
  @Get()
  @ApiOkResponse({ description: 'All countries.' })
  @ApiCreatedResponse({ type: CountryEntity })
  async findAll(): Promise<CountryEntity[]> {
    return await this.countryService.findAll();
  }
  //show by id
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.countryService.findOne(id);
  }

  //delete by id
  @Get('delete/:id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return await this.countryService.delete(id);
  }
}
