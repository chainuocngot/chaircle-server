import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

export const EmailAlreadyInUsedException = new ConflictException('Error.EmailAlreadyInUsed');

export const AccountNotFoundException = new NotFoundException('Error.AccountNotFound');

export const WrongPasswordException = new UnprocessableEntityException('Error.WrongPassword');

export const RefreshTokenNotFoundException = new UnauthorizedException(
  'Error.RefreshTokenNotFound',
);

export const SendOtpFailedException = new BadRequestException('Error.SendOtpFailedException');

export const InvalidOtpCodeException = new UnauthorizedException('Error.InvalidOtpCodeException');

export const ExpiredOtpCodeException = new UnauthorizedException('Error.ExpiredOtpCodeException');
