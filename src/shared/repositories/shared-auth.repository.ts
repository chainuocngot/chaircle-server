import { Injectable } from '@nestjs/common';
import { UserType } from 'src/shared/models/user.model';
import { SharedDeviceRepository } from 'src/shared/repositories/shared-device.repository';
import { SharedRefreshTokenRepository } from 'src/shared/repositories/shared-refresh-token.repository';
import { PrismaService } from 'src/shared/services/prisma.service';
import { TokenService } from 'src/shared/services/token.service';
import { PrismaExecutor } from 'src/shared/types/prisma.type';

@Injectable()
export class SharedAuthRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly sharedDeviceRepository: SharedDeviceRepository,
    private readonly sharedRefreshTokenRepository: SharedRefreshTokenRepository,
  ) {}

  async createLoginSession(
    {
      ip,
      userAgent,
      userId,
    }: {
      ip: string;
      userAgent: string;
      userId: UserType['id'];
    },
    executor: PrismaExecutor = this.prismaService,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // 1. Tạo Device
    const device = await this.sharedDeviceRepository.createDevice(
      {
        ip,
        userAgent,
        userId,
        isActive: true,
      },
      executor,
    );

    // 2. Sign tokens
    const $signAccessToken = this.tokenService.signAccessToken({
      userId,
      deviceId: device.id,
    });
    const $signRefreshToken = this.tokenService.signRefreshToken({
      userId,
    });
    const [accessToken, refreshToken] = await Promise.all([$signAccessToken, $signRefreshToken]);

    // 3. Lưu Refresh token vào DB
    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken);
    await this.sharedRefreshTokenRepository.createRefreshToken(
      {
        deviceId: device.id,
        expiresAt: new Date(decodedRefreshToken.exp * 1000),
        token: refreshToken,
        userId,
      },
      executor,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
