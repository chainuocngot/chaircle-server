import { UserSchema } from 'src/shared/models/user.model';
import z from 'zod';

// Register
export const RegisterBodySchema = UserSchema.pick({
  email: true,
  password: true,
  username: true,
})
  .extend({
    confirm_password: z.string(),
  })
  .superRefine((body, ctx) => {
    if (body.confirm_password !== body.password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirm_password'],
        message: 'Error.ConfirmPasswordNotMatch',
      });
    }
  })
  .strict();

export const RegisterResSchema = z.object({
  access_token: z.jwt(),
  refresh_token: z.jwt(),
});

// Login
export const LoginBodySchema = UserSchema.pick({
  email: true,
  password: true,
});

export const LoginResSchema = RegisterResSchema;

export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;
export type RegisterResType = z.infer<typeof RegisterResSchema>;
export type LoginBodyType = z.infer<typeof LoginBodySchema>;
export type LoginResType = z.infer<typeof LoginResSchema>;
