import { UserSchema } from 'src/shared/models/user.model';
import z from 'zod';

export const GetMeResSchema = UserSchema.omit({
  password: true,
  totpSecret: true,
});

export type GetMeResType = z.infer<typeof GetMeResSchema>;
