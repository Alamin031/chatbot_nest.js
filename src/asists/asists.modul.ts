import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AsistsController } from './asists.controller';
import { AsistsService } from './asists.service';

@Module({
  controllers: [AsistsController],
  providers: [AsistsService],
  imports: [PrismaModule],
})
export class AsistsModule {}
