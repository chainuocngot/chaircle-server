import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/shared/constants/auth.constant';
import { TokenService } from 'src/shared/services/token.service';
import { AccessTokenPayload } from 'src/shared/types/token.type';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const decodedAccessToken = await this._extractAndValidateToken(request);
    request[REQUEST_USER_KEY] = decodedAccessToken;

    return true;
  }

  private async _extractAndValidateToken(request: Request): Promise<AccessTokenPayload> {
    const accessToken = this._extractAccessTokenFromHeader(request);

    try {
      const decodedAccessToken = await this.tokenService.verifyAccessToken(accessToken);
      return decodedAccessToken;
    } catch {
      throw new UnauthorizedException('Error.InvalidAccessToken');
    }
  }

  private _extractAccessTokenFromHeader(request: Request): string {
    const accessToken = request.headers['authorization']?.split(' ')[1] as string;
    if (!accessToken) {
      throw new UnauthorizedException('Error.MissingAccessToken');
    }

    return accessToken;
  }
}
