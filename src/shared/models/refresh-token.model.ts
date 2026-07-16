import { dateTimeZod, idZod } from 'src/shared/constants/zod.constant';
import z from 'zod';

export const RefreshTokenSchema = z.object({
  id: idZod,
  token: z.string().max(1000).trim(),
  expiresAt: dateTimeZod,

  userId: idZod,
  deviceId: idZod,

  createdAt: dateTimeZod,
});

export type RefreshTokenType = z.infer<typeof RefreshTokenSchema>;
