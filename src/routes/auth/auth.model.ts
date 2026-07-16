import { MessageResSchema } from 'src/shared/models/response.model';
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
}).strict();

export const LoginResSchema = RegisterResSchema;

// Logout
export const LogoutBodySchema = z
  .object({
    refresh_token: z.jwt(),
  })
  .strict();

export const LogoutResSchema = MessageResSchema;

export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;
export type RegisterResType = z.infer<typeof RegisterResSchema>;
export type LoginBodyType = z.infer<typeof LoginBodySchema>;
export type LoginResType = z.infer<typeof LoginResSchema>;
export type LogoutBodyType = z.infer<typeof LogoutBodySchema>;
export type LogoutResType = z.infer<typeof LogoutResSchema>;
