import { UserSchema } from 'src/shared/models/user.model';
import z from 'zod';

const SafetyUserSchema = UserSchema.omit({
  password: true,
  totpSecret: true,
});

export const GetMeResSchema = SafetyUserSchema;

export const UpdateMeBodySchema = UserSchema.pick({
  avatarUrl: true,
  bio: true,
  username: true,
}).strict();

export const UpdateMeResSchema = SafetyUserSchema;

export type GetMeResType = z.infer<typeof GetMeResSchema>;
export type UpdateMeBodyType = z.infer<typeof UpdateMeBodySchema>;
export type UpdateMeResType = z.infer<typeof UpdateMeResSchema>;
