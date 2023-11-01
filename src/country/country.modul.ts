import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { AssetService } from './assets.service';

@Module({
  controllers: [CountryController],
  providers: [CountryService, AssetService],
  imports: [PrismaModule],
})
export class CountryModule {}
