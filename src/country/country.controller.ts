import {
  Body,
  Controller,
  Get,
  // NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  // UploadedFile,
  // UseGuards,
  // Req,
  UploadedFiles,
  Res,
  Delete,
} from '@nestjs/common';
import { CountryService } from './country.service';
import {
  // ApiBasicAuth,
  ApiCreatedResponse,
  // ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiFiles } from 'src/decorators/file.decorator';
import { CreateCountryDto } from './dto/create-country.dto';
// import { CountryEntity } from './entities/country.entity';
import { UpdateCountryDto } from './dto/update-country.dto';
import { AssetService } from './assets.service';
// import { AuthGuard } from '@nestjs/passport';
// import { Role } from 'src/auth/enums/auth.role';
// import { RolesGuard } from 'src/auth/guards/auth.guard';
// import { Roles } from 'src/auth/roles.decorator';

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
  constructor(
    private readonly countryService: CountryService,
    private readonly assetsService: AssetService,
  ) {}
  @Post('create')
  @ApiFiles('icons', '/country-icon', CustomAPIDOC)
  @ApiCreatedResponse({ description: 'Country created successfully' })
  async createCountry(
    @Body() createCountryDto: CreateCountryDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log('my files:', files);
    return await this.countryService.createCountryy(files, createCountryDto);
  }

  @Post()
  @ApiFiles('icons', '/country-icon', CustomAPIDOC)
  @ApiCreatedResponse({ description: 'Country created successfully' })
  async createCountr(
    @Body() createCountryDto: CreateCountryDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log('files:', files);
    return await this.countryService.createCountryy(files, createCountryDto);
  }

  @Get(':id/country')
  async getCountryIcons(@Param('id', ParseIntPipe) id: number) {
    return this.countryService.getCountryIcons(id);
  }
  //get all countries
  @Get()
  async getAllCountries() {
    return this.countryService.getAllCountries();
  }

  @Get(':id/icon')
  async getCountryIconss(@Param('id', ParseIntPipe) id: number, @Res() res) {
    const country = await this.countryService.getCountryIcons(id);
    if (!country || !country.icon || country.icon.length === 0) {
      return res.status(404).send('Icons not found');
    }
    const iconPath = country.icon[0].slug;
    res.sendFile(iconPath, { root: './' });
  }
  @Delete(':id')
  async deleteCountry(@Param('id', ParseIntPipe) id: number) {
    return this.countryService.deleteCountry(id);
  }

  @Put(':id')
  async updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return this.countryService.updateCountry(id, updateCountryDto);
  }
  @Put(':id/icon')
  @ApiFiles('icons', '/country-icon', CustomAPIDOC)
  async updateCountryIcon(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return this.countryService.updateCountryIcon(id, files, updateCountryDto);
  }
}
