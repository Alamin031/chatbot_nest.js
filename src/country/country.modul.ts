import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { AssetsService } from 'src/asists/assets.service';
import { AssetService } from './assets.service';

@Module({
  controllers: [CountryController],
  providers: [CountryService, AssetsService, AssetService],
  imports: [PrismaModule],
})
export class CountryModule {}
