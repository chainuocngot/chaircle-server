import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { TokenService } from 'src/shared/services/token.service';

@Global()
@Module({
  imports: [JwtModule],
  providers: [PrismaService, TokenService, HashingService],
  exports: [PrismaService, TokenService, HashingService],
})
export class SharedModule {}
