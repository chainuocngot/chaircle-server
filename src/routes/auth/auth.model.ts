import { VerificationCodeType } from 'src/shared/constants/auth.constant';
import { MessageResSchema } from 'src/shared/models/response.model';
import { UserSchema } from 'src/shared/models/user.model';
import { validatePasswordMatch } from 'src/shared/utils/zod.util';
import z from 'zod';

// Register
export const RegisterBodySchema = UserSchema.pick({
  email: true,
  password: true,
  username: true,
})
  .extend({
    confirm_password: z.string(),
    otp_code: z.string(),
  })
  .superRefine(validatePasswordMatch)
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

// Refresh Token
export const RefreshTokenBodySchema = z
  .object({
    refresh_token: z.jwt(),
  })
  .strict();

export const RefreshTokenResSchema = RegisterResSchema;

// Send OTP
export const SendOtpBodySchema = UserSchema.pick({
  email: true,
})
  .extend({
    type: z.enum(VerificationCodeType),
  })
  .strict();

export const SendOtpResSchema = MessageResSchema;

// Verify OTP
export const VerifyForgotPasswordOtpBodySchema = UserSchema.pick({
  email: true,
})
  .extend({
    otp_code: z.string(),
  })
  .strict();

// Reset Password
export const ResetPasswordQuerySchema = z
  .object({
    token: z.jwt(),
  })
  .strict();

export const ResetPasswordBodySchema = UserSchema.pick({
  password: true,
})
  .extend({
    confirm_password: z.string(),
  })
  .superRefine(validatePasswordMatch)
  .strict();

export const ResetPasswordResSchema = MessageResSchema;

export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;
export type RegisterResType = z.infer<typeof RegisterResSchema>;
export type LoginBodyType = z.infer<typeof LoginBodySchema>;
export type LoginResType = z.infer<typeof LoginResSchema>;
export type LogoutBodyType = z.infer<typeof LogoutBodySchema>;
export type LogoutResType = z.infer<typeof LogoutResSchema>;
export type RefreshTokenBodyType = z.infer<typeof RefreshTokenBodySchema>;
export type RefreshTokenResType = z.infer<typeof RefreshTokenResSchema>;
export type SendOtpBodyType = z.infer<typeof SendOtpBodySchema>;
export type SendOtpResType = z.infer<typeof SendOtpResSchema>;
export type VerifyForgotPasswordOtpBodyType = z.infer<typeof VerifyForgotPasswordOtpBodySchema>;
export type ResetPasswordQueryType = z.infer<typeof ResetPasswordQuerySchema>;
export type ResetPasswordBodyType = z.infer<typeof ResetPasswordBodySchema>;
export type ResetPasswordResType = z.infer<typeof ResetPasswordResSchema>;
