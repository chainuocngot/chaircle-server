import { Module } from '@nestjs/common';
import { AuthRepository } from 'src/routes/auth/auth.repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
