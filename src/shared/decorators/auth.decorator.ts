import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY, AuthType, TypeOfAuthType } from 'src/shared/constants/auth.constant';

export const Auth = (authType: TypeOfAuthType) => {
  return SetMetadata(AUTH_TYPE_KEY, {
    authType,
  });
};

export const IsPublic = () => Auth(AuthType.None);
