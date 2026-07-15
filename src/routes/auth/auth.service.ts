import { Injectable } from '@nestjs/common';
import {
  AccountNotFoundException,
  EmailAlreadyInUsedException,
  UsernameAlreadyTakenException,
  WrongPasswordException,
} from 'src/routes/auth/auth.error';
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from 'src/routes/auth/auth.model';
import { AuthRepository } from 'src/routes/auth/auth.repository';
import { HashingService } from 'src/shared/services/hashing.service';
import { TokenService } from 'src/shared/services/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
    private readonly hashingService: HashingService,
  ) {}

  async register({
    ip,
    userAgent,
    body,
  }: {
    ip: string;
    userAgent: string;
    body: RegisterBodyType;
  }): Promise<RegisterResType> {
    // 1. Kiểm tra email/username đã được đăng ký chưa
    const userWithPayload = await this.authRepository.findUser({
      OR: [
        { email: body.email },
        {
          username: body.username,
        },
      ],
      deletedAt: null,
    });

    if (userWithPayload && userWithPayload.email === body.email) {
      throw EmailAlreadyInUsedException;
    }

    if (userWithPayload && userWithPayload.username === body.username) {
      throw UsernameAlreadyTakenException;
    }

    // 2. Hash password
    const hashedPassword = await this.hashingService.hash(body.password);

    // 3. Tạo User
    const user = await this.authRepository.createUser({
      email: body.email,
      username: body.username,
      password: hashedPassword,
    });

    // 4. Tạo Device
    const device = await this.authRepository.createDevice({
      ip,
      userAgent,
      userId: user.id,
      isActive: true,
    });

    // 5. Sign tokens
    const $signAccessToken = this.tokenService.signAccessToken({
      userId: user.id,
      deviceId: device.id,
    });
    const $signRefreshToken = this.tokenService.signRefreshToken({
      userId: user.id,
    });
    const [accessToken, refreshToken] = await Promise.all([$signAccessToken, $signRefreshToken]);

    // 6. Lưu Refresh token vào DB
    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken);
    await this.authRepository.storeRefreshToken({
      deviceId: device.id,
      exp: new Date(decodedRefreshToken.exp * 1000),
      token: refreshToken,
      userId: user.id,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login({
    ip,
    userAgent,
    body,
  }: {
    ip: string;
    userAgent: string;
    body: LoginBodyType;
  }): Promise<LoginResType> {
    // 1. Tìm account với email
    const user = await this.authRepository.findUser({
      email: body.email,
      deletedAt: null,
    });

    if (user === null) {
      throw AccountNotFoundException;
    }

    // 2. Kiểm tra mật khẩu
    const isMatchPassword = await this.hashingService.compare(body.password, user.password);
    if (!isMatchPassword) {
      throw WrongPasswordException;
    }

    // 3. Tạo Device
    const device = await this.authRepository.createDevice({
      ip,
      userAgent,
      userId: user.id,
      isActive: true,
    });

    // 4. Sign tokens
    const $signAccessToken = this.tokenService.signAccessToken({
      userId: user.id,
      deviceId: device.id,
    });
    const $signRefreshToken = this.tokenService.signRefreshToken({
      userId: user.id,
    });
    const [accessToken, refreshToken] = await Promise.all([$signAccessToken, $signRefreshToken]);

    // 5. Lưu Refresh token vào DB
    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken);
    await this.authRepository.storeRefreshToken({
      deviceId: device.id,
      exp: new Date(decodedRefreshToken.exp * 1000),
      token: refreshToken,
      userId: user.id,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
