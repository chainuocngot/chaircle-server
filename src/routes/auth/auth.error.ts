import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

export const AccountNotFoundException = new NotFoundException('Error.AccountNotFound');

export const WrongPasswordException = new UnprocessableEntityException('Error.WrongPassword');

export const RefreshTokenNotFoundException = new UnauthorizedException(
  'Error.RefreshTokenNotFound',
);

export const SendOtpFailedException = new BadRequestException('Error.SendOtpFailedException');

export const InvalidOtpCodeException = new UnauthorizedException('Error.InvalidOtpCodeException');

export const ExpiredOtpCodeException = new UnauthorizedException('Error.ExpiredOtpCodeException');

export const GoogleOAuthException = new BadRequestException('Error.GoogleOAuth');
