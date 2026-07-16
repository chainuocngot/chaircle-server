import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from 'src/guards/access-token.guard';
import { AUTH_TYPE_KEY, AuthType, TypeOfAuthType } from 'src/shared/constants/auth.constant';
import { AuthTypeDecoratorPayload } from 'src/shared/types/auth.type';

@Injectable()
export class AuthGuard implements CanActivate {
  private authTypeGuardMap: Partial<Record<TypeOfAuthType, CanActivate>> = {
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap[AuthType.Bearer] = this.accessTokenGuard;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypeValue = this._getAuthTypeValue(context);
    const guard = this.authTypeGuardMap[authTypeValue.authType];

    try {
      if (await guard?.canActivate(context)) {
        return true;
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new UnauthorizedException();
    }

    return true;
  }

  private _getAuthTypeValue(context: ExecutionContext) {
    const authTypeValue = this.reflector.getAllAndOverride<AuthTypeDecoratorPayload | undefined>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? { authType: AuthType.Bearer };

    return authTypeValue;
  }
}
