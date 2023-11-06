/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { AssetService } from 'src/country/assets.service';
import { CarDTO } from 'src/car/dto/car.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarService {
  constructor(
    private prisma: PrismaService,
    private readonly assetService: AssetService,
  ) {}
  // async createCar(
  //   carImages: Express.Multer.File[],
  //   brandImages: Express.Multer.File[],
  //   carLogos: Express.Multer.File[],
  //   createCar: CarDTO,
  // ) {
  //   const car = await this.prisma.car.create({
  //     data: {
  //       ...createCar,
  //     },
  //   });

  //   // Upload car images and associate them with the car
  //   const carImageAssets = await this.assetService.uploadIcon(
  //     carImages,
  //     car.id,
  //   );

  //   // Upload brand images and associate them with the car
  //   const brandImageAssets = await this.assetService.uploadIcon(
  //     brandImages,
  //     car.id,
  //   );

  //   // Upload car logos and associate them with the car
  //   const carLogoAssets = await this.assetService.uploadIcon(carLogos, car.id);

  //   return car;
  // }

  async createCar(Files: Express.Multer.File[], createCar: CarDTO) {
    const car = await this.prisma.car.create({
      data: {
        ...createCar,
      },
    });

    // Upload car images and associate them with the car
    const carImageAssets = await this.assetService.uploadIcon(Files, car.id);

    return car;
  }
}
