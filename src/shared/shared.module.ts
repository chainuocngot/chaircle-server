import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SharedAuthRepository } from 'src/shared/repositories/shared-auth.repository';
import { SharedDeviceRepository } from 'src/shared/repositories/shared-device.repository';
import { SharedRefreshTokenRepository } from 'src/shared/repositories/shared-refresh-token.repository';
import { SharedUserRepository } from 'src/shared/repositories/shared-user.repository';
import { EmailService } from 'src/shared/services/email.service';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { TokenService } from 'src/shared/services/token.service';

const SharedServices = [
  PrismaService,
  TokenService,
  HashingService,
  EmailService,
  SharedUserRepository,
  SharedAuthRepository,
  SharedDeviceRepository,
  SharedRefreshTokenRepository,
];

@Global()
@Module({
  imports: [JwtModule],
  providers: SharedServices,
  exports: SharedServices,
})
export class SharedModule {}
