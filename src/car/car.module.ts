import { Module } from '@nestjs/common';
import { AssetService } from 'src/country/assets.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  controllers: [CarController],
  providers: [CarService, AssetService],
  imports: [PrismaModule],
})
export class CarModule {}
