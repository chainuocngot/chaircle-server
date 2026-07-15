import { dateTimeZod, idZod } from 'src/shared/constants/zod.constant';
import z from 'zod';

export const DeviceSchema = z.object({
  id: idZod,
  ip: z.string().max(50).trim(),
  userAgent: z.string().max(500).trim(),
  isActive: z.boolean(),

  userId: idZod,

  createdAt: dateTimeZod,
  lastActive: dateTimeZod.nullable(),
});

export type DeviceType = z.infer<typeof DeviceSchema>;
