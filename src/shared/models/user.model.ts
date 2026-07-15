import { dateTimeZod, idZod } from 'src/shared/constants/zod.constant';
import z from 'zod';

export const UserSchema = z.object({
  id: idZod,
  username: z.string().max(100).trim(),
  bio: z.string().max(500).trim().nullable(),
  email: z.email().trim(),
  avatarUrl: z.string().max(1000).trim().nullable(),
  password: z.string().max(1000).trim(),
  totpSecret: z.string().max(500).trim().nullable(),

  createdById: idZod.nullable(),
  updatedById: idZod.nullable(),
  deletedById: idZod.nullable(),

  createdAt: dateTimeZod,
  updatedAt: dateTimeZod.nullable(),
  deletedAt: dateTimeZod.nullable(),
});

export type UserType = z.infer<typeof UserSchema>;
