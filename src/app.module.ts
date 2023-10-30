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
// import { ErrorsInterceptor } from './decorators/errors.interceptor';
// import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
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
  providers: [
    AppService,
    // Register the ErrorsInterceptor as a global interceptor
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ErrorsInterceptor,
    // },
  ],
})
export class AppModule {}
