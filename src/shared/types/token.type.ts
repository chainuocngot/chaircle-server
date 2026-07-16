export type CreateAccessTokenPayload = {
  userId: number;
  deviceId: number;
};

export type AccessTokenPayload = CreateAccessTokenPayload & {
  exp: number;
  iat: number;
};

export type CreateRefreshTokenPayload = {
  userId: number;
  exp?: number;
};

export type RefreshTokenPayload = CreateRefreshTokenPayload & {
  exp: number;
  iat: number;
};
