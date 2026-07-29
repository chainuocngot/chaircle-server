import { UserSchema } from 'src/shared/models/user.model';
import z from 'zod';

const SafetyUserSchema = UserSchema.omit({
  password: true,
  totpSecret: true,
});

// Get Me
export const GetMeResSchema = SafetyUserSchema;

// Update Me
export const UpdateMeBodySchema = UserSchema.pick({
  avatarUrl: true,
  bio: true,
  username: true,
}).strict();

export const UpdateMeResSchema = SafetyUserSchema;

// Get User
export const GetUserParamSchema = z.object({
  userId: z.coerce.number().int().positive(),
});

export const GetUserResSchema = SafetyUserSchema;

export type GetMeResType = z.infer<typeof GetMeResSchema>;
export type UpdateMeBodyType = z.infer<typeof UpdateMeBodySchema>;
export type UpdateMeResType = z.infer<typeof UpdateMeResSchema>;
export type GetUserParamType = z.infer<typeof GetUserParamSchema>;
export type GetUserResType = z.infer<typeof GetUserResSchema>;
