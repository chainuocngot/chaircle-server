import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/shared/services/email.service';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { TokenService } from 'src/shared/services/token.service';

const SharedServices = [PrismaService, TokenService, HashingService, EmailService];

@Global()
@Module({
  imports: [JwtModule],
  providers: SharedServices,
  exports: SharedServices,
})
export class SharedModule {}
