import { Module } from '@nestjs/common';
import { AuthRepository } from 'src/routes/auth/auth.repository';
import { GoogleOAuthService } from 'src/routes/auth/google-oauth.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, GoogleOAuthService],
})
export class AuthModule {}
