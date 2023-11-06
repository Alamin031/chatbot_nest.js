import { Controller, Post, Body, UploadedFiles } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CarDTO } from 'src/car/dto/car.dto';
import { VehicleFiles } from 'src/decorators/file.decorator';
import { CarService } from './car.service';

const customCarAPIDOC = {
  carName: {
    type: 'string',
    example: 'CarName',
  },
  description: {
    type: 'string',
    example: 'CarDescription',
  },
};

@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}
  // Specify the local storage options for the file
  @Post('create3')
  @VehicleFiles(
    ['carImage', 'arAndroid', 'arIso', 'banner'],
    '/car',
    customCarAPIDOC,
  )
  @ApiOperation({ summary: 'Create a car with carLogos' })
  @ApiCreatedResponse({ description: 'Car created successfully' })
  async createCarrr(
    @Body() createCar: CarDTO,
    @UploadedFiles() Files: Express.Multer.File[],
  ) {
    console.log('Files:', Files);
    console.log('Create Car:', createCar);
    // return null;
    return await this.carService.createCar(Files, createCar);
  }
}
