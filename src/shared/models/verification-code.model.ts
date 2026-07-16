import { VerificationCodeType } from 'src/shared/constants/auth.constant';
import { dateTimeZod, idZod } from 'src/shared/constants/zod.constant';
import z from 'zod';

export const VerificationCodeSchema = z.object({
  id: idZod,
  code: z.string().max(100),
  email: z.email().trim(),
  type: z.enum(VerificationCodeType),
  expiresAt: dateTimeZod,

  createdAt: dateTimeZod,
});

export type VerificationCodeType = z.infer<typeof VerificationCodeSchema>;
