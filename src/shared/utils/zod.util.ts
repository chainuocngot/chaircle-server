import { RefinementCtx } from 'zod';

type PasswordMatch = {
  password: string;
  confirm_password: string;
};

export const validatePasswordMatch = (body: PasswordMatch, ctx: RefinementCtx) => {
  if (body.confirm_password !== body.password) {
    ctx.addIssue({
      code: 'custom',
      path: ['confirm_password'],
      message: 'Error.ConfirmPasswordNotMatch',
    });
  }
};
