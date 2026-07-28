import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { RefreshTokenType } from 'src/shared/models/refresh-token.model';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PrismaExecutor } from 'src/shared/types/prisma.type';

@Injectable()
export class SharedRefreshTokenRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createRefreshToken(
    payload: Prisma.RefreshTokenUncheckedCreateInput,
    executor: PrismaExecutor = this.prismaService,
  ): Promise<RefreshTokenType> {
    return executor.refreshToken.create({
      data: payload,
    });
  }
}
