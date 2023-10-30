import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CountryModule } from './country/country.modul';
import { AsistsModule } from './asists/asists.modul';
import { UsersModule } from './user/user.modul';
@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', '..', 'public'),
    //   serveStaticOptions: { index: false },
    // }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveStaticOptions: { redirect: false, index: false },
    }),

    PrismaModule,
    AuthModule,
    AsistsModule,
    UsersModule,
    AdminModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
