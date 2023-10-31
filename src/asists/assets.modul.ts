import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AsistsController } from './assets.controller';
import { AssetsService } from './assets.service';

@Module({
  controllers: [AsistsController],
  providers: [AssetsService],
  imports: [PrismaModule],
})
export class AsistsModule {}
