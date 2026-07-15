import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import envConfig from 'src/shared/config';
import {
  AccessTokenPayload,
  CreateAccessTokenPayload,
  CreateRefreshTokenPayload,
  RefreshTokenPayload,
} from 'src/shared/types/token.type';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(payload: CreateAccessTokenPayload): Promise<string> {
    return this.jwtService.signAsync(
      { ...payload, uuid: uuidv4() },
      {
        secret: envConfig.ACCESS_TOKEN_SECRET,
        expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN as JwtSignOptions['expiresIn'],
        algorithm: envConfig.TOKEN_ALGORITHM as JwtSignOptions['algorithm'],
      },
    );
  }

  verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.ACCESS_TOKEN_SECRET,
      algorithms: [envConfig.TOKEN_ALGORITHM] as JwtVerifyOptions['algorithms'],
    });
  }

  signRefreshToken(payload: CreateRefreshTokenPayload): Promise<string> {
    return this.jwtService.signAsync(
      { ...payload, uuid: uuidv4() },
      {
        secret: envConfig.REFRESH_TOKEN_SECRET,
        expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN as JwtSignOptions['expiresIn'],
        algorithm: envConfig.TOKEN_ALGORITHM as JwtSignOptions['algorithm'],
      },
    );
  }

  verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.REFRESH_TOKEN_SECRET,
      algorithms: [envConfig.TOKEN_ALGORITHM] as JwtVerifyOptions['algorithms'],
    });
  }
}
