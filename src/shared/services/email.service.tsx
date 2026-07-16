import { Injectable } from '@nestjs/common';
import VerifyEmailTemplate from 'emails/verify-email-template';
import React from 'react';
import { CreateEmailResponse, Resend } from 'resend';
import envConfig from 'src/shared/config';
import { UserType } from 'src/shared/models/user.model';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(envConfig.API_KEY_RESEND);
  }

  sendOtp(email: UserType['email'], otpCode: string): Promise<CreateEmailResponse> {
    const SUBJECT = `${otpCode} | Confirm your Chaircle email`;
    return this.resend.emails.send({
      from: 'Chainuocngot <no-reply@chainuocngot.io.vn>',
      to: [email],
      subject: SUBJECT,
      react: <VerifyEmailTemplate verificationCode={otpCode} />,
    });
  }
}
