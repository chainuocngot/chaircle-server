export const AUTH_TYPE_KEY = 'authType';
export const REQUEST_USER_KEY = 'activeUser';

export const AuthType = {
  Bearer: 'Bearer',
  None: 'None',
} as const;

export type TypeOfAuthType = (typeof AuthType)[keyof typeof AuthType];

export const VerificationCodeType = {
  Register: 'REGISTER',
  Login: 'LOGIN',
  ChangePassword: 'CHANGE_PASSWORD',
  Disable2FA: 'DISABLE_2FA',
} as const;

export type TypeOfVerificationCodeType =
  (typeof VerificationCodeType)[keyof typeof VerificationCodeType];
