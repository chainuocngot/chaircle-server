import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { DeviceType } from 'src/shared/models/device.model';
import { RefreshTokenType } from 'src/shared/models/refresh-token.model';
import { UserType } from 'src/shared/models/user.model';
import { VerificationCodeType } from 'src/shared/models/verification-code.model';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUser(where: Prisma.UserWhereInput): Promise<UserType | null> {
    return this.prismaService.user.findFirst({
      where,
    });
  }

  createUser(payload: Prisma.UserCreateInput): Promise<UserType> {
    return this.prismaService.user.create({
      data: payload,
    });
  }

  createDevice(payload: Prisma.DeviceUncheckedCreateInput): Promise<DeviceType> {
    return this.prismaService.device.create({
      data: payload,
    });
  }

  storeRefreshToken(payload: Prisma.RefreshTokenUncheckedCreateInput): Promise<RefreshTokenType> {
    return this.prismaService.refreshToken.create({
      data: payload,
    });
  }

  updateDevice(
    where: Prisma.DeviceWhereUniqueInput,
    data: Prisma.DeviceUncheckedUpdateInput,
  ): Promise<DeviceType> {
    return this.prismaService.device.update({
      where,
      data,
    });
  }

  deleteRefreshToken(where: Prisma.RefreshTokenWhereUniqueInput): Promise<RefreshTokenType> {
    return this.prismaService.refreshToken.delete({
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
}
