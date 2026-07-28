import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { DeviceType } from 'src/shared/models/device.model';
import { RefreshTokenType } from 'src/shared/models/refresh-token.model';
import { VerificationCodeType } from 'src/shared/models/verification-code.model';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PrismaExecutor } from 'src/shared/types/prisma.type';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  updateDevice(
    where: Prisma.DeviceWhereUniqueInput,
    data: Prisma.DeviceUncheckedUpdateInput,
  ): Promise<DeviceType> {
    return this.prismaService.device.update({
      where,
      data,
    });
  }

  deleteRefreshToken(
    where: Prisma.RefreshTokenWhereUniqueInput,
    executor: PrismaExecutor = this.prismaService,
  ): Promise<RefreshTokenType> {
    return executor.refreshToken.delete({
      where,
    });
  }

  storeVerificationCode(
    payload: Prisma.VerificationCodeUncheckedCreateInput,
  ): Promise<VerificationCodeType> {
    return this.prismaService.verificationCode.upsert({
      create: payload,
      where: {
        email_type: {
          email: payload.email,
          type: payload.type,
        },
      },
      update: {
        code: payload.code,
        expiresAt: payload.expiresAt,
      },
    });
  }

  findVerificationCode(
    where: Prisma.VerificationCodeWhereUniqueInput,
  ): Promise<VerificationCodeType | null> {
    return this.prismaService.verificationCode.findUnique({
      where,
    });
  }

  deleteVerificationCode(
    where: Prisma.VerificationCodeWhereUniqueInput,
    executor: PrismaExecutor = this.prismaService,
  ): Promise<VerificationCodeType> {
    return executor.verificationCode.delete({
      where,
    });
  }
}
