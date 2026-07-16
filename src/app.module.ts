import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AccessTokenGuard } from 'src/guards/access-token.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ZodValidationPipe } from 'src/pipes/zod.pipe';
import { SharedModule } from 'src/shared/shared.module';

import { AppController } from './app.controller';
import { AuthModule } from './routes/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AccessTokenGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
